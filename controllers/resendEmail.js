// importar el esquema del usuario y el model del email
const userSchema = require("../models/schemas/userSchema.js");
const emailModel = require("../models/email.js");


// Controlador para realizar el reenvío del correo de verificación
const resendVerificationEmail = async(req, res, next)=>{
    const {email} = req.body;
    // Valida si el campo de email esta presente en la solicitud
    if(!email){
        return res.status(400).json({message: "Missing required field email"});
    }
    try{
          // Buscar un usuario en la base de datos con la dirección de correo electrónico
          // proporcionada
        const user = await userSchema.findOne({email});

        // Si el usuario ya está verificado, responder con un código de estado 400
        if(!user){
            return res.status(400).json({message: "User not found"});
        }
        // Si el usuario ya está verificado, responder con un código de estado 400
        if(user.verify){
            return res.status(400).json({message: "Verification has already been passed"});
        }
        // Si el usuario no está verificado, obtener el token de verificación existente
        const verificationToken = user.verificationToken;

         // Enviar el correo de verificación nuevamente utilizando el servicio de correo electrónico
        await emailModel.sendEmail(email, verificationToken);

         // Responder con un código de estado 200 y un mensaje de éxito
        res.status(200).json({ message: "Verification email sent" });
    }catch(error){
          // Pasar cualquier error al middleware de manejo de errores
          next(error);
    }
}


module.exports = resendVerificationEmail;


