import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_USER,
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
    },
})

transporter.verify()
.then(() => {
    console.log("Ready to send emails");
})
.catch((error) => {
    console.error("Error setting up email transporter:", error);
});