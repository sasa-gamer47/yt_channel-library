import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

dbConnect()

export default async (req, res) => {


    const { method } = req

    // console.log(method);

    switch (method) {
        case 'GET':
            try {
                const users = await User.find({})
            res.status(200).json({ success: true, data: users })
            } catch (error) {
                console.log(error)
                res.status(400).json({ error: error.message })
            }

            break
        case 'POST':
            try {
                const user = await User.create(req.body)
                res.status(201).json({ success: true, data: user })
            } catch (error) {
                console.log(error)
                res.status(400).json({ error: error.message })
            }
            break
        default:
            res.status(400).json({ message: 'Method not allowed' })
            break
    }
}