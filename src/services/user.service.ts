import { User } from "../models/user.model";

const checkUser = async (email: string): Promise<boolean | any> => {
  try {
    const user = await User.findOne({ 
      where: { email } ,
    });
    
    return user ? user : false;
  } catch (error:any) {
    console.log(error);
    throw new Error(error);
  }
};  

export default checkUser;
