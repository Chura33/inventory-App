import React, { useState } from 'react'
import styles from "../auth/auth.module.scss";
import {MdPassword } from "react-icons/md"
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import {toast} from "react-toastify"
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
const Reset = () => {
  const initialState = {
    password:"",
    password2:"",
  }
  const [formData, setFormData] = useState(initialState)
  const {password, password2} = formData
  const {resetToken} = useParams()

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if (!password || !password2){
      return toast.error("all fields must be filled")
    }
   
    if (password !== password2){
      return toast.error("passwords do not match")
    }
    if (password.length < 6 || password2.length < 6){
      return  toast.error("Passwords must be up to six characters")
    }

    const formData = {
      password,password2
    }
    try {
      const data = await resetPassword(formData, resetToken);
      setFormData(initialState);
    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
            <div className="--flex-center">
                <MdPassword size={35} color="#999"/>
            </div>
            <h2>Reset</h2>

            <form onSubmit= {handleSubmit}>
                <input type="password" 
                placeholder='New Password'
                required name='password' value={password} onChange={handleChange}/>
                <input type="password" 
                placeholder='Confirm New Password'
                required name='password2' value={password2} onChange={handleChange}/>
                <button type="submit" className="--btn --btn-primary --btn-block">
                    Reset Password
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

export default Reset
