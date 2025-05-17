const path = require('path');
const User = require('../models/User.js');
const { validateUserSignup } = require('../repository/UserRepository.js');

class UserController {
    static async getSignIn(req, res) {
        try {
            res.sendFile(path.join(__dirname, '../../client/signin.html'))

        } catch (error) {
            res.status(500).json({ message: 'Error of server !' });

        }
    }

    static async getNotes(req, res) {
        try {

            res.sendFile(path.join(__dirname, '../../client/notes.html'))
        } catch (error) {
            res.status(500).json({ message: 'Error of server !' });
        }
    }

    static async getSignup(req, res) {
        try {
            res.sendFile(path.join(__dirname, '../../client/signup.html'));

        } catch (error) {
            res.status(500).json({ message: 'Error of server !' });
        }

    }

    static async postSignup(req, res) {
        try {

            const { name, email, password, confirm_password } = req.body;
            const errors = [];

            // Solicitar contraseña contener letras, números y al menos un símbolo.
            const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

            const verify = validateUserSignup({ name, email, password });
            if (!verify.success) {
                const message = JSON.parse(verify.error);
                const errorsZod = message.map(err => err.message);
                errors.push(errorsZod);
            }

            if (password !== confirm_password) {
                errors.push('Password and confirm password do not match')
            }

            if (!regex.test(password.trim()) && !regex.test(confirm_password.trim())) {
                errors.push('Password must be at least 8 characters minim, have letters, numbers and symbol' );
            }

            if (errors.length > 0) {
                // forma de redireccionar con sendFile
                // res.sendFile(path.join(__dirname, '../../client/signup.html'));
                // forma de redirect 
                // res.redirect(301, 'https://google.com');
                // res.redirect('/signup?error=Credenciales%20Incorrectas');
                return res.redirect(`/signup?error=${JSON.stringify(errors)}`);

            }

            else {
                const emailUser = await User.findOne({ email: email });
                if (emailUser) {
                    return res.redirect("/signup?error=mail already exist!");
                    // res.sendFile(path.join(__dirname, '../../client/signup.html'));
                    // res.status(400).sendFile(path.join(__dirname, '../../client/signup.html'));
                }

                const newUser = new User({ name, email, password });
                newUser.password = await newUser.encryptPassword(password.trim());
                await newUser.save();
                // res.sendFile(path.join(__dirname, '../../client/signin.html'));
                return  res.redirect("/signin?success=account created!");
            }
        } catch (error) {
            console.log(error);

            res.status(500).json({ message: 'Error of server!' });

        }


    }

    static logout(req, res, next) {
        try {
            req.logout(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect(`/`);
            })

        } catch (error) {
            res.status(500).json({ message: 'Error of server!' });
        }

    }
}


module.exports = {

    UserController
};
