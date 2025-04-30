import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailjs from 'emailjs-com';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-order', async (req, res) => {
  const { user_name, user_address, user_phone, user_email, cart_summary } = req.body;

  const templateParams = {
    user_name,
    user_address,
    user_phone,
    user_email,
    cart_summary
  };

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams,
      process.env.EMAILJS_USER_ID
    );
    res.status(200).send({ message: 'Pedido enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar email:', error);
    res.status(500).send({ message: 'Error al enviar email', error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
