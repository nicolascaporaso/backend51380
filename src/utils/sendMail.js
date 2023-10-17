import nodemailer from 'nodemailer';
import logger from "../config/logger.js";

export async function sendEmailsToDeletedProducts(data, id) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, 
        auth: {
            user: GMAIL_CLIENT_USER,
            pass: GMAIL_CLIENT_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
        
    });

    const mailOptions = {
        from: GMAIL_CLIENT_USER,
        to: data,
        subject: 'Aviso de eliminación de producto',
        text: `se ha eliminado el producto ${id}`
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Correo enviado a ${data}`);
        return 'producto eliminado y correo enviado a usuario premium'
    } catch (error) {
        console.error(`Error al enviar el correo a ${data}: ${error.message}`);
    }


transporter.close();
}


export async function sendEmailsToDeletedUsers(deletedUsers) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, 
        auth: {
            user: GMAIL_CLIENT_USER,
            pass: GMAIL_CLIENT_PASS,
        },
        tls: {
            rejectUnauthorized: false
        }
        
    });

for (const user of deletedUsers) {
    const mailOptions = {
        from: GMAIL_CLIENT_USER,
        to: user.email,
        subject: 'Aviso de eliminación de cuenta',
        text: 'Tu cuenta ha sido eliminada. Si tienes alguna pregunta, por favor contáctanos.',
    };

    try {
        await transporter.sendMail(mailOptions);
        logger.info(`Correo enviado a ${user.email}`);
    } catch (error) {
        console.error(`Error al enviar el correo a ${user.email}: ${error.message}`);
    }
}

transporter.close();
}

