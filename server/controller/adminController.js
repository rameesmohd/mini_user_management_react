const { adminToken } = require("../middleware/auth");
const adminModel = require('../model/adminModel')
const userModel = require('../model/userSchema')

const adminLogin = async (req,res)=>{
    try {
        let adminResult = {
            Status: false,
            message: null,
            token: null,
        };
        let adminDetails = req.body;
        const admin = await adminModel.findOne({ email: adminDetails.email });
        if (admin) {
            if (admin.password === adminDetails.password) {
                const token = adminToken(admin);
                adminResult.Status = true;
                adminResult.token = token;
                res.json({ adminResult });
            } else {
                adminResult.message = "Your Password not matched";
                res.json({ adminResult });
            }
        } else {
            adminResult.message = "Your email is wrong";
            res.json({ adminResult });
        }
    } catch (error) {
        console.log(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const users = await userModel.find({});
        res.json({ status: "success", result: users });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
    }
};

const userEdit = async (req, res, next) => {
    try {
        const id = req.query.id;
        const findUser = await userModel.findById(id);
        res.json({ result: findUser });
    } catch (error) {
        console.log(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        let userDetails = req.body;
        const id = req.body.id;
        await userModel.updateOne({ _id: id }, { $set: { name: userDetails.name, phone: userDetails.phone ,email : userDetails.email} });
        res.json({ status: "success" });
    } catch (error) {
        console.log(error.message);
        res.json({ status: "failed", message: error.message });
    }
};


const deleteUser = async (req, res, next) => {
    try {
        await userModel.deleteOne({ _id: req.body.id });
        const users = await userModel.find({});
        res.json({ status: "success", result: users });
    } catch (error) {
        res.json({ status: "failed", message: error.message });
        console.log(error);
    }
};


module.exports = {
    adminLogin,
    getUser,
    userEdit,
    updateUser,
    deleteUser
}