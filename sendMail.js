const nodemailer = require("nodemailer")

const sendForgotPasswordEmail = async (email, token) =>{

      try {
        let mailTransporter = nodemailer.createTransport({
        service:"gmail",
       auth: {
              user:`${process.env.EMAIL}`,
              pass:`${process.env.EMAIL_PASSWORD}`
        } 
      })

      const mailDetails = {
        from:`${process.env.EMAIL}`,
        to:`${email}`,
        subject:"RESET PASSWORD NOTIFICATION",
        html:`<h1>
        Here is the token to reset your password please click on the button,
         <a class="" href="http://www.yourcareerex.com/reset-password/${token}>Reset Password</a>
         
         if the button does not work, please click the link below
        <a class="" href="http://www.yourcareerex.com/reset-password/${token}>Reset Password</a> 
         
        ${token}
            
        </h1>`
      }

      await mailTransporter.sendMail(mailDetails)
      } catch (error) {
        res.status(500).json({message:error.message})
      }
}

const validEmail = (email) => {
    try {
        const validEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
  }

module.exports = {
    sendForgotPasswordEmail,
    validEmail
}