import React, { useState } from 'react'
import styles from "../auth/auth.module.scss";
import {AiOutlineMail } from "react-icons/ai"
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import { forgotPassword, validateEmail } from '../../services/authService';

const Forgot = () => {
  const [email, setEmail] = useState("")

const handleChange = (e)=>{
  const {value} = e.target
  setEmail(value);
}

const handleSubmit = async (e)=>{
  e.preventDefault();
  if ( !email) {
    return toast.error("all fields must be filled")
  }

  if (!validateEmail(email)){
    return toast.error("email is not in valid format")
  }
  const userData = {
    email
  }
  try {
    const data = await forgotPassword(userData);
    setEmail('')
    console.log(data)
    
  } catch (error) {
    console.log(error.message);
  }

}

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
            <div className="--flex-center">
                <AiOutlineMail size={35} color="#999"/>
            </div>
            <h2>Forgot</h2>

            <form onSubmit={handleSubmit}>
                <input type="email" 
                placeholder='Email'
                required name='email' value={email} onChange={handleChange}/>
                <button type="submit" className="--btn --btn-primary --btn-block">
                    Get Reset Email
                </button>
                <div className={styles.links}>
                  <Link to='/'>-Home</Link>
                  <Link to='/login'>-Login</Link>
                </div>
            </form>
           
        </div>
      </Card>
    </div>
  )
}

export default Forgot
