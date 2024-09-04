import nodemailer from "nodemailer";
import crypto from "crypto";
import { Verify_token } from "../models/user.model.js";

export const verification_token = async (user) => {
  console.log(user);
  try {
    const token = crypto.randomBytes(20).toString("hex");
    // const verify_token = new Verify_token({
    //     token: token,
    //     userId: user._id,
    // });
    // await verify_token.save();
    // return token;
    return await Verify_token.create({
      // create a new verification token
      token: token,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
  }
};

/* ------ template for verification email ----- */
export const genEmailTemplate = (name, token, userid) => {
  const link = `https://localhost:5000/users/confirm/${token}/${userid}`;
  return `
        Hi ${name}!<br/><br/>
        Thank you for joining us. Please click on the following link to confirm and activate your account: <br />
        <a href="${link}">${link}</a><br/><br/>

        good luck!
    `;
};

/* ------ activate user by sending email ------ */
export const send_activate_email = async function (user, token) {
  console.log(user, token);
  try {
    // setup transporter
    const transporter = nodemailer.createTransport({
      host: process.env.host,
      port: 465,
      secure: true,
      auth: {
        user: process.env.email,
        pass: process.env.password,
      },
    });
    // send email
    let mailOptions = {
      from: process.env.email,
      to: user.email,
      subject: "Verify your account!",
      html: genEmailTemplate(user.fullName, token, user._id),
    };
    const info = await transporter.sendMail(
      {
        from: process.env.email,
        to: user.email,
        subject: "Verify Your Blog Account! 😊",
        html: genEmailTemplate(user.fullName, token, user._id),
      }
      //   mailOptions, (err, info) => {
      //   console.log(mailOptions);
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.log(info);
      //   }
      // }
    );

    //return info;
  } catch (error) {
    console.error(error);
  }
};

/* -------------- error generator ------------- */
export const createError = (msg, status) => {
  const err = new Error(msg);
  err.status = status;

  return err;
};
