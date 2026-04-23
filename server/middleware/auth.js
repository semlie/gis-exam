
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const secretKey = process.env.SECRETKEY || 'default_secret_key_1234';
if (!process.env.SECRETKEY) {
  console.warn('WARNING: SECRETKEY is not set. Using fallback JWT secret.');
}
const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};
function verifyToken(req, res, next) {
    // חילוץ טוקן מכותרת Authorization (פורמט: "Bearer <token>")
    const token = req.header('Authorization')!= undefined?req.header('Authorization').split(' ')[1]:null; // Assuming the token
    
    if (!token) return res.status(401).json({ error: 'Access denied' });
    
    try {
        // אימות ופענוח טוקן JWT
        const decoded = jwt.verify(token, secretKey);
        
        // צירוף מידע משתמש לאובייקט הבקשה לשימוש במידלוואר/נתיבים הבאים
        req.user_id = decoded.user_id;
        req.first_name = decoded.first_name;
        req.last_name = decoded.last_name;
        req.role = decoded.role;
        
        console.log("decoded.role:", decoded.role);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
function isTeacher(req, res, next) 
{
    if (req.role != "teacher") 
    {
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
}

export { verifyToken, generateToken, isTeacher};