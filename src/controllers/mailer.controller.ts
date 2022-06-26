import hbs from "nodemailer-express-handlebars"
import path from "path"
import transporter from "../config/mailer.config"

import {IUser, ICourse} from "../interfaces/index"


const sendEmail = (user: IUser, course: ICourse) => {
    const options = {
        viewEngine: {
            partialsDir: path.resolve("./src/views"),
            defaultLayout: false
        },
        viewPath: path.resolve("./src/views")
    }

    transporter.use("compile", hbs(options as any))

    const mailOptions = {
        from: String(process.env.NODEMAILER_USER),
        to: user.email,
        subject: "Inscrição no Curso",
        template: "email",
        context: {
            firstName: user.firstName,
            lastName: user.lastName,
            courseName: course.courseName,
            duration: course.duration
        }
    }

    transporter.sendMail(mailOptions, (err) => {
        if(err) {
            console.log(err)
        }
    })
}

export default sendEmail