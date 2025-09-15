const Address = require('../models/address.model')

const addAddress = async (req, res) => {
    const { addressLine, city, state, landmark, pincode } = req.body
    const { userId } = req.user

    try {
        if (!userId) {
            return res.status(404).json({ message: "No user found. ID is missing" })
        }
        const existingAddress = await Address.find({ userId: userId }).countDocuments()
        let isPrimary = existingAddress > 0 ? false : true
        const address = await Address.create({ userId, addressLine, city, state, landmark, pincode, isPrimary })
        return res.status(201).json({ message: "Address Created Successfully.", address: address })

    } catch (err) {
        return res.status(500).json({ message: err.message, error: err })
    }
}

const getAddress = async (req, res) => {
    const { userId } = req.user
    try {
        if (!userId) {
            return res.status(404).json({ message: "No user found. ID is missing" })
        }
        const address = await Address.find({ userId: userId })
        if (address.length == 0) {
            return res.status(204).json({ message: "No address found" })
        }
        return res.status(200).json({ message: "Address found", addressList: address })
    } catch (err) {
        return res.status(500).json({ message: err.message, error: err })
    }

}

const getParticularAddress = async (req, res) => {
    const { id } = req.params
    try {
        const address = await Address.findById(id)
        return res.status(200).json({ message: "Address found successfully", address: address })
    } catch (err) {
        return res.status(500).json({ message: err.message, error: err })
    }
}

const deleteAddress = async (req, res) => {
    const { id } = req.params
    try {
        const address = await Address.findByIdAndDelete(id)
        if (!address) {
            return res.status(404).json({ message: "No Address found" })
        }
        return res.status(204).json({ message: "Address Deleted Successfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message, error: err })
    }
}

const updateAddress = async (req, res) => {
    const { id } = req.params
    const { addressLine, city, state, landmark, pincode } = req.body
    try {
        const update = await Address.findByIdAndUpdate(id, { addressLine, city, state, landmark, pincode }, { new: true })
        if (!update) {
            return res.status(404).json({ message: "No Address found" })
        }
        return res.status(201).json({ message: "Address Updated Successfully", address: update })
    } catch (err) {
        return res.status(500).json({ message: err.message, error: err })
    }
}

const getPrimaryAddress = async (req, res) => {
    const { userId } = req.user
    try {
        const address = await Address.findOne({ userId: userId, isPrimary: true })
        if (!address) {
            return res.status(404).json({ message: "No Address found" })
        }
        return res.status(200).json({ message: "Address found successfully", address: address })
    } catch (err) {
        return res.status(500).json({ message: err.message, error: err })
    }
}

module.exports = { addAddress, getAddress, getParticularAddress, deleteAddress, updateAddress, getPrimaryAddress }