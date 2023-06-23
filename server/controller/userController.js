const bcrypt = require('bcrypt')
const userModel = require('../model/userSchema');
const { generateAuthToken } = require('../middleware/auth');

const Register = async(req,res) =>{
    try {
        let userDetails = req.body
        const user = await userModel.find({email : userDetails.email});
        if(user.length===0){
            const password = await bcrypt.hash(userDetails.password,10)
            userModel.create({
                name: userDetails.name,
                email: userDetails.email.toLowerCase(),
                phone: userDetails.phone,
                password: password,
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
            res.json({ status: true, result: userDetails });
        }else{
            return res.json({ error: true });
        }
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
}

const login= async(req,res)=>{
    try {
        let response = {
            status: false,
            message: null,
            token: null,
            name: null,
        };
        const userDetails = await userModel.findOne({email : req.body.email})
        if(userDetails){
            const isMatch = bcrypt.compare(userDetails.password,req.body.password)
            if(isMatch){
                response.token = generateAuthToken(userDetails)
                response.status = true
                response.message = 'you have logged In'
                response.name = userDetails.name
                let token = response.token
                let name = response.name
                const obj = {token,name};
                res.cookie("jwt", obj,{
                    httpOnly: false,
                    maxAge: 6000 * 1000}).status(200).json({ response });
            }else{
                response.message = 'password is wrong'
                response.status = false
                res.json({response})
            }   
        }else{
            response.message = "your Email wrong";
            response.status = false;
            res.send({ response });
        }
    } catch (error){
        res.json({ status: "failed", message: error.message });
    }
}

const userProfile = async (req, res, next) => {
    try {
        const id = req.user;
        let userDetails = await userModel.findOne({ _id: id._id });
        if (userDetails) {
            res.status(200).json({ data: userDetails });
        } else {
            res.status(500).json({ error: "no user" });
        }
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

const updateProfile = async (req,res,next) => {
    try {
        // console.log(req.body);
        const id = req.user._id
        const update = await userModel.updateOne({_id : id},
            {$set : 
                {name : req.body.name,
                email : req.body.email,
                phone : req.body.phone,
                image : req.body.image
        }})
        res.json({status : 'success'})
    } catch (error) {
        console.log(error.message);  
        res.json({status : 'failed'}) 
    }
}

const getDetails = async (req, res, next) => {
    // console.log(req.user, "id");
    try {
        const user = await userModel.findById(req.user._id);
        res.json({
            name: user.name,
            email: user.email,
            phone: user.phone,
            image: user.image || null,
        });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

module.exports = {
    Register,
    login,
    userProfile,
    updateProfile,
    getDetails
}

