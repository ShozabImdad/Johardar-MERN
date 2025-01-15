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

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, role, isActive, phoneNumber } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                Success: false,
                message: "User not found",
                data: null
            });
        }

        // Update user fields if they are provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (isActive !== undefined) user.isActive = isActive;

        const updatedUser = await user.save();

        res.status(200).json({
            Success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        // Handle duplicate key errors
        if (error.code === 11000) {
            return res.status(400).json({
                Success: false,
                message: "Username or email already exists",
                data: null
            });
        }

        res.status(500).json({
            Success: false,
            message: error.message,
            data: null
        });
    }
};
