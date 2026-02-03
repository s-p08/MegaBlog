import { useState } from 'react'
import authService from '../appwrite/auth_service'
import { Link, useNavigate } from 'react-router-dom'
import { login } from "../store/authSlice"
import {Button, Input, Logo} from '@/components/'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError]  = useState(null)
    const {register, handleSubmit} = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const currentUser = await authService.getCurrentUser()
                if (currentUser){
                    dispatch(login(userData))
                    navigate("/")
                } 
            }
        } catch (error) {
            setError(error.message)   
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className={`mx-auto w-full max-w-lg bg-gray-800 rounded-xl p-10 border border-gray-700 shadow-xl`}>
            <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-white">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-gray-400">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-500 transition-all duration-200 hover:underline hover:text-blue-400"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-8 text-center font-semibold">{error}</p>}

                <form onSubmit={handleSubmit(create)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter your full name"
                            className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            className="bg-gray-700 text-white border-gray-600 focus:border-blue-500"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg transition duration-200"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
    </div>
  )
}

export default Signup