import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '@/components/'
import appwriteService from '@/appwrite/posts_config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

function PostForm({ post }) {
    const { slug } = useParams()
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, setValue, control, getValues, reset } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || slug,
            content: post?.content || "",
            status: post?.status || "active"
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    // 1.load data only once when post changes
    useEffect(() => {
        if (post) {
            reset({
                title: post.title || "",
                slug: post?.slug || slug,
                content: post.content || "",
                status: post.status || "active"
            })
        }
    }, [post, reset])

    const submit = async (data) => {
        setLoading(true)
        try {
            // Check if user is logged in
            if (!userData) {
                toast.error("You must be logged in to create or edit posts")
                navigate('/login')
                return
            }

            if (post) {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null
                if (file) {
                    await appwriteService.deleteFile(post.featuredImage)
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined
                })
                toast.success("Post Updated Successfully!")
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            } else {
                const file = await appwriteService.uploadFile(data.image[0])
                if (file) {
                    const fileId = file.$id
                    data.featuredImage = fileId
                    const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id })
                    if (dbPost) {
                        toast.success("Post Created Successfully!")
                        navigate(`/post/${dbPost.$id}`)
                    }
                }
            }
        } catch (error) {
            console.error("POST FORM ERROR :: SUBMIT ISSUE", error)
            console.error("Error Type:", error.type)
            console.error("Error Message:", error.message)
            console.error("Error Response:", error.response)

            // Show specific error message
            if (error.message) {
                toast.error(`Error: ${error.message}`)
            } else {
                toast.error("Error Saving post. Check console for details.")
            }
        } finally {
            setLoading(false)
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof (value) === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')

        return ''
    }, [])


    return (

        <div className='relative'>
            {loading && (
                <div className='absolute inset-0 z-50 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl'>
                    <Loader2 size={60} className='text-blue-500 animate-spin' />
                    <p className='mt-4 text-white font-medium animate-pulse'>
                        {post ? "Updating Post..." : "Publishing"}
                    </p>
                </div>
            )}
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap bg-gray-900 text-white p-4 rounded-xl">
                <div className="w-full lg:w-2/3 px-2">
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4 bg-gray-800 border-gray-700 focus:border-blue-500 text-gray-200"
                        {...register("title", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4 bg-gray-800 border-gray-700 focus:border-blue-500 text-gray-200"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />
                    <div className="mb-4">
                        <RTE
                            label="Content :"
                            name="content"
                            control={control}
                            defaultValue={getValues("content")}
                        />
                    </div>
                </div>
                <div className="w-full lg:w-1/3 px-2 mt-4 lg:mt-0">
                    <Input
                        label="Featured Image :"
                        type="file"
                        className="mb-4 bg-gray-800 border-gray-700 text-gray-200"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />
                    {post && (
                        <div className="w-full mb-4 border border-gray-700 rounded-lg p-2 bg-gray-800">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg w-full object-cover"
                            />
                        </div>
                    )}
                    <Select
                        options={["active", "inactive"]}
                        label="Status"
                        className="mb-4 bg-gray-800 border-gray-700 focus:border-blue-500 text-gray-200"
                        {...register("status", { required: true })}
                    />
                    <Button
                        type="submit"
                        bgColor={post ? "bg-green-600 hover:bg-green-500" : "bg-blue-600 hover:bg-blue-500"}
                        className="w-full shadow-lg transition-all"
                    >
                        {post ? "Update Post" : "Submit Post"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default PostForm