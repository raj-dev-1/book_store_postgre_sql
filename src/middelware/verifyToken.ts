import jwt from 'jsonwebtoken';
import { msg } from '../config/msg';
import { SECRET_KEY } from '../config/constant';

const verifyToken = (req: any,res: any,next: any) : any => {
    try {
      const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).json({ message: msg.userMessage.error.tokenMissing });
      const token = authHeader.split(" ")[1]
      
      jwt.verify(token, SECRET_KEY, (err: any, token: { data: any; }) => {
        if (err) {
          return res.status(403).json({ message: msg.userMessage.error.unauthorized });
        }
        req.user = token.data;
        next();
      });
    } catch (error: any) {
      console.log(error);
      
    }
}

export default verifyToken;
