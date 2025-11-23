import { IconSend2 } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";

export default function CreateDiscussion(){
    return (
        <>
        <Navbar />
        <Creation />
        <Footer />
        </>
    )
}

function Creation(){
    const titleElement = useRef(null)
    const contentElement = useRef(null)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { isLogin } = useContext(AuthContext)
    
    const createDiscussionHandler = async(event) => {
        try {
            event.preventDefault()

            setLoadingElementWidth(event.currentTarget.querySelector("button").clientWidth)
            setLoadingElementHeight(event.currentTarget.querySelector("button").clientHeight)
            setIsLoading(true)

            const requestBody = {
                title: titleElement.current.value,
                content: contentElement.current.value
            }
            const jwt = localStorage.getItem("jwt")
            await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/discussions`,
                requestBody,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )

            toast.success("Diskusi baru berhasil dibuat")
            navigate("/discussions")
            setIsLoading(false)
        } catch(error){
            console.log(error)
            setIsLoading(false)
            toast.error("Diskusi gagal ditambahkan")
        }
    }
    
    return (
        <section className="flex gap-4 w-full px-[10vw] pt-24 bg-blue-semibold text-white mobile:px-4 tablet:px-[5vw]">
            <form className="flex flex-col w-full" onSubmit={createDiscussionHandler}>
                <p className="font-bold text-xl text-center">Buat diskusi baru</p>
                <input type="text" className="border-none outline-none py-2 text-xl" placeholder="Judul diskusi..." ref={titleElement} />
                <article className="flex flex-col bg-blue-bold p-2 rounded-md">
                    <textarea rows={15} placeholder="Isi diskusi..." className="border-none outline-none resize-none" ref={contentElement}></textarea>
                {
                    isLogin === true &&   
                    <>
                    {
                        isLoading ?
                        <Loader className={"self-end bg-blue-light rounded-md"} /> :
                        <button type="submit" className="flex items-center gap-1 bg-blue-light text-black p-1 px-2 rounded-md w-fit self-end">
                            <p>Kirim</p>
                            <IconSend2 stroke={1.5} />
                        </button>
                    }
                    </>
                }
                {
                    isLogin === false &&
                    <p className="text-sm text-red-600 self-end">Masuk untuk membuat disksui</p>
                }
                </article>
            </form>
        </section>
    )
}