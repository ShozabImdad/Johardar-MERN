import User from '../models/User.js';


export const addUser = async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })

        res.status(201).json({
            Success: true,
            message: "User Created",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            Success: false,
            message: error.message,
            data: null
        })
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            Success: true,
            message: "Users Fetched Successfully",
            data: users
        })
    } catch (error) {
        res.status(500).json({
            Success: false,
            message: error.message,
            data: null
        })
    }
};



export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({
                Success: false,
                message: "User not found",
                data: null
            })
        }

        res.status(200).json({
            Success: true,
            message: "User found",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            Success: false,
            message: error.message,
            data: null
        })
    }
};


export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        console.log(user)
        if (!user) {
            return res.status(404).json({
                Success: false,
                message: "User not found",
                data: null
            })
        }

        await user.deleteOne();
        res.status(200).json({
            Success: true,
            message: "User Deleted",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            Success: false,
            message: error.message,
            data: null
        })
    }
}
