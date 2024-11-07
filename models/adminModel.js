import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const schema = mongoose.Schema;

const adminSchema = new schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
  },
  { timestamps: true }
);

adminSchema.statics.signup = async function (username, email, password) {
  if (!username || !email || !password) {
    throw new Error("All fields are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid Email");
  }
  if (!validator.matches(username, "^[a-z0-9_.-]{8,}$")) {
    throw new Error(
      "username must be at least 8 characters long and contain only small letters, numbers, underscores, hyphens, and periods"
    );
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
    })
  ) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one symbol"
    );
  }

  const adminExists = await this.findOne({ username });
  if (adminExists) {
    throw new Error("Admin already exists");
  }

  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw new Error("Email already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await this.create({
    username,
    email,
    password: hashedPassword,
  });

  return admin;
};

adminSchema.statics.signin = async function (usernameOrEmail, password) {
  if (!usernameOrEmail || !password) {
    throw new Error("All fields are required");
  }

  const admin = await this.findOne({
    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
  });
  if (!admin) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    throw new Error("Invalid Password");
  }

  return admin;
};

export const Admin = mongoose.model("Admin", adminSchema);
