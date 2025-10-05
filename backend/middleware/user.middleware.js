import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) =>{
    try {
        const {token} = req.headers
        if(!token){
            return res.status(400).json({ success: false, message: "Not Authorrized Login again" });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = token_decode.id

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error, please try again later" });
    }
}

export default authUser;