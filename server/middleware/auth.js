
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
const secretKey = process.env.SECRETKEY;

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
        req.userId = decoded.id;
        req.username = decoded.username;
        req.role = decoded.role;
        
        console.log("decoded.role:", decoded.role);
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
function isAdmin(req, res, next) 
{
    if (req.role != "admin") 
    { // תפקיד 1 = מנהל
        return res.status(403).json({ error: 'Access denied' });
    }
    next();
}

export { verifyToken, generateToken, isAdmin};