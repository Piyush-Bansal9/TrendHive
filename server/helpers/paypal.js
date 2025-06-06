import dotenv from 'dotenv';
import  paypal from "paypal-rest-sdk";
dotenv.config()

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_SECRET_KEY,
});

export default paypal;