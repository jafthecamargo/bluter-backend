const express = require("express");
const cors = require("cors");
const app = express();

const nodemailer = require("nodemailer");

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json()); //middleware para analizar el cuerpo de la solicitud como JSON

app.post("/enviar-correo", (req, res) => {
  console.log("Cuerpo de la solicitud: ", req.body);
  const { destino, asunto, texto } = req.body;

  //transporte de correo
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "blutercenter@gmail.com",
      pass: "fnbexhbzukyaerty",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //configura contenido del correo
  const mailOptions = {
    from: "blutercenter@gmail.com",
    to: destino,
    subject: asunto,
    html: `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8">
      <title>Correo Electrónico</title>
    </head>
    
    <body>
      <p>${texto}</p>
      <img src="cid:enfermera.png"/>
      <img src="cid:bluter.png"/>
    </body>
    
    </html>
    `,
    attachments:[
      {
        filename:'enfermera.png',
        path:'./images/enfermera.png',
        cid:'enfermera.png' //Identificador de contenido
      },
      {
        filename:'bluter.png',
        path:'./images/bluter.png',
        cid:'bluter.png'
      }
    ]
  };

  //envia el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo: ", error);
      res.status(500).json({ message: "Error al enviar el correo" });
    } else {
      console.log("Correo enviado: ", info.response);
      res.status(200).json({ message: "Correo enviado exitosamente" });
    }
  });
});

app.listen(3001, () => {
  console.log("Servidor en ejecución en el puerto 3001");
});
