const jwt = require('jsonwebtoken');
const User = require('../../schema/user.schema');
const Admin = require('../../schema/admin.schema')
const getCookies = require('../../modules/cookie.module');

const accessTokenRenew = async (req, res) => {
    try {
        const token_rt = req.cookies['art'];
        const { email } = jwt.decode(token_rt);
        const admin = await Admin.findOne({ email: email },{__v:0});
        const {aat} = getCookies(['aat'],'at', process.env.SECRET_ADMIN, admin)
        res.cookie('aat',aat,{
            httpOnly:true,
            maxAge:900000,
            secure:false
        })

        res.status(200).json({success:true});
    } 
    catch (err) {
        console.log(err);
        return res.status(401).json({ success: false });
    }
}

module.exports = accessTokenRenew;
