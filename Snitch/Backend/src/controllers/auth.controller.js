import userModel from '../models/user.model.js';    
import jwt from 'jsonwebtoken';
import {config} from '../config/config.js';



    async function sendTokenResponse(user,res){
        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
            expiresIn: "1d",
        });
        res.status(200).json({ "token": token });
}




export const register = async (req, res) => {
    const{email, password, fullName, contact} = req.body;

        try{
                const existingUser = await userModel.findOne({
                    $or: [
                        { email }, 
                        { contact },
                    ]
                });

                if (existingUser) {
                        return res.status(400).json({ 
                            message: "Email or contact number already exists",
                        
                        }); 
                    }
            const user = await userModel.create({   
                fullName,
                email,
                password,
                contact
            });

          





        }catch(error){
            console.log(error)
            return res.status(500).json({ message: "Server error" });
        }
}
