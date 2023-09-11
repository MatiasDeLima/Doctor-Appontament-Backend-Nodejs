import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async (req, res) => {
    const id = req.params.id

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        )

        res.status(200).json({
            success: true,
            message: "Successfully update",
            data: updatedDoctor
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed update",
        })
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        await Doctor.findByIdAndDelete(id);

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

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id).select("-password");

        res.status(200).json({
            success: true,
            message: "Successfully to find doctor",
            data: doctor
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not found"
        })
    }
}

export const getAllDoctor = async (req, res) => {
    try {

        const { query } = req.body;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved', $or: [
                    { name: { $regex: query, $options: 'i' }, },

                    { specialization: { $regex: query, $options: 'i' }, }
                ],
            }).select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select("-password");// nao exibe no "GET"
        }

        // isAprove inpede que eu veja todos os doutores no get

        res.status(200).json({
            success: true,
            message: "Successfully to get all doctors",
            data: doctors
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Not Found"
        })
    }
}