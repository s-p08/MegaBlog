import { useState, useEffect } from 'react'
import appwriteService from '@/appwrite/posts_config.js'
import { PostCard, Container } from '@/components/'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([])
            .then((posts) => {
                if (posts && posts.documents) {
                    setPosts(posts.documents)
                }
            })
            .finally(() => setLoading(false))
    }, [])

    // 1.Loading State
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    // 2.empty state (no posts found)
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center min-h-screen bg-gray-900 flex flex-col items-center justify-center">
                <Container>
                    <h2 className="text-3xl font-bold text-gray-200">No posts available</h2>
                    <p className="text-gray-400 mt-2">Check back later for updates!</p>
                </Container>
            </div>
        )
    }

    // 3.main grid view
    return (
        <div className='w-full py-8 bg-gray-900 min-h-screen'>
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">All Posts</h1>
                </div>

                {/*responsive grid Layout*/}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-8 md:p-0 gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='transition-all duration-300 hover:shadow-xl rounded-xl'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts