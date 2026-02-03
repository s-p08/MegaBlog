import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '@/store/authSlice'
import {Button, Input, Logo} from '@/components/'
import authService from '@/appwrite/auth_service'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Login() {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(authLogin({userData}))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
        <div className={`mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-gray-700 shadow-xl`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width='100%'/>
                </span>
            </div>
            
            <h2 className='text-center text-2xl font-bold leading-tight text-white'>
                Sign in to your account
            </h2>
            
            <p className='mt-2 text-center text-base text-gray-400'>
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className='font-medium text-blue-500 transition-all duration-200 hover:underline hover:text-blue-400'
                > 
                    Sign Up
                </Link>
            </p>
            
            {error && <p className='text-red-500 mt-8 text-center font-semibold'>{error}</p>}
            
             <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        className="bg-gray-700 text-white border-gray-600 focus:border-blue-500" 
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                            matchPattern: (value) =>
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                "Email Address must be a valid address",
                            },
                        })}
                    />
                    <Input
                        label="Password: "
                        placeholder="Enter your password"
                        type="password"
                        className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <Button
                        type='submit'
                        className='w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition duration-200'
                    >
                        Sign In
                    </Button>
                </div>
             </form>
        </div>
    </div>
  )
}

export default Login