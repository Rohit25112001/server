const jwt = require('jsonwebtoken');
const User = require('../../schema/user.schema');
const getCookies = require('../../modules/cookie.module');

const accessTokenRenew = async (req, res) => {
    try {
        const token_rt = req.cookies['rt'];
        const { email } = jwt.decode(token_rt);
        const user = await User.findOne({ email: email });
        const { at } = getCookies(name=['at'], 'at', process.env.DATA_SECRET_KEY, user);
        res.cookie('at',at,{
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
