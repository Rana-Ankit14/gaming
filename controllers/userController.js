const User = require ('../models/UserModel')
const jwt = require('jsonwebtoken')
var md5 = require('md5');


exports.login = async (req, res) => {
    console.log('*************** called Login from ******************8888')
    try{
        const hashedPassword = md5(req.body.password);

        const userDetail  = {
            email: req.body.email,
            password: hashedPassword,
        }

        const user = await User.findOne(userDetail)//.select('email')
        // console.log('login')
        // console.log(user)

        if(user !== null && user !== undefined){

            const access_token = jwt.sign({userID: user.userID, email: user.email},process.env.ACCESS_TOKEN_SECRET)
            res.json({'isLogin': true,access_token, message: 'Login Successful'});
        }else {
            res.json({'isLogin': false, message: 'Incorrect Email or Password'});
        }


    }catch (err){
        console.log(err)
    }
    // res.json({'isLogin': false});
};

exports.register = async (req, res) => {
    console.log('*************** called Register from ******************')
    try{
        const email = req.body.email.toLowerCase();
        const hashedPassword = md5(req.body.password);
        const newUserDetail  = {
            email: email,
            name: req.body.name,
            password: hashedPassword,
        }

        const existingUser = await User.findOne({email: email})//.select('email')

        if(existingUser !== null){
            res.json({'isRegister': false, message: 'Email Already Register'});
        }else {

            const prevUser = await User.findOne({}).select('userID').sort({userID: -1});

            newUserDetail['userID'] = (prevUser === null)? 1 : (prevUser.userID + 1);

            const newUser = await User.create(newUserDetail)
            res.json({'isRegister': true, message: 'Register Successfully'});
        }
    }catch (err){
        console.log(err)
    }
    // res.json({'Register': true});
};
