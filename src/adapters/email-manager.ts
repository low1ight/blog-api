import nodemailer from 'nodemailer'


export const emailManager = {

    async sendConfirmationEmailCode(recipient:string, confirmationCode:string) {



        const content = ` <h1>Thank for your registration</h1>
                    <p>To finish registration please follow the link below:
                    <a href='https://localhost:3000/confirm-email?code=${confirmationCode}'>complete registration</a>
                    </p>`


        await this.sendEmail(recipient,content)


    },


    async sendPasswordRecoveryCode(recipient:string, recoveryCode:string) {


        const content = ` <h1>Password recovery</h1>
       <p>To finish password recovery please follow the link below:
          <a href='https://somesite.com/password-recovery?recoveryCode=${recoveryCode}'>recovery password</a>
      </p>`


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