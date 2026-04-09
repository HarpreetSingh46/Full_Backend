import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,   
        required: [ true, "Username is required"],
        unique: true,
    }, 
    role: {
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer",
    }, 
    email: {
        type: String,
        required: [ true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [ true, "Password is required"],
    },
    contact:{
        type: String,
        required: [ true, "Contact is required"],
    }
}, { timestamps: true });

    userSchema.pre("save", async function (next) {
        if (!this.isModified("password")) {
            return next();
        }

        const hash =  await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    });

    userSchema.methods.comparePassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    };

const userModel = mongoose.model("User", userSchema);

export default userModel;