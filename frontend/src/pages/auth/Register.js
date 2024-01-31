import React, { useState } from 'react'
import styles from "../auth/auth.module.scss";
import {TiUserAddOutline} from 'react-icons/ti';
import Card from '../../components/card/Card';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-toastify";
import { registerUser, validateEmail } from '../../services/authService';
import {useDispatch} from 'react-redux';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';

const Register =  () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const initialState = {
    name: "",
    email: "",
    password:"",
    password2:""
  }
  
  const handleChange = (event)=>{
    const {name, value} = event.target;
    setFormData({...formData, [name]: value})
  }
  const [isLoading, setIsLoading]= useState(false);
  const [formData, setFormData ]= useState(initialState);
  const {name, email, password, password2} = formData;
  const handleSubmit = async (e) =>{
    e.preventDefault()
    if (!name || !email || !password){
      return toast.error("all fields must be filled")
    }
    if (!validateEmail(email)){
      return toast.error("please enter a valid email");
    }
    if (password.length < 6){
      return  toast.error("Passwords must be up to six characters")
    }

    if(password !== password2){
      return toast.error("passwords do not match")
    }

    const userData = {
      name, email, password
    }
    setIsLoading(true)
    try {
      const data = await registerUser(userData);
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
                <TiUserAddOutline size={35} color="#999"/>
            </div>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder='Name'
                required name='name'value ={name}  onChange={handleChange}/>
                <input type="email" 
                placeholder='Email'
                required name='email' value={email}onChange={handleChange}/>
                <input type="password"
                placeholder='Password'
                required name='password' value = {password} onChange={handleChange} />
                <input type="password"
                placeholder='Confirm password'
                required name='password2' value={password2} onChange={handleChange} />
                <button type="submit" className="--btn --btn-primary --btn-block">
                    Login
                </button>
            </form>
            <span className={styles.register}>
                <Link to='/'>Home</Link>
                <p>&nbsp; Already have an account? &nbsp;</p>
                <Link to='/login'>Login</Link>
            </span>
        </div>
      </Card>
    </div>
  )
}

export default Register
