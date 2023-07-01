import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Register() {
    let [errors,setErrors]=useState([]);
    let navigate=useNavigate();

    let [statusError,setStatusError]=useState('');

    const schema =Yup.object({
        userName:Yup.string().required("Name is required").min(3,"must be more than 3").max(10,"must be less than 10"),
        email:Yup.string().required("You have to enter a valid Email").email("this is not a vaild email"),
        password:Yup.string().required("You have to add passsword"),
        cPassword:Yup.string().required("Repeate the password again please").oneOf([Yup.ref('password')], "not match password")

    })

    let formik =useFormik({
      initialValues:{
          "userName":"", 
          "email":"",
          "password":"",
          "cPassword":"",
      },validationSchema:schema, onSubmit:sendRegisterData,        
    })

  
    async function sendRegisterData(values){
        let {data} = await axios.post("https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup",values).catch( (err)=>{
            setStatusError(err.response.data.message);
        })

        if(data.message=='Done'){
            setErrors([]);
            setStatusError('');
            navigate('/login');
            console.log("Welcome@");



        }
        
            else{
                
                setErrors(data.err[0]);
                
            }
        }

    
    

    return(
        <>
            <div className="width-75 m-auto">
            <h2>Register Now</h2>

            

            {errors.map((error)=>{

                    return <div className='text-danger'>{error.message}</div>

            })}
            <form onSubmit={formik.handleSubmit}>
                
                <label>User Name:</label>
                <input type="text" name="userName" id="userName" className="form-control" value={formik.values.userName} onChange={formik.handleChange}/>
                <p className="text-danger">{formik.errors.userName}</p>

                <label>User Email:</label>
                <input type="email" name="email" id="email" className="form-control" value={formik.values.email} onChange={formik.handleChange}/>
                <p className="text-danger">{formik.errors.email}</p>
                <div className='text-danger'>{statusError}</div>

                <label>Password:</label>
                <input type="password" name="password" id="password" className="form-control" value={formik.values.password} onChange={formik.handleChange}/>
                <p className="text-danger">{formik.errors.password}</p>
                
                <label >Confirm Password:</label>
                <input type="password" name="cPassword" id="cPassword" className="form-control" value={formik.values.cPassword} onChange={formik.handleChange}/>
                <p className="text-danger">{formik.errors.cPassword}</p>
                <button type='submit' className="btn btn-info mt-3">Register!</button>
            </form>
            </div>
        </>
    )


  
}
