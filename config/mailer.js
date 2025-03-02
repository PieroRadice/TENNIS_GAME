const nodemailer = require("nodemailer");

const spedisciMailConferma = (to, urlToken) => {
  // messaggio da inviare
  const mailOptions = {
    from: "radice.p@gmail.com",
    to: to,
    subject: "Test email nodejs",
    //text: 'Sgart.it' // invia il corpo in plaintext
    html: `<b>------------------ </b><a href="https://localhost:5000/confermaSignup/${urlToken}" >conferma</a>`, // invia il corpo in html
  };
  // definisco il trasporto
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "radice.p@gmail.com",
      pass: "rflifvprjesmglvy",
    },
  });
  //sendmail restituisce una promise
  return transporter.sendMail(mailOptions);
};

module.exports = { spedisciMailConferma };
