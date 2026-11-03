# Razorpay Credit Purchase Integration

## Partner flow

1. Partner logs in and gets the existing JWT.
2. Frontend calls `POST /api/v1/credits/purchase/order` with:
   ```json
   { "amountInRupees": 500, "idempotencyKey": "unique-client-key" }
   ```
3. Backend calculates the credit quantity from the current `CreditSetting`, creates a Razorpay order, and returns:
   - `keyId`
   - `orderId`
   - `amount` (paise)
   - `currency`
   - `credits`
4. Frontend opens Razorpay Checkout using that `orderId`.
5. On Checkout success, frontend sends `razorpay_order_id`, `razorpay_payment_id`, and `razorpay_signature` to:
   `POST /api/v1/credits/purchase/verify`
6. Backend verifies the signature with the server-side Razorpay secret, fetches the payment from Razorpay, checks order/amount/currency/captured status, and only then credits the partner wallet.
7. The purchase is idempotent using the Razorpay order ID, so repeated verification does not double-credit.

## Admin flow

`POST /api/v1/credits/admin/add` remains a direct admin credit adjustment and is protected by `protect + requireAdmin`.

Admin credit grants do **not** create Razorpay orders and do **not** ask for payment. The existing `PROMOTIONAL` source is intended for free/admin-issued credits.

## Important

Set these environment variables on the server:

```env
RAZORPAY_KEY_ID=your_test_or_live_key_id
RAZORPAY_KEY_SECRET=your_test_or_live_key_secret
```

Use Test Mode credentials first. Keep `RAZORPAY_KEY_SECRET` server-side only.

## Frontend Checkout example

```js
const orderResponse = await api.post('/credits/purchase/order', {
  amountInRupees: 500,
  idempotencyKey: crypto.randomUUID(),
});

const order = orderResponse.data.data;

const options = {
  key: order.keyId,
  amount: order.amount,
  currency: order.currency,
  name: 'DigiNiwas',
  description: `${order.credits} credits`,
  order_id: order.orderId,
  handler: async (response) => {
    await api.post('/credits/purchase/verify', {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });
  },
};

const razorpay = new window.Razorpay(options);
razorpay.open();
```

Do not calculate the payable amount or credits on the frontend as the source of truth. The backend order and payment verification are authoritative.
