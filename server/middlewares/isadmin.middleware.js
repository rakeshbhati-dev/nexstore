const isadmin=(req,res,next)=>{
    const role=req.user.role.toLowerCase()
    if(role=='admin'){
        next()
    }
    else{
        res.status(401).json({message:"Access denied"})
    }
}

module.exports=isadmin