import React, { useEffect } from 'react'
import Signup from '../Components/Signup/Signup.jsx'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const { isAuthenticated} = useSelector((state) => state.user);
    const navigate =  useNavigate()
    useEffect(() => {
      if (isAuthenticated === true) {
        navigate("/");
      }
    }, []);
  return (
    <div className="">
      <Signup/>
    </div>
  )
}

export default LoginPage
