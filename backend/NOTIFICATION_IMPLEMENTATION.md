# DigiNiwas backend notification update — 30 October 2026

## Implemented in this ZIP
- Existing admin notification endpoints preserved.
- Shared authenticated GET /api/v1/notifications, PATCH /api/v1/notifications/read-all, PATCH /api/v1/notifications/:id/read, DELETE /api/v1/notifications/:id, DELETE /api/v1/notifications/clear. Also accessible through the legacy /api prefix.
- Reusable notificationService.notifyUser and notifyMany with per-recipient eventKey idempotency and recipient-targeted MongoDB notification storage.
- Existing admin notification producer now uses shared delivery service.
- Visit request -> admin review notification, sub-partner visit request -> agency owner notification.
- Visit approval/rejection -> buyer and partner; visit completion/cancellation/rescheduling -> buyer and partner.
- Promotion approval and rejection -> requesting partner.
- Partner verification, requested corrections and application rejection -> partner.
- Static JavaScript syntax checks across backend model/controller/service/route files succeeded.

## Important limitations / not yet implemented
- These are stored in-app notifications; FCM push delivery is NOT connected to this new shared service. Firebase Admin exists for authentication, not proven push delivery.
- Seller-side visit recipient requires verified owner-id resolution and is not currently emitted.
- AI response/comparison completion requires authoritative asynchronous task completion event and viewer-presence tracking; no fake client-triggered notifications were added.
- Saved property price/status matching, lead/credit ledger events, property change events, scheduler, broadcasts, device tokens, retry, analytics, and campaign management are NOT fully integrated.
- Cross-role JWT userRole naming must be verified against issued tokens before mobile launch.
- Existing approval workflow for visit status updates may allow direct status transitions outside admin review; this update does NOT refactor or validate all authorization and approval flows.
- Unique eventKey index requires deployment index sync; if legacy records contain duplicate nonempty eventKeys, clean them first.
- Live integration tests with MongoDB, FCM, or deployed clients were not performed.

## Deployment checklist
1. Back up database and deploy to staging.
2. Install dependencies (`npm install`), configure existing environment variables, and start with `npm start`.
3. Sync MongoDB indexes and verify authentication roles and access.
4. Verify successful events, denied requests, unread counts, idempotency and exact deep-link routes on staging.
5. Integrate unimplemented notifications only after confirming exact underlying business event schemas.
