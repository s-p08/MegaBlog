import { useState } from 'react'
import { Container, Logo, LogoutBtn } from '@/components/'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { User, Menu, X } from 'lucide-react'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const userData = useSelector(state => state.auth.userData)
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const navItems = [
        { name: 'Home', slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ]

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <header className='py-4 shadow-lg bg-gray-900/95 border-b border-gray-800 sticky top-0 z-40'>
            <Container>
                <nav className='flex items-center justify-between'>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo />
                        </Link>
                    </div>

                    {/* DESKTOP NAV */}
                    <ul className='hidden md:flex ml-auto gap-4 items-center'>
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-block px-6 py-2 duration-200 text-gray-200 hover:bg-blue-600 hover:text-white rounded-full font-medium transition-all'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {authStatus && (
                            <li><LogoutBtn /></li>
                        )}

                        {authStatus && userData && (
                            <li className='ml-2'>
                                <Link 
                                    to={`/users/${userData.name}`}
                                    className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg'
                                    title={userData.name}
                                >
                                    <User size={24} className='text-gray-200'/>
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/*MOBILE BURGER ICON*/}
                    <div className='md:hidden'>
                        <button 
                            onClick={() => setIsMenuOpen(true)}
                            className='text-gray-200 hover:text-blue-500 transition-colors'
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </nav>
            </Container>

            {/*SIDE SLIDING MENU (DRAWER)*/}
            {/* 1. Backdrop Overlay */}
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
                    onClick={closeMenu} // Close when clicking outsideof it
                />
            )}

            {/* 2.The Sidebar Panel*/}
            <div 
                className={`fixed top-0 right-0 h-full w-64 bg-gray-900 shadow-2xl border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
                    isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full p-6">
                    {/* Close Button Header */}
                    <div className="flex justify-end mb-8">
                        <button 
                            onClick={closeMenu}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X size={32} />
                        </button>
                    </div>

                    {/* Mobile Nav Items */}
                    <ul className="flex flex-col gap-4">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => {
                                            navigate(item.slug)
                                            closeMenu()
                                        }}
                                        className="text-xl font-medium text-gray-300 hover:text-blue-400 transition-colors w-full text-left"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                    </ul>

                    {/* Bottom Section (Profile & Logout) */}
                    {authStatus && (
                        <div className="mt-auto border-t border-gray-800 pt-6 flex flex-col gap-4">
                             {userData && (
                                <Link 
                                    to={`/users/${userData.name}`}
                                    onClick={closeMenu}
                                    className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-colors"
                                >
                                    <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center'>
                                        <User size={20} className='text-white'/>
                                    </div>
                                    <span className="font-semibold text-lg">{userData.name}</span>
                                </Link>
                            )}
                            
                            <div className="mt-2" onClick={closeMenu}>
                                <LogoutBtn className="w-full justify-start" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header