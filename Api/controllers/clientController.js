const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/email.js");
const Client = require("../models/clientModel.js");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.clientsignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = req.body || {};

    // 1️⃣ All fields mandatory
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are mandatory" });
    }

    // 2️⃣ Name length restriction
    if (firstName.length < 2 || firstName.length > 50)
      return res.status(400).json({ message: "First name must be 2-50 characters" });
    if (lastName.length < 2 || lastName.length > 50)
      return res.status(400).json({ message: "Last name must be 2-50 characters" });

    // 3️⃣ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    // 4️⃣ Password length and strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,20}$/;
    // Must include: lowercase, uppercase, number, special character, 8-20 chars
    if (!passwordRegex.test(password))
      return res.status(400).json({ 
        message: "Password must be 6-20 characters and include uppercase, lowercase, number, and special character" 
      });

    // 5️⃣ Repeat password validation
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    // 🔹 Check existing client
    const existingclient = await Client.findOne({ where: { email } });
    if (existingclient)
      return res.status(400).json({ message: "Email already registered" });

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 Create client
    const newclient = await Client.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Client registered successfully",
      client: {
        id: newclient.id,
        firstName: newclient.firstName,
        lastName: newclient.lastName,
        email: newclient.email,
        token: generateToken(newclient.id),
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Login Controller
exports.clientlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const client = await Client.findOne({ where: { email } });
    if (!client) return res.status(404).json({ message: "client not found" });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    res.status(200).json({
      message: "Login successful",
      client: {
        id: client.id,
        firstName: client.firstName,  
        lastName: client.lastName,
        email: client.email,
        token: generateToken(client.id),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll({
      order: [["createdAt", "DESC"]],
      attributes: { exclude: ["password", "captcha"] },
    });

    res.status(200).json({ count: clients.length, clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }

    await client.destroy();

    res.status(200).json({
      message: `client with ID ${id} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// update Profile+
exports.updateClientProfile = async (req, res) => {
  try {
    const { id } = req.params; 
    const {
      firstName, lastName, email, mobile,
      street, aptBlock, city, state, country, zipCode,
      countryCode, dob, password, termsAccepted
    } = req.body;

    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ message: "client not found" });
    
    let hashedPassword = client.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update profile image 
    const profileImage = req.files?.profileImage ? req.files.profileImage[0].path : client.profileImage;
    const kycIdentity = req.files?.kycIdentity ? req.files.kycIdentity[0].path : client.kycIdentity;
    const kycAddress = req.files?.kycAddress ? req.files.kycAddress[0].path : client.kycAddress;

   await client.update({
  firstName: firstName ?? client.firstName,
  lastName: lastName ?? client.lastName,
  email: email ?? client.email,
  mobile: mobile ?? client.mobile,
  street: street ?? client.street,
  aptBlock: aptBlock ?? client.aptBlock,
  city: city ?? client.city,
  state: state ?? client.state,
  country: country ?? client.country,
  zipCode: zipCode ?? client.zipCode,
  countryCode: countryCode ?? client.countryCode,
  dob: dob ? new Date(dob) : client.dob,
  password: hashedPassword,
  profileImage,
  kycIdentity,
  kycAddress,
  termsAccepted: termsAccepted ?? client.termsAccepted
});

    res.status(200).json({ message: "Profile updated successfully", client });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Step 1: Send OTP to client email
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    client.resetOtp = otp;
    client.resetOtpExpire = Date.now() + 10 * 60 * 1000; // 10 min
    client.resetOtpVerified = false;

    await client.save();

    await sendEmail(
      `${client.firstName} ${client.lastName}`,
      email,
      otp
    );

    return res.status(200).json({
      message: "OTP sent to your email"
    });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

// Step 2: Verify OTP
exports.verifyOtp = async (req, res) => {
  try {
    const {email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email & OTP required"
      });
    }

    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }

    if (client.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (client.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    client.resetOtpVerified = true;
    await client.save();

    return res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Step 3: Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({
        message: "Email, new password & confirm password required"
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const client = await Client.findOne({ where: { email } });
    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }

    if (!client.resetOtpVerified) {
      return res.status(400).json({
        message: "OTP not verified yet"
      });
    }

    client.password = await bcrypt.hash(newPassword, 10);

    client.resetOtp = null;
    client.resetOtpExpire = null;
    client.resetOtpVerified = false;

    await client.save();

    return res.status(200).json({
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};



