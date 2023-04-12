import nodemailer from 'nodemailer'


export const emailManager = {

    async sendConfirmationEmailCode(recipient:string, confirmationCode:string) {

        const confirmationLink = `https://somesite.com/confirm-email?code=${confirmationCode}`

        const content = ` <h1>Thank for your registration</h1>
                    <p>To finish registration please follow the link below:
                    <a href=${confirmationLink}>complete registration</a>
                    </p>`


        await this.sendEmail(recipient,content)


    },


    async sendPasswordRecoveryCode(recipient:string, recoveryCode:string,userName:string = 'default') {


        const content = ` <p>Dear ${userName},</p>
    <p>We received a request to reset your password. Please use the following code to reset your password:</p>
    <h2 style="background-color: #f1f1f1; padding: 10px;">[ ${recoveryCode} ]</h2>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p>Thank you,</p>`


        await this.sendEmail(recipient,content)


    },


    async sendEmail(recipient:string,letterContent:string) {

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lowlight.dev@gmail.com',
                pass: 'plpxwkxilmqtyocr\n'
            }
        });


        const mailOptions = {
            from: 'Blog-API',
            to: recipient,
            subject: 'blog-api',
            html:letterContent
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