// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import Buyer from '../models/Buyer.js';
// import Seller from '../models/Seller.js';
// import Partner from '../models/Partner.js';

// const getModelByRole = (role) => {
//   const normalizedRole = role ? role.toLowerCase() : '';
//   if (normalizedRole === 'buyer' || normalizedRole === 'tenant') return Buyer;
//   if (normalizedRole === 'seller' || normalizedRole === 'owner') return Seller;
//   if (normalizedRole === 'partner') return Partner;
//   throw new Error('Invalid role specified');
// };

// class AuthService {
//   // 1. User Registration with Location
//   async registerUser({ name, email, phone, password, role, location }) {
//     const Model = getModelByRole(role);

//     // Explicit Duplication Checks
//     const existingPhone = await Model.findOne({ phone });
//     if (existingPhone) {
//       throw new Error('Phone number is already registered');
//     }

//     const existingEmail = await Model.findOne({ email });
//     if (existingEmail) {
//       throw new Error('Email address is already registered');
//     }

//     // Password Hashing
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Format Location Data safely
//     const formattedLocation = {
//       city: location?.city || '',
//       state: location?.state || '',
//       country: location?.country || 'India',
//       address: location?.address || '',
//       coordinates: {
//         type: 'Point',
//         // GeoJSON uses [Longitude, Latitude] format
//         coordinates: [
//           Number(location?.longitude) || 0,
//           Number(location?.latitude) || 0
//         ]
//       }
//     };

//     const newUser = new Model({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       role: role.toLowerCase(),
//       location: formattedLocation
//     });

//     await newUser.save();
//     return newUser;
//   }

//   // 2. Password Login
//   async loginWithPassword({ phone, password, role }) {
//     const Model = getModelByRole(role);

//     const user = await Model.findOne({ phone });
//     if (!user) {
//       throw new Error('User not found');
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       throw new Error('Invalid credentials');
//     }

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET || 'secretKey',
//       { expiresIn: '7d' }
//     );

//     return { user, token };
//   }

//   // 3. Send OTP
//   async sendOTP({ phone, role }) {
//     const Model = getModelByRole(role);

//     const user = await Model.findOne({ phone });
//     if (!user) {
//       throw new Error('User not found with this phone number');
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

//     user.otp = otp;
//     user.otpExpiresAt = otpExpiresAt;
//     await user.save();

//     return { phone, otp };
//   }

//   // 4. OTP Login
//   async loginWithOTP({ phone, otp, role }) {
//     const Model = getModelByRole(role);

//     const user = await Model.findOne({ phone });
//     if (!user) {
//       throw new Error('User not found');
//     }

//     if (!user.otp || user.otp !== otp) {
//       throw new Error('Invalid OTP');
//     }

//     if (new Date() > new Date(user.otpExpiresAt)) {
//       throw new Error('OTP has expired');
//     }

//     user.otp = null;
//     user.otpExpiresAt = null;
//     user.isPhoneVerified = true;
//     await user.save();

//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET || 'secretKey',
//       { expiresIn: '7d' }
//     );

//     return { user, token };
//   }
// }

// export default new AuthService();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";
import Partner from "../models/Partner.js";
import {
  sendLoginOtp,
  verifyLoginOtp,
  normalizePhoneNumber
} from "./twilioVerifyService.js";


const getModelByRole = (role) => {
  const normalizedRole =
    role?.toLowerCase() || "";

  if (
    normalizedRole === "buyer" ||
    normalizedRole === "tenant"
  ) {
    return Buyer;
  }

  if (
    normalizedRole === "seller" ||
    normalizedRole === "owner"
  ) {
    return Seller;
  }

  if (normalizedRole === "partner") {
    return Partner;
  }

  throw new Error(
    "Invalid role specified"
  );
};


// ======================================================
// UNIQUE ID GENERATOR
// ======================================================

const generateUniqueId = async (
  Model,
  field,
  prefix
) => {
  let unique = false;
  let generatedId = "";

  while (!unique) {
    const randomNumber =
      Math.floor(
        100000 +
          Math.random() * 900000
      );

    generatedId =
      `${prefix}${randomNumber}`;

    const existing =
      await Model.findOne({
        [field]: generatedId,
      });

    if (!existing) {
      unique = true;
    }
  }

  return generatedId;
};


class AuthService {

  // ======================================================
  // REGISTER
  // ======================================================

  async registerUser({
    name,
    email,
    phone,
    password,
    role,
    location,
    partnerType,
  }) {
    const Model =
      getModelByRole(role);

    const normalizedRole =
      role.toLowerCase();

    // ==========================================
    // DUPLICATE PHONE
    // ==========================================

    const existingPhone =
      await Model.findOne({
        phone,
      });

    if (existingPhone) {
      throw new Error(
        "Phone number is already registered"
      );
    }

    // ==========================================
    // DUPLICATE EMAIL
    // ==========================================

    // const existingEmail =
    //   await Model.findOne({
    //     email,
    //   });

    // if (existingEmail) {
    //   throw new Error(
    //     "Email address is already registered"
    //   );
    // }
const normalizedEmail = String(email || "")
  .trim()
  .toLowerCase();

// Email duplicate check only when email is provided
if (normalizedEmail) {
  const existingEmail = await Model.findOne({
    email: normalizedEmail,
  });

  if (existingEmail) {
    throw new Error("Email address is already registered");
  }
}
    // ==========================================
    // PASSWORD HASH
    // ==========================================

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // ==========================================
    // LOCATION
    // ==========================================

    const formattedLocation = {
      city:
        location?.city || "",

      state:
        location?.state || "",

      country:
        location?.country ||
        "India",

      address:
        location?.address || "",

      coordinates: {
        type: "Point",

        // MongoDB GeoJSON:
        // [longitude, latitude]
        coordinates: [
          Number(
            location?.longitude
          ) || 0,

          Number(
            location?.latitude
          ) || 0,
        ],
      },
    };

    // ==========================================
    // COMMON DATA
    // ==========================================

    // const userData = {
    //   name,
    //   email,
    //   phone,
    //   password:
    //     hashedPassword,
    //   role:
    //     normalizedRole,
    //   location:
    //     formattedLocation,
    // };
const userData = {
  name,
  ...(normalizedEmail ? { email: normalizedEmail } : {}),
  phone,
  password: hashedPassword,
  role: normalizedRole,
  location: formattedLocation,
};
    // ==========================================
    // SELLER ID
    // ==========================================

    if (
      normalizedRole ===
        "seller" ||
      normalizedRole ===
        "owner"
    ) {
      userData.sellerId =
        await generateUniqueId(
          Seller,
          "sellerId",
          "SEL-"
        );
    }

    // ==========================================
    // PARTNER ID + TYPE
    // ==========================================

    if (
      normalizedRole ===
      "partner"
    ) {
      userData.partnerId =
        await generateUniqueId(
          Partner,
          "partnerId",
          "PTR-"
        );

      userData.partnerType =
        partnerType.toLowerCase();
    }

    // ==========================================
    // CREATE USER
    // ==========================================

    const newUser =
      new Model(userData);

    await newUser.save();

    return newUser;
  }


  // ======================================================
  // PASSWORD LOGIN
  // ======================================================

  async loginWithPassword({
    phone,
    password,
    role,
  }) {
    const Model =
      getModelByRole(role);

    const user =
      await Model.findOne({
        phone,
      });

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    if (user.isDeleted) {
      const error = new Error("This account has been deleted.");
      error.code = "ACCOUNT_DELETED";
      throw error;
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      throw new Error(
        "Invalid credentials"
      );
    }

    const token =
      jwt.sign(
        {
          userId: user._id,
          role: user.role,
        },

        process.env.JWT_SECRET ||
          "secretKey",

        {
          expiresIn: "7d",
        }
      );

    return {
      user,
      token,
    };
  }


  // ======================================================
  // SEND OTP
  // ======================================================

  async sendOTP({ phone, role }) {
    const Model = getModelByRole(role);
    const normalizedPhone = normalizePhoneNumber(phone);

    const rawPhone = String(phone || "").trim();
    const localPhone = rawPhone.replace(/\D/g, "").replace(/^91/, "");
    const phoneCandidates = [rawPhone, localPhone, `+91${localPhone}`].filter(Boolean);

    const user = await Model.findOne({ phone: { $in: [...new Set(phoneCandidates)] } });
    if (!user) {
      throw new Error("User not found with this phone number");
    }

    if (user.isDeleted) {
      const error = new Error("This account has been deleted.");
      error.code = "ACCOUNT_DELETED";
      throw error;
    }

    const normalizedRole = String(role || "").trim().toLowerCase();

    if (["seller", "owner"].includes(normalizedRole)) {
      if (user.applicationStatus !== "APPROVED") {
        throw new Error("Seller account is not approved yet");
      }
      if (user.accountStatus !== "ACTIVE") {
        throw new Error(`Seller account is ${user.accountStatus}`);
      }
    }

    if (normalizedRole === "partner") {
      if (!user.isApproved) {
        throw new Error("Partner account is waiting for DigiNiwas Admin approval");
      }
      if (user.isRejected || user.isBlocked || user.applicationStatus === "Suspended") {
        throw new Error("Partner account is not active");
      }
    }

    if (["buyer", "tenant"].includes(normalizedRole) && user.status && user.status !== "Active") {
      throw new Error(`Buyer account is ${user.status}`);
    }

    // const { otp } = await sendLoginOtp(normalizedPhone);
    // const otpHash = await bcrypt.hash(otp, 10);
    // const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // user.loginOtp = user.loginOtp || {};
    // user.loginOtp.otpHash = otpHash;
    // user.loginOtp.otpExpiresAt = otpExpiresAt;
    // await user.save();
const twilioResult = await sendLoginOtp(normalizedPhone);

return {
  phone: normalizedPhone,
  expiresIn: "10 minutes",
  channel: "sms",
  provider: "twilio",
  status: twilioResult.status,
};
    // return {
    //   phone: normalizedPhone,
    //   expiresIn: "10 minutes",
    //   channel: "sms",
    // };
  }


  // ======================================================
  // OTP LOGIN
  // ======================================================

  // async loginWithOTP({
  //   phone,
  //   otp,
  //   role,
  // }) {
  //   const Model =
  //     getModelByRole(role);

  //   const user =
  //     await Model.findOne({
  //       phone,
  //     });

  //   if (!user) {
  //     throw new Error(
  //       "User not found"
  //     );
  //   }

  //   if (
  //     !user.otp ||
  //     user.otp !== otp
  //   ) {
  //     throw new Error(
  //       "Invalid OTP"
  //     );
  //   }

  //   if (
  //     new Date() >
  //     new Date(
  //       user.otpExpiresAt
  //     )
  //   ) {
  //     throw new Error(
  //       "OTP has expired"
  //     );
  //   }

  //   user.otp = null;

  //   user.otpExpiresAt =
  //     null;

  //   user.isPhoneVerified =
  //     true;

  //   await user.save();

  //   const token =
  //     jwt.sign(
  //       {
  //         userId: user._id,
  //         role: user.role,
  //       },

  //       process.env.JWT_SECRET ||
  //         "secretKey",

  //       {
  //         expiresIn: "7d",
  //       }
  //     );

  //   return {
  //     user,
  //     token,
  //   };
  // }

  async loginWithOTP({ phone, otp, role }) {
    const Model = getModelByRole(role);
    const rawPhone = String(phone || "").trim();
    const localPhone = rawPhone.replace(/\D/g, "").replace(/^91/, "");
    const phoneCandidates = [rawPhone, localPhone, `+91${localPhone}`].filter(Boolean);

    const user = await Model.findOne({ phone: { $in: [...new Set(phoneCandidates)] } }).select(
      "+loginOtp.otpHash +loginOtp.otpExpiresAt"
    );

    if (!user) {
      throw new Error("User not found");
    }

    if (user.isDeleted) {
      const error = new Error("This account has been deleted.");
      error.code = "ACCOUNT_DELETED";
      throw error;
    }

    const normalizedRole = String(role || "").trim().toLowerCase();
    if (["seller", "owner"].includes(normalizedRole)) {
      if (user.applicationStatus !== "APPROVED") throw new Error("Seller account is not approved yet");
      if (user.accountStatus !== "ACTIVE") throw new Error(`Seller account is ${user.accountStatus}`);
    }
    if (normalizedRole === "partner") {
      if (!user.isApproved) throw new Error("Partner account is waiting for DigiNiwas Admin approval");
      if (user.isRejected || user.isBlocked || user.applicationStatus === "Suspended") throw new Error("Partner account is not active");
    }
    if (["buyer", "tenant"].includes(normalizedRole) && user.status && user.status !== "Active") {
      throw new Error(`Buyer account is ${user.status}`);
    }

    // const storedHash = user.loginOtp?.otpHash;
    // const expiresAt = user.loginOtp?.otpExpiresAt;

    // if (!storedHash || !expiresAt || new Date() > new Date(expiresAt)) {
    //   throw new Error("Invalid or expired OTP");
    // }

    // const approved = await bcrypt.compare(String(otp).trim(), storedHash);
    // if (!approved) {
    //   throw new Error("Invalid or expired OTP");
    // }
const verification = await verifyLoginOtp(
  normalizePhoneNumber(phone),
  otp
);

if (!verification.success) {
  throw new Error("Invalid or expired OTP");
}
    user.loginOtp.otpHash = null;
    user.loginOtp.otpExpiresAt = null;
    user.isPhoneVerified = true;
    if (user.role === "partner") {
      user.credentials = user.credentials || {};
      user.credentials.lastLoginAt = new Date();
    } else {
      user.lastLoginAt = new Date();
    }
    await user.save();

    const token = jwt.sign(
      {
        userId: user._id,
        id: user._id,
        role: user.role,
        ...(user.sellerId ? { sellerId: user.sellerId } : {}),
        ...(user.partnerId ? { partnerId: user.partnerId } : {}),
      },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "7d" }
    );

    return { user, token };
  }

}


export default new AuthService();