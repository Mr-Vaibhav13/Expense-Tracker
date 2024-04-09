import React, { useEffect } from 'react'
import {auth , googleAuth} from '../../config/firebase-config' 
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import { useGetUserInfo } from '../../hooks/useGetUserInfo' 
import "./style.css"

const Auth = () => {

    const navigate = useNavigate()
    const {isAuth} = useGetUserInfo()

    const signInWithGoogle = async() =>{
        const results = await signInWithPopup(auth , googleAuth)
        
        const authInfo = {
            userID: results.user.uid,
            name: results.user.displayName,
            profilePhoto : results.user.photoURL,
            isAuth: true
        };
        
        localStorage.setItem("auth", JSON.stringify(authInfo));
        navigate("/expense-tracker")
    };

    useEffect(()=>{
      if(isAuth){
        navigate('/expense-tracker')
      }
    },[isAuth])



  return (
    <div className='login-page'>

        <p>Sign In With Google</p>
        <button className='login-with-google-btn'
        onClick={signInWithGoogle}>    
        Sign In With Google</button>

    </div>
  )
}

export default Auth