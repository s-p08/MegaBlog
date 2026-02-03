import { useEffect, useState } from 'react'
import { PostForm, Container } from '@/components'
import appwriteService from '@/appwrite/posts_config.js'
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [post, setpost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug)
            .then((post) => {
                if (post) {
                    setpost(post)
                }
            })
        }
        else{
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post ={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost
