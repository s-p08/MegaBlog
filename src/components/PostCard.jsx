import appwriteService from '@/appwrite/posts_config'
import { Link } from 'react-router-dom'

function PostCard({
    $id,
    title,
    featuredImage
}) {

    return (
        <Link to={`/post/${$id}`} className='block h-full'>
            <div className='w-full bg-gray-800 rounded-xl overflow-hidden border border-gray-700 h-full flex flex-col'>
                {/*image container with fixed height*/}
                <div className='w-full h-60 relative'>
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        loading='lazy'
                        className='w-full h-full object-cover object-top'
                    />
                </div>

                {/*content area*/}
                <div className='p-4 flex flex-col flex-grow'>
                    <h2 className='text-xl font-bold text-gray-100 mb-2 line-clamp-2'>
                        {title}
                    </h2>

                    {/*visual "Read More" cue*/}
                    <div className='mt-auto pt-2'>
                        <span className='text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors'>
                            Read Article &rarr;
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PostCard