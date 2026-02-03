import {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button, Input} from '@/components/'
import authService from '@/appwrite/auth_service'
import { useSelector, useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { login } from '@/store/authSlice'
import { Eye, EyeClosed} from 'lucide-react'
import SpinLoader from '@/components/Loader/SpinLoader'

function ProfileForm() {

    const [showOldPass, setShowOldPass] = useState(false)
    const [showNewPass, setShowNewPass] = useState(false)

    const userData = useSelector(state => state.auth.userData)
    const dispatch = useDispatch()

    const { register, handleSubmit, setValue, getValues, reset} = useForm({
        defaultValues:{
            name: userData?.name,
            email: userData?.email
        }
    })

    useEffect(() => {
        if (userData) {
            reset({
                name: userData.name,
                email: userData.email,
                currentPassword : "",
                newPassword: ""
            })
        }
    }, [userData, reset])

    const submit = async data => {
        if(!userData) return

        const emailChanged = data.email !== userData.email
        const passwordChanged = data.newPassword && data.newPassword.length > 0
        const nameChanged = data.name !== userData.name

        if (!emailChanged && !passwordChanged && !nameChanged){
            toast("No Changes detected")
            return
        }

        if ((emailChanged || passwordChanged) && !data.currentPassword){
            toast.error("Current password is required to update email")
            return;
        }

        if(passwordChanged && data.newPassword.length < 8){
            toast.error("New password must be atleast 8 characters long")
            return
        }

        try{
            const updatedUser = await authService.updateProfile({
                name: data.name,
                email: emailChanged ? data.email : undefined,
                currentPassword: data.currentPassword,
                newPassword: passwordChanged ? data.newPassword : undefined
            })
            dispatch(login({userData: updatedUser}))
            if(updatedUser){
                reset({
                    name: updatedUser.name,
                    email: updatedUser.email,
                    currentPassword: "",
                    newPassword: ""
                })
                toast.success("Profile Updated Successfully")
            }
        } catch (err) {
            if (err.message.includes("Invalid credentials") || err.code === 401) {
                toast.error("Current password is incorrect")
            } else {
                toast.error("Error updating profile")
            }
        }
    }

    if(!userData){
        return <SpinLoader message={"Loading User data..."} />
    }

  return (
    <form onSubmit={handleSubmit(submit)} className='w-full'>
        <div className='space-y-6'>
            
            {/*name Input */}
            <Input
                label="Full Name"
                placeholder="Enter your name"
                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500/20"
                {...register("name", { required: true })}
            />
            
            {/*email Input*/}
            <Input
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500/20"
                {...register("email", { required: true })}
            />

            <div className="border-t border-gray-700 my-6"></div>
            <p className="text-sm text-gray-400 mb-4">Change Password</p>

            {/* Old password*/}
            <div className='relative'>
                <Input
                    label="Current Password"
                    placeholder="Enter current password"
                    type={showOldPass ? "text" : "password"}
                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 pr-10"
                    {...register("currentPassword", { required: false })}
                />
                <div 
                    className='absolute right-3 top-[38px] text-gray-400 hover:text-white cursor-pointer transition-colors p-1'
                    onClick={() => setShowOldPass(!showOldPass)}
                >
                    {showOldPass ? <Eye size={20} /> : <EyeClosed size={20} />}
                </div>
            </div>

            {/*new password */}
            <div className='relative'>
                <Input 
                    label="New Password"
                    placeholder="Enter new password"
                    type={showNewPass ? "text" : "password"}
                    className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 pr-10"
                    {...register("newPassword", {
                        required: false,
                        minLength: {
                            value: 8,
                            message: "New password must be at least 8 characters"
                        }
                    })}
                />
                <div 
                    className='absolute right-3 top-[38px] text-gray-400 hover:text-white cursor-pointer transition-colors p-1'
                    onClick={() => setShowNewPass(!showNewPass)}
                >
                    {showNewPass ? <Eye size={20} /> : <EyeClosed size={20} />}
                </div>
            </div>
        </div>
        <div className="mt-8">
            <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 transform hover:-translate-y-0.5'
            >
                Save Changes
            </Button>
        </div>
    </form>
  )
}

export default ProfileForm