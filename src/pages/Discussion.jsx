import { IconDotsVertical, IconSend2 } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";
import { DateParser } from "../utils/DateParser";
import Loading from "./Loading";
import NotFound from "./NotFound";

export default function Discussion(){
    const { discussion_id } = useParams()
    const [discussion, setDiscussion] = useState(null)
    const [comments, setComments] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [discussionRes, commentsRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/discussions/${discussion_id}`),
                    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/comments/discussions/${discussion_id}`)
                ])

                setDiscussion(discussionRes.data.data.discussion)
                setComments(commentsRes.data.data.comments)
            } catch(error) {
                console.error(error)
                setDiscussion(undefined)
            }
        }

        fetchData()
    }, [discussion_id])

    if (discussion === undefined){
        return <NotFound />
    }

    if (discussion !== null && discussion !== undefined){
        return (
            <>
            <Navbar />
            <DiscussionSection discussion={discussion} />
            <CommentSection comments={comments} setComments={setComments} discussion_id={discussion_id} />
            <Footer />
            </>
        )
    }

    return <Loading />
}

function DiscussionSection({ discussion }){
    return (
        <section className="flex flex-col gap-4 pt-24 px-[10vw] bg-blue-semibold text-white mobile:px-4 tablet:px-[5vw]">
            <p className="font-bold text-xl">{discussion.title}</p>
            <article className="flex gap-2 items-center">
                <img src={`${import.meta.env.VITE_AVATAR_API_ENDPOINT}&name=${discussion.creator.username}`} alt="Profile" className="w-10 h-10 rounded-full" />
                <article>
                    <p>{discussion.creator.username}</p>
                    <p className="text-sm text-gray-400">{DateParser(discussion.created_at)}</p>
                </article>
            </article>
            <p>{discussion.content}</p>
        </section>
    )
}

function CommentSection({ comments, setComments, discussion_id }){
    const contentElement = useRef(null)
    const [isLoadingWhenPostComment, setIsLoadingWhenPostComment] = useState(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)

    const createCommentHandler = async(event) => {
        try {
            event.preventDefault()

            setLoadingElementWidth(event.currentTarget.querySelector("button").clientWidth)
            setLoadingElementHeight(event.currentTarget.querySelector("button").clientHeight)
            setIsLoadingWhenPostComment(true)

            const requestBody = {
                discussion_id,
                content: contentElement.current.value
            }
            const jwt = localStorage.getItem("jwt")
            const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/comments`, requestBody, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            setComments(comments => [data.data.comment, ...comments])
            contentElement.current.value = ""
            setIsLoadingWhenPostComment(false)
        } catch(error){
            console.log(error)
            setIsLoadingWhenPostComment(false)
            toast.error("Komentar gagal ditambahkan")
        }
    }

    const [isLoadingWhenDeleteComment, setIsLoadingWhenDeleteComment] = useState(false)
    const { user } = useContext(AuthContext)
    const [showDeleteBtn, setShowDeleteBtn] = useState(false)
    const deleteCommentHandler = async(event, comment_id) => {
        try {
            setLoadingElementWidth(event.currentTarget.clientWidth)
            setLoadingElementHeight(event.currentTarget.clientHeight)
            setIsLoadingWhenDeleteComment(true)

            const jwt = localStorage.getItem("jwt")
            await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}/comments/${comment_id}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            setComments(comments => [...comments].filter(comment => comment.id != comment_id))
            toast.success("Komentar berhasil dihapus")
            setIsLoadingWhenDeleteComment(false)
        } catch(error){
            console.log(error)
            toast.error("Komentar gagal dihapus")
            setIsLoadingWhenDeleteComment(false)
        }
    }
    
    return (
        <section className="flex flex-col w-full gap-4 py-8 px-[10vw] bg-blue-semibold text-white mobile:px-4 tablet:px-[5vw]">
            <section className="flex">
                <form className="flex flex-col shadow-lg rounded-lg w-full bg-blue-bold p-2" onSubmit={createCommentHandler}>
                    <textarea placeholder="Komentar..." rows={3} className="border-none outline-none w-full resize-none" ref={contentElement}></textarea>
                    {
                        isLoadingWhenPostComment ?
                        <Loader className={"rounded-md self-end bg-blue-light"} /> :
                        <button type="submit" className="flex items-center gap-1 bg-blue-light text-black p-1 px-2 rounded-md w-fit self-end">
                            <p>Kirim</p>
                            <IconSend2 stroke={1.5} />
                        </button>
                    }
                </form>
            </section>
            <section>
            {
                comments.map((comment, index) => (
                    <article key={index} className="flex flex-col border-b gap-2 py-4 border-blue-bold">
                        <article className="flex gap-2 items-center">
                            <img src={`${import.meta.env.VITE_AVATAR_API_ENDPOINT}&name=${comment.creator.username}`} alt="Profile" className="w-8 h-8 rounded-full" />
                            <article className="w-full">
                                <p className="line-clamp-1">{comment.creator.username}</p>
                                <p className="text-sm text-gray-400">{DateParser(comment.created_at)}</p>
                            </article>
                            {
                                comment.creator.id == user?.id &&
                                <article className="flex relative">
                                    <button type="button" className="flex items-center justify-center gap-1 p-1 rounded-full transition-all hover:bg-blue-light/20" onClick={() => setShowDeleteBtn(!showDeleteBtn)}>
                                        <IconDotsVertical stroke={1.5} width={20} height={20} />
                                    </button>
                                    <ul className={`${showDeleteBtn ? "flex" : "hidden"} flex-col absolute top-[105%] right-0 rounded-md overflow-hidden bg-blue-bold py-1 shadow-2xl`}>
                                    {
                                        isLoadingWhenDeleteComment ? 
                                        <Loader /> :
                                        <li className="py-1 pl-2 pr-10 hover:bg-blue-light/20 transition-all" onClick={(event) => deleteCommentHandler(event, comment.id)}>
                                            <button type="button">Hapus</button>
                                        </li>
                                    }
                                    </ul>
                                </article>
                            }
                        </article>
                        <p>{comment.content}</p>
                    </article>
                ))
            }
            </section>
        </section>
    )
}