import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import appwriteService from '@/appwrite/posts_config.js'
import { Container, PostCard, SpinLoader } from '@/components'
import { useSelector } from 'react-redux'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    
    const authStatus = useSelector(state => state.auth.status)
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                if(authStatus){
                    const postData = await appwriteService.getPosts()
                    if(postData && postData.documents){
                        setPosts(postData.documents)
                    }
                } else {
                    setPosts([])
                }
            } catch (error) {
                console.log("Error fetching home data:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [authStatus])

    // 1.loading state(spinner)
    if (loading) return <SpinLoader message={"Loading content..."} />

    // 2.guest view (not logged in) - Hero Section
    if (!authStatus) {
        return (
            <div className="w-full py-16 bg-gradient-to-r from-gray-900 to-slate-800 text-white min-h-[60vh] flex items-center">
                <Container>
                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Welcome to the <span className="text-blue-400">MegaBlog</span>
                        </h1>
                        <p className="text-lg text-gray-300">
                            Discover stories, thinking, and expertise from writers on any topic. 
                            Login to access exclusive content.
                        </p>
                        <div className="mt-4">
                            <Link 
                                to="/login" 
                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-semibold transition duration-200 shadow-lg hover:shadow-blue-500/30"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    // 3.user logged In but No Posts
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center min-h-[40vh]">
                        <h2 className="text-2xl font-bold text-gray-600">No posts found</h2>
                        <p className="text-gray-500 mt-2">Be the first one to write something!</p>
                        <Link 
                            to="/add-post" 
                            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                            Create Post
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }

    // 4.main feed
    return (
        <div className="w-full py-8 bg-gray-900 min-h-screen">
            <Container>
                {/* header section */}
                <div className="mb-8 border-b border-gray-700 pb-4">
                    <h1 className="text-3xl font-bold text-white">Latest Posts</h1>
                    <p className="text-gray-400 mt-1">Welcome back, <span className="font-medium text-blue-400">{userData?.name || "User"}</span></p>
                </div>

                {/*grid layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-8 md:p-0 gap-6">
                    {posts.map((post) => (
                        <div 
                            key={post.$id} 
                            className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home