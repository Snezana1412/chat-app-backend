import nodemailer from "nodemailer";
import crypto from "crypto";
import { verify } from "../models/user.model.js";

export const verification_token = async (user) => {
  console.log("verification_token:", user);
  try {
    const ver_token = crypto.randomBytes(20).toString("hex");
    console.log("🚀 ~ constverification_token= ~ ver_token:", ver_token);
    // const verify_token = new verify({
    //     token: token,
    //     userId: user._id,
    // });
    // await verify_token.save();
    // return token;
    return await verify.create({
      // create a new verification token
      token: ver_token,
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
  }
};

/* ------ template for verification email ----- */
export const genEmailTemplate = (name, token, userid) => {
  //const link = `http://localhost:3000/api/users/confirm/${token}/${userid}`;
  const link = `http://localhost:3001/verification/${token}/${userid}`;
  console.log(link, "link");
  console.log(token, "token");
  console.log(userid, "userid");
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
    console.log(user.fullName, token.token, token.userId);
    // send email
    let mailOptions = {
      from: process.env.email,
      to: user.email,
      subject: "Verify your account!",
      html: genEmailTemplate(user.fullName, token.token, token.userId),
    };
    const info = await transporter.sendMail(
      {
        from: process.env.email,
        to: user.email,
        subject: "Verify Your Chat Account! 😊",
        html: genEmailTemplate(user.fullName, token.token, token.userId),
      },
      (err, info) => {
        console.log(mailOptions);
        if (err) {
          console.log(err);
        } else {
          console.log(info);
        }
      }
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
