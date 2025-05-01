
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-order', async (req, res) => {
  const { user_name, user_address, user_phone, user_email, cart_summary } = req.body;

  const content = `
Nuevo pedido de Mini Bar:

Nombre: ${user_name}
Dirección: ${user_address}
Teléfono: ${user_phone}
Correo: ${user_email}

Pedido:
${cart_summary}
  `;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'santiagoparody@gmail.com',
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: 'Mini Bar <santiagoparody@gmail.com>',
      to: 'santiagoparody@gmail.com',
      subject: 'Nuevo Pedido - Mini Bar',
      text: content
    });

    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error al enviar el pedido:', error);
    res.status(500).send({ success: false, message: 'Error al enviar correo' });
  }
});

app.get('/', (req, res) => {
  res.send('Mini Bar Server Online');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
