import nodemailer from 'nodemailer'


export const emailManager = {

    async sendEmail(recipient:string,confirmationCode:string) {


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lowlight.dev@gmail.com',
                pass: 'plpxwkxilmqtyocr\n'
            }
        });

        const confirmationLink = `https://somesite.com/confirm-email?code=${confirmationCode}`

        const mailOptions = {
            from: 'Blog-API',
            to: recipient,
            subject: 'blog-api',
            html:
                ` <h1>Thank for your registration</h1>
                    <p>To finish registration please follow the link below:
                    <a href=${confirmationLink}>complete registration</a>
                    </p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                // do something useful
            }
        });


    }

}