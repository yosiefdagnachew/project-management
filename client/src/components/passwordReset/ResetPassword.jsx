import React, {useState,useEffect} from 'react'
import {
    GrFormClose
} from "react-icons/gr";
import axios from 'axios';
import Loading from '../Loading/Loading';
import Error from '../ShowError/error';

function PasswordReset({
    userId,
    setResetPassword,
    setUserFound
}) {
 
  const [password, setPassword] = useState('')  
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  

  const resetPassword = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    if (password === confirmPassword) {
        try {
         const newpassword = await axios.post('http://localhost:5000/auth/resetPassword', {
             password,
             userId
         });
         setResetPassword(false);
         setIsLoading(false)
    } catch (error) {
        console.error(error);
    }}else{
        setErrorMessage("Please confirm your password correctly!");
        setPassword('');
        setConfirmPassword('');
        setIsLoading(false)
    }
  }

  return (

    <div className='password-reset-form'>
        {
            errorMessage && < Error message = {
                errorMessage
            }
            setErrorMessage = {
                setErrorMessage
            }
            />
        }
        {
            isLoading
         && <Loading/>}
         <form onSubmit = {
             (e) => resetPassword(e)
         } >
              <div className = "close-form"
        onClick = {
            () => {
                setUserFound(false);
                 setResetPassword(false);
            }
        } >
        <GrFormClose />
        </div> 
            <input 
                onChange = {(e) => setPassword(e.target.value)}
                required type = 'password'
                placeholder = 'Enter new password' 
                value ={password}
                />
            <input 
                onChange = {(e) => setConfirmPassword(e.target.value)}
                required type = 'password'
                placeholder = 'Confirm your password' 
                value = {confirmPassword}
                />
            <input type = 'submit' />
        </form> 
    </div>
  )
}

export default PasswordReset;