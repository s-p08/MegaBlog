import { useDispatch } from 'react-redux'
import authService from '@/appwrite/auth_service'
import { logout } from '@/store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then( () => {
            dispatch(logout())
        })
    }

  return (
    <button
    className='inline-block px-6 py-2 duration-200 border-2 bg-white hover:border-blue-400 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn
