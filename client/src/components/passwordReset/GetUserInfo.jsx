import React, {
    useState,
    useEffect
} from 'react'
import {
    GrFormClose
} from "react-icons/gr";
import axios from 'axios';
import Loading from '../Loading/Loading';
import PasswordReset from './ResetPassword';
import '../../styles/resetPassword.css';
import Error from '../ShowError/error';

function ResetPassword({
    setResetPassword
}) {

    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userFound, setUserFound] = useState(false);
    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');  


    const sendInfo = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        try {
            const getUser = await axios.post("http://localhost:5000/auth/getInfo", {
                email,
                code,
            });
            setUser(getUser.data.user);

            if (getUser.data.message === "User not found"){
                setErrorMessage("Invalid Email or Code, Please Try Again");
                setIsLoading(false);
            }
            console.log(user);

            if (user.name){
                setUserFound(true)
            }
            setIsLoading(false);
        } catch (e) {
            console.error(e);
        }
    }

   return userFound ?
         < PasswordReset setUserFound = {setUserFound} setResetPassword = {
             setResetPassword
         }
         userId = {
             user._id
         }
         />
   :
     (
    <> 
    {isLoading && < Loading/>} 
    {errorMessage && <Error message = {errorMessage} setErrorMessage = {setErrorMessage}/>}

    <div className = 'reset-Password' >
        <div className = 'reset-form' >
        <div className = "close-form"
        onClick = {
            () => {
                setResetPassword(false);
                setIsLoading(false);
                setErrorMessage("");
            }
        } >
        <GrFormClose />
        </div> 
        <h3> Fill The Information To Reset Your Password. </h3> 
        <form onSubmit = { (e) => sendInfo(e)}>
            <input 
                onChange = {(e) => setEmail(e.target.value)}
                required type = 'email'
                placeholder = 'Enter your Email'
                 value={email}
                 />
               
            <input 
                onChange = {(e) => setCode(e.target.value)}
                required type = 'text'
                placeholder = 'Enter your Company Code' 
                value={code}
                />
                
            <input type = 'submit' />
        </form> 
        </div> 
        </div>
    </>
    )
}

export default ResetPassword;