import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Successfully update",
            data: updatedUser
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed update",
        })
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully delete"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete"
        })
    }
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select("-password");

        res.status(200).json({
            success: true,
            message: "Successfully to find user",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found"
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");// nao exibe no "GET"

        res.status(200).json({
            success: true,
            message: "Successfully to get all users",
            data: users
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not Found"
        })
    }
}