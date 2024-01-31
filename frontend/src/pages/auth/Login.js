import React, { useState } from 'react'
import styles from "../auth/auth.module.scss";
import {BiLogIn} from "react-icons/bi"
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { loginUser, validateEmail } from '../../services/authService';
import {useDispatch} from 'react-redux';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';


const Login = () => {

  const initialState = {
    email: "",
    password:"",
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading]= useState(false);
  const [formData, setFormData ]= useState(initialState);
  const {email, password} = formData;

  const handleChange = (event)=>{
    const {name, value} = event.target;
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    if (!email || !password){
      return toast.error("all fields must be filled")
    }
    if (!validateEmail(email)){
      return toast.error("please enter a valid email");
    }
    if (password.length < 6){
      return  toast.error("Passwords must be up to six characters")
    }


    const userData = {
      email, password
    }
    setIsLoading(true)
    try {
      const data = await loginUser(userData);
      console.log(data)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  }
  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader/>}
      <Card>
        <div className={styles.form}>
            <div className="--flex-center">
                <BiLogIn size={35} color="#999"/>
            </div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input type="email" 
                placeholder='Email'
                required name='email' value={email} onChange={handleChange}/>
                <input type="password"
                placeholder='Password'
                required name='password' value={password} onChange={handleChange}/>
                <button type="submit" className="--btn --btn-primary --btn-block">
                    Login
                </button>
            </form>
            <Link to='/forgot'>Forgot password</Link>
            <span className={styles.register}>
                <Link to='/'>Home</Link>
                <p>&nbsp; Don't have an account? &nbsp;</p>
                <Link to='/register'>Register</Link>
            </span>
        </div>
      </Card>
    </div>
  )
}

export default Login
