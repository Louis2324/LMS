import jwt from "jsonwebtoken";
export const authenticateUser = (req,res,next) => {
 const authHeader = req.headers.authorization;
 if(!authHeader || !authHeader.startsWith("Bearer ")) return res.status(401).json({msg:"Unauthorized"});
 try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = {id: decoded.userId , role:decoded.role}
    next();
 } catch (error) {
    return res.status(401).json({msg:"Bad or Invalid token"});
 }
};

export const authorizeRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({msg:"Access denied"});
        }
        next();
    }
}