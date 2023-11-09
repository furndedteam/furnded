import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

type mailOpt = {
  from: string;
  to: string;
  subject: string;
  html: string;
}



let transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 465,
  secure: true,
  auth: {
    user: `${process.env.SMTP_USER}`,
    pass: `${process.env.SMTP_PASSWORD}`
  },
  tls: { rejectUnauthorized: false }, 
});




const verifyTransporter = () => {
  return new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  };



  
const sendMail = (mailData: mailOpt) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};



export async function POST(req: NextRequest) {
  const { name, country, email, phone, message } = await req.json();

  try {
    await verifyTransporter();

    const mailData = {
      from: `${process.env.SMTP_USER}`,
      to: `${process.env.SMTP_USER}`,
      subject: 'Contact Message!',
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Contact Message!</title>
        <style>
          body, table, td, div, p, a {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
          }
      
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4 !important;
          }
      
          /* Add CSS styles inline */
          .header {
            background-color: #263238 !important;
            padding: 20px;
            text-align: center;
          }
      
          .logo {
            max-width: 150px;
            height: auto;
          }
              
          .greeting {
            font-size: 26px !important; 
            font-weight: 500 !important;
            letter-spacing: -1.5px !important;
            word-spacing: 3px !important;
            color: #333333;
            margin-bottom: 20px;
          }
      
          .content {
            background-color: #ffffff;
            padding: 40px 20px;
          }
      
          .message {
            margin-bottom: 20px;
            line-height: 1.5;
          }
      
          .footer {
            background-color: #263238 !important;
            padding: 20px;
            text-align: center;
          }
      
          .footer-logo {
            max-width: 100px;
            height: auto;
            margin-bottom: 10px;
          }
      
          .footer-message {
            font-size: 12px;
            color: #fafafa !important;
            margin-bottom: 10px;
          }
        </style>
      </head>
      
      <body>
        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center">
              <table width="600" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="header">
                    <img class="logo" src="https://octaviaantonya.vercel.app/_next/static/media/logo.b09b08bf.svg" alt="Octavia Antonya Cephas Logo">
                  </td>
                </tr>
                <tr>
                  <td class="content">
                    <h1 class="greeting">Contact Message!</h1>
                    <p class="message">Name: ${name}</p>
                    <p class="message">Email: ${email}</p>
                    <p class="message">Phone: ${phone}</p>
                    <p class="message">Country: ${country}</p>
                    <p class="message">Message: ${message}</p>
                  </td>
                </tr>
                <tr>
                  <td class="footer">
                    <img class="footer-logo" src="https://octaviaantonya.vercel.app/_next/static/media/logo.b09b08bf.svg" alt="Octavia Antonya Cephas Logo Logo">
                    <p class="footer-message">© 2022 Octavia Antonya Cephas | All Rights Reserved</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
      `,
    };

    // Send mail
    await sendMail(mailData);

    return new Response(JSON.stringify({status: "ok"}))
  } catch (error) {
    return new Response(JSON.stringify({ error: "An error occurred while sending the email" }))
  }
}
