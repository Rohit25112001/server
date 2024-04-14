const test = (req, res)=>{
    const token  = req.cookies['aat'];

    if(token) return res.status(200).json({success:true});

    res.clearCookie('art');
    res.status(401).json({success:false})
}

module.exports = test