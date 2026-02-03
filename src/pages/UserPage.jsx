import { useParams } from 'react-router-dom'
import { User } from 'lucide-react'
import { Container, ProfileForm } from '@/components/'

function UserPage() {
    const { slug } = useParams()
    
  return (
    <div className='w-full min-h-screen bg-gray-900 py-12'>
        <Container>
            <div className='max-w-2xl mx-auto'>
                <div className='bg-gray-800 border border-gray-700 rounded-2xl shadow-xl overflow-hidden'>                    
                    <div className='flex flex-col items-center pt-10 pb-6 bg-gradient-to-b from-gray-800 to-gray-900/50'>
                        <div className='relative'>
                            <div className='w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-[3px] shadow-lg shadow-blue-500/30'>
                                <div className='w-full h-full rounded-full bg-gray-800 flex items-center justify-center'>
                                    <User size={64} className='text-gray-200'/>
                                </div>
                            </div>
                        </div>
                        <h1 className='mt-4 text-2xl font-bold text-white capitalize'>
                            {slug || "User Profile"}
                        </h1>
                        <p className='text-gray-400 text-sm'>Update your personal details</p>
                    </div>
                    <div className='px-8 py-8 md:px-12 bg-gray-800'>
                        <ProfileForm />
                    </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default UserPage