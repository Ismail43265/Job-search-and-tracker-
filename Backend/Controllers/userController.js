const userService = require("../Services/useService");

const { validationResult } = require("express-validator");

module.exports.signUp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
            errors: errors.array()
            });
        }
        const { fullname, email, password } = req.body;

        const user = await userService.createUser({
            fullname,
            email,
            password
        });

        const token = user.generateToken();

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: false,      // true in production with HTTPS
            sameSite: "lax"
        });

        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


module.exports.login = async (req,res) =>{
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                 errors: errors.array()
            });
        };

        const {email , password} = req.body;

        const user = await userService.login({
            email,
            password
        });

        const token = user.generateToken();

        res.cookie("token", token , {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: false,      // true in production with HTTPS
            sameSite: "lax"
        });

        res.status(201).json({
            message: "Login Succesfull",
            user,
            token
        });
    }
    catch(err){
        res.status(400).json({
            message: err.message
        });
    };
}