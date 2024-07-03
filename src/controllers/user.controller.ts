import { NextFunction, Request, Response } from 'express';
import { imgPath, User } from "../models/user.model";
import { msg } from "../config/msg";
import { sign } from "jsonwebtoken";
import bcrypt, { compare } from "bcryptjs";
import checkUser from '../services/user.service';
import Boom from '@hapi/boom';
import { SECRET_KEY } from '../config/constant';
import { validationResult } from 'express-validator';

const register = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, password, gender, interest } = req.body;
    const findUser = await checkUser(email);
    if (findUser) {
      return res.status(400).json({
        message: msg.userMessage.error.invalidEmail,
      });
    }

    let image = '';
    if (req.file) {

      const baseUrl = `${req.protocol}://${req.get('host')}`;
      image = `${baseUrl}${imgPath}/${req.file.filename}`;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      gender,
      interest,
      image,
      password: hashedPassword,
    };

    const user = await User.create(newUser);
    if (!user) {
      return res.status(400).json({ message: msg.userMessage.error.signUpError });
    }

    return res.status(201).json({ message: msg.userMessage.success.signUpSuccess });
  } catch (error:any) {
    next(Boom.badData(error))
    if (error === 'SequelizeValidationError') {
      const errors = Object.values(error.errors).map((err:any) => err.message);
      return res.status(400).json({ error: errors });
    }
    return res.status(500).json({ message: msg.userMessage.error.genericError });
  }
};

const login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const isUserExist = await checkUser(email);
    
    if (!isUserExist)
      return res.status(404).json({ message: msg.userMessage.error.userNotFound });

    const isValidPassword = await compare(
      password,
      isUserExist.dataValues.password
    );
    
    if (!isValidPassword)
      return res.status(400).json({ message: msg.userMessage.error.wrongPassword });


    // const tokenData = { password: isUserExist.password, ...isUserExist};
    delete isUserExist.dataValues.password;
    
    const token = await sign({ data: isUserExist }, SECRET_KEY, {
      expiresIn: "4h",
    });
    
    res.cookie("token", token, { httpOnly: true });

    return res
      .status(200)
      .json({ message: msg.userMessage.success.loginSuccess, token });
      
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ message: msg.userMessage.error.genericError });
  }
};

const profile = async (req: Request | any, res: Response) => {
  try {
    // const { password, createdAt, updatedAt, ...userDetails } = req.user;
    return res
      .status(200)
      .json({
        message: msg.userMessage.success.profileRetrieved,
        profile: req.user,
      });
  } catch (error) {
    return res.status(404).json({ message: msg.userMessage.error.genericError });
  }
};

export { register, login, profile };
