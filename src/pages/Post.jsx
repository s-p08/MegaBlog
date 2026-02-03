import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "@/appwrite/posts_config";
import { Button, Container } from "@/components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    //loading State (Matches Home Page)
    if (!post) {
        return (
            <div className="w-full py-8 mt-4 text-center min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="py-8 bg-gray-900 min-h-screen">
            <Container>
                {/* Image Section */}
                <div className="w-full flex justify-center mb-6 relative border border-gray-700 bg-gray-800 rounded-xl p-2 shadow-lg">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full max-h-[500px] object-contain"
                    />

                    {/*author controls*/}
                    {isAuthor && (
                        <div className="absolute right-4 top-4 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-600 hover:bg-green-500" className="shadow-lg transition-all duration-200">
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-600 hover:bg-red-500"
                                className="shadow-lg transition-all duration-200"
                                onClick={deletePost}
                            >
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Title Section */}
                <div className="w-full mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                        {post.title}
                    </h1>
                    <div className="h-1 w-20 bg-blue-500 mt-4 rounded-full"></div>
                </div>

                {/* Content Section */}
                <div className="browser-css text-gray-300 leading-relaxed tracking-wide text-lg">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    );
}