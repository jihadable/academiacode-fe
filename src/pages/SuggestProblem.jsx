import { IconChevronDown, IconSend2 } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";

export default function SuggestProblem(){
    return (
        <>
        <Navbar />
        <Creation />
        <Footer />
        </>
    )
}

function Creation(){
    const [selectedDifficulty, setSelectedDifficulty] = useState("Mudah")
    const [showDifficultyMenu, setShowDifficultyMenu] = useState(false)
    const difficultyMenuBtn = useRef(null)
    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!difficultyMenuBtn.current?.contains(e.target)){
                setShowDifficultyMenu(false)
            }
        })
    })

    const [titleRef, descriptionRef] = [useRef(null), useRef(null)]
    const [isLoading, setIsLoading] = useState(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const { isLogin } = useContext(AuthContext)

    const suggestProblemHandler = async(event) => {
        try {
            event.preventDefault()

            setLoadingElementWidth(event.currentTarget.querySelector("button[type='submit']").clientWidth)
            setLoadingElementHeight(event.currentTarget.querySelector("button[type='submit']").clientHeight)
            setIsLoading(true)

            const requestBody = {
                title: titleRef.current.value,
                description: descriptionRef.current.value,
                difficulty: selectedDifficulty
            }
            const jwt = localStorage.getItem("jwt")
            await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/problem_suggestions`, requestBody, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            setIsLoading(false)
            toast.success("Soal baru berhasil disarankan")
            titleRef.current.value = ""
            descriptionRef.current.value = ""
            setSelectedDifficulty("Mudah")
        } catch(error){
            console.log(error)
            setIsLoading(false)
            toast.error("Soal gagal disarankan")
        }
    }
    
    return (
        <section className="flex gap-4 w-full px-[10vw] pt-24 bg-blue-semibold text-white mobile:px-4 tablet:px-[5vw]">
            <form className="flex flex-col w-full gap-2" onSubmit={suggestProblemHandler}>
                <p className="font-bold text-xl text-center">Sarankan soal baru</p>
                <input type="text" className="border-none outline-none py-2 text-xl" placeholder="Judul soal..." ref={titleRef} />
                <article className="flex items-center gap-1">
                    <p>Tingkat kesulitan:</p>
                    <article className="flex relative">
                        <button type="button" className="flex items-center gap-1 py-1 px-2 rounded-md bg-blue-bold" onClick={() => setShowDifficultyMenu(!showDifficultyMenu)} ref={difficultyMenuBtn}>
                            <p className={`text-${selectedDifficulty}`}>{selectedDifficulty}</p> <IconChevronDown stroke={1.5} className={`${showDifficultyMenu ? "rotate-180" : ""} transition-all`} />
                        </button>
                        <ul className={`${showDifficultyMenu ? "flex" : "hidden"} flex-col absolute top-[105%] rounded-md overflow-hidden bg-blue-bold py-1 shadow-2xl`}>
                            <li className="py-1 pl-2 pr-10 hover:bg-blue-light/20 text-Mudah transition-all" onClick={() => setSelectedDifficulty("Mudah")}>
                                <button type="button">Mudah</button>
                            </li>
                            <li className="py-1 pl-2 pr-10 hover:bg-blue-light/20 text-Sedang transition-all" onClick={() => setSelectedDifficulty("Sedang")}>
                                <button type="button">Sedang</button>
                            </li>
                            <li className="py-1 pl-2 pr-10 hover:bg-blue-light/20 text-Sulit transition-all" onClick={() => setSelectedDifficulty("Sulit")}>
                                <button type="button">Sulit</button>
                            </li>
                        </ul>
                    </article>
                </article>
                <article className="flex flex-col bg-blue-bold p-2 rounded-md">
                    <textarea rows={15} placeholder="Deskripsi soal..." className="border-none outline-none resize-none" ref={descriptionRef}></textarea>
                {
                    isLogin === true &&
                    <>
                    {
                        isLoading ?
                        <Loader className={"bg-blue-light self-end rounded-md"} /> :
                        <button type="submit" className="flex items-center gap-1 bg-blue-light text-black p-1 px-2 rounded-md w-fit self-end">
                            <p>Kirim</p>
                            <IconSend2 stroke={1.5} />
                        </button>
                    }
                    </>
                }
                {
                    isLogin === false &&
                    <p className="text-sm text-red-600 self-end">Masuk untuk menyarankan soal</p>
                }
                </article>
            </form>
        </section>
    )
}