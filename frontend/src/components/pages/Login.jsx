import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../common/Layout'
import { useForm } from 'react-hook-form'
import { apiUrl } from '../common/Config';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/Auth';

const Login = () => {
    const {login} = useContext(AuthContext);
     const navigate = useNavigate()
    const {handleSubmit,register,formState:{errors},setError} = useForm();

     const onSubmit=async (data)=>{
       try {
        const res = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        // SUCCESS
        if (res.status === 200 && result.status === 200) {
            toast.success("Login Successful");
            const userInfo = {
                name:result.name,
                id:result.id,
                token:result.token
            }
            localStorage.setItem('userInfoLms',JSON.stringify(userInfo))
            login(userInfo);
            // localStorage.setItem("token", result.token);
            // localStorage.setItem("name", result.name);
            // localStorage.setItem("userId", result.id);
            navigate('/account/dashboard');
            // return;
        }

        // SHOW SERVER ERRORS
        if (result.errors) {
            Object.keys(result.errors).forEach(field => {
                setError(field, { message: result.errors[field][0] });
            });

            toast.error(result.errors.email?.[0] || "Login failed");
        }

    } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
    }

    }

  return (
     <Layout>
      <div className='container py-5 mt-5'>
            <div className='d-flex align-items-center justify-content-center'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='card border-0 shadow login'>
                        <div className='card-body p-4'>
                            <h3 className='border-bottom pb-3 mb-3'>Login</h3>
                            <div className='mb-3'>
                                <label className='form-label' htmlFor="email">Email</label>
                                <input 
                                {
                                    ...register('email',{
                                        required:"The email field is required.",
                                        pattern:{
                                            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message:"Invalid email address"
                                        }
                                    })
                                }
                                type="text" className={`form-control ${errors.email && 'is-invalid'}`} 
                                placeholder='Email' />
                                {
                                    errors.email && <p className='invalid-feeback'>{errors.email.message}</p>
                                }                              
                            </div>

                            <div className='mb-3'>
                                <label className='form-label' htmlFor="password">Password</label>
                                <input 
                                {
                                    ...register('password',{
                                        required:"The password field is required."
                                    })
                                }
                                type="password" 
                                className={`form-control ${errors.password && 'is-invalid'}`} 
                                placeholder='Password' />   
                                {
                                    errors.password && <p className='invalid-feeback'>{errors.password.message}</p>
                                } 
                            </div>
                            
                            <div className='d-flex justify-content-between align-items-center'>
                                <button className='btn btn-primary'>Login</button>
                                <Link to={`/account/register`} className='text-secondary'>Register Here</Link>
                            </div>                            
                        </div>
                    </div>
                </form>
            </div>
        </div>
     </Layout>
  )
}

export default Login