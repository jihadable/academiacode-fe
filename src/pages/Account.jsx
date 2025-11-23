import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";
import { DateParser } from "../utils/DateParser";
import GoTop from "../utils/GoTop";
import Loading from "./Loading";
import NotFound from "./NotFound";

export default function Account(){
    const { isLogin, user, setUser } = useContext(AuthContext)
    const [submissions, setSubmissions] = useState(null)
    useEffect(() => {
        const getSubmissionsByUser = async() => {
            try {
                const jwt = localStorage.getItem("jwt")
                const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/submissions/users`, {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                })

                setSubmissions(data.data.submissions)
            } catch(error){
                console.log(error)
            }
        }

        getSubmissionsByUser()
    }, [])

    if (isLogin === false){
        return <NotFound />
    }
    
    if (isLogin === true && submissions !== null){
        return (
            <>
            <Navbar />
            <UserProfile user={user} setUser={setUser} submissions={submissions} setSubmissions={setSubmissions} />
            <Footer />
            </>
        )
    }

    return <Loading />
}

function UserProfile({ user, setUser, submissions }){
    const [isEditingUser, setIsEditingUser] = useState(false)
    const [
        usernameRef,
        fullnameRef,
        bioRef,
        githubRef,
        linkedinRef
    ] = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null)
    ]
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const [isLoading, setIsLoading] = useState(false)

    const updateUserHandler = async(event) => {
        try {
            event.preventDefault()

            setLoadingElementWidth(event.currentTarget.querySelector("button[type='submit']").clientWidth)
            setLoadingElementHeight(event.currentTarget.querySelector("button[type='submit']").clientHeight)
            setIsLoading(true)

            const requestBody = {
                username: usernameRef.current.value,
                fullname: fullnameRef.current.value,
                bio: bioRef.current.value,
                github: githubRef.current.value,
                linkedin: linkedinRef.current.value,
            }
            const jwt = localStorage.getItem("jwt")
            const { data } = await axios.put(`${import.meta.env.VITE_API_ENDPOINT}/users`, requestBody, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            setUser(data.data.user)
            setIsLoading(false)
            setIsEditingUser(false)
            toast.success("Data pengguna berhasil diperbarui")
        } catch(error){
            console.log(error)
            setIsLoading(false)
            setIsEditingUser(false)
            toast.warn("Gagal memperbarui data pengguna")
        }
    }
    
    return (
        <section className="flex gap-4 py-20 px-[10vw] bg-blue-semibold mobile:flex-col mobile:px-4 tablet:px-[5vw]">
            <section className="w-2/5 bg-blue-bold rounded-xl flex flex-col gap-4 items-center text-white p-8 shadow-2xl mobile:w-full tablet:w-full">
            {
                isEditingUser ?
                <>
                <article className="flex flex-col items-center w-full">
                    <img src={`${import.meta.env.VITE_AVATAR_API_ENDPOINT}&name=${user.fullname}`} alt="Profile" className="w-24 h-24 rounded-full shadow-2xl border border-gray-600" />
                </article>
                <form className="flex flex-col gap-4 w-full" onSubmit={updateUserHandler}>
                    <article className="flex flex-col w-full">
                        <label htmlFor="username" className="text-sm text-gray-400">Username</label>
                        <input type="text" id="username" defaultValue={user.username} className="w-full p-1 rounded-md border outline-none" ref={usernameRef} />
                    </article>
                    <article className="flex flex-col w-full">
                        <label htmlFor="fullname" className="text-sm text-gray-400">Nama lengkap</label>
                        <input type="text" id="fullname" defaultValue={user.fullname} className="w-full p-1 rounded-md border outline-none" ref={fullnameRef} />
                    </article>
                    <article className="flex flex-col w-full">
                        <label htmlFor="bio" className="text-sm text-gray-400">Bio</label>
                        <textarea id="bio" rows={3} defaultValue={user.bio ?? ""} className="w-full p-1 rounded-md border outline-none resize-none" ref={bioRef}></textarea>
                    </article>
                    <article className="flex items-center w-full p-1 gap-1 rounded-md border">
                        <IconBrandGithub stroke={1.5} />
                        <input type="text" placeholder="Github" defaultValue={user.github ?? ""} className="w-full rounded-md border-none outline-none" ref={githubRef} />
                    </article>
                    <article className="flex items-center w-full p-1 gap-1 rounded-md border">
                        <IconBrandLinkedin stroke={1.5} />
                        <input type="text" placeholder="Linkedin" defaultValue={user.linkedin ?? ""} className="w-full rounded-md border-none outline-none" ref={linkedinRef} />
                    </article>
                    <article className="flex items-center gap-2 w-full text-black">
                        <button type="button" className="p-2 w-1/2 bg-red-400 rounded-md" onClick={() => setIsEditingUser(false)}>Kembali</button>
                    {
                        isLoading ?
                        <Loader className={"bg-blue-light rounded-md"} /> :
                        <button type="submit" className="p-2 w-1/2 bg-blue-light rounded-md">Perbarui</button>
                    }
                    </article>
                </form>
                </> :
                <>
                <article className="flex flex-col items-center w-full">
                    <img src={`${import.meta.env.VITE_AVATAR_API_ENDPOINT}&name=${user.fullname}`} alt="Profile" className="w-24 h-24 rounded-full shadow-2xl border border-gray-600" />
                    <p className="text-center font-bold">{user.username}</p>
                    <p className="text-center font-bold">{user.total_points} poin</p>
                </article>
                <article className="flex flex-col gap-4 w-full">
                    <p>{user.fullname}</p>
                    <p>{user.email}</p>
                    <article>
                        <p>Bio</p>
                        <p className="p-1 rounded-md border">{user.bio}</p>
                    </article>
                    <Link to={user.github ?? ""} className="flex items-center gap-1">
                        <article className="bg-blue-semibold p-1 rounded-md">
                            <IconBrandGithub stroke={1.5} />
                        </article>
                        <p className="line-clamp-1">{user.github ?? "-"}</p>
                    </Link>
                    <Link to={user.linkedin ?? ""} className="flex items-center gap-1">
                        <article className="bg-blue-semibold p-1 rounded-md">
                            <IconBrandLinkedin stroke={1.5} />
                        </article>
                        <p className="line-clamp-1">{user.linkedin ?? "-"}</p>
                    </Link>
                </article>
                <button className="p-2 rounded-xl bg-blue-light text-black w-full" onClick={() => setIsEditingUser(true)}>Ubah profile</button>
                </>
            }
            </section>
            <section className="flex flex-col gap-4 w-3/5 text-white mobile:w-full tablet:w-full">
                <article className="flex gap-4 w-full mobile:flex-col tablet:flex-col">
                    <article className="flex items-center justify-center p-4 gap-4 rounded-xl bg-blue-bold shadow-2xl w-full">
                        <article className="flex flex-col items-center justify-center w-32 h-32 bg-blue-semibold shadow-2xl rounded-full">
                            <p className="font-bold">{user.submissions.accepted_submissions}/{user.submissions.total_problems}</p>
                            <p className="text-sm text-gray-400">Soal</p>
                            <p className="text-sm text-gray-400">diselesaikan</p>
                        </article>
                        <article className="flex flex-col gap-4">
                            <article className="bg-blue-semibold py-1 px-6 rounded-xl flex flex-col items-center shadow-2xl text-sm">
                                <p className="text-Mudah">Mudah</p>
                                <p>{user.submissions.Mudah.accepted_submissions}/{user.submissions.Mudah.total_problems}</p>
                            </article>
                            <article className="bg-blue-semibold py-1 px-6 rounded-xl flex flex-col items-center shadow-2xl text-sm">
                                <p className="text-Sedang">Sedang</p>
                                <p>{user.submissions.Sedang.accepted_submissions}/{user.submissions.Sedang.total_problems}</p>
                            </article>
                            <article className="bg-blue-semibold py-1 px-6 rounded-xl flex flex-col items-center shadow-2xl text-sm">
                                <p className="text-Sulit">Sulit</p>
                                <p>{user.submissions.Sulit.accepted_submissions}/{user.submissions.Sulit.total_problems}</p>
                            </article>
                        </article>
                    </article>
                    <article className="flex items-center justify-center gap-4 p-4 rounded-xl bg-blue-bold shadow-2xl w-full">
                        <article className="flex flex-col items-center justify-center w-32 h-32 bg-blue-semibold shadow-2xl rounded-full">
                            <p className="font-bold">{user.accpeted_problem_suggestions.Mudah + user.accpeted_problem_suggestions.Sedang + user.accpeted_problem_suggestions.Sulit}</p>
                            <p className="text-sm text-gray-400">Soal</p>
                            <p className="text-sm text-gray-400">dibuat</p>
                        </article>
                        <article className="flex flex-col gap-4">
                            <article className="bg-blue-semibold py-1 px-6 rounded-xl flex flex-col items-center shadow-2xl text-sm">
                                <p className="text-Mudah">Mudah</p>
                                <p>{user.accpeted_problem_suggestions.Mudah}</p>
                            </article>
                            <article className="bg-blue-semibold py-1 px-6 rounded-xl flex flex-col items-center shadow-2xl text-sm">
                                <p className="text-Sedang">Sedang</p>
                                <p>{user.accpeted_problem_suggestions.Sedang}</p>
                            </article>
                            <article className="bg-blue-semibold py-1 px-6 rounded-xl flex flex-col items-center shadow-2xl text-sm">
                                <p className="text-Sulit">Sulit</p>
                                <p>{user.accpeted_problem_suggestions.Sulit}</p>
                            </article>
                        </article>
                    </article>
                </article>
                <article className="flex flex-col gap-2">
                    <p className="font-bold text-xl">{submissions.length == 0 ? "Belum ada jawaban" : "Jawaban terbaru"}</p>
                    <article className="flex flex-col rounded-md overflow-hidden shadow-2xl">
                    {
                        submissions.map((submission, index) => (
                            <Link to={`/problems/${submission.problem.id}`} className={`flex items-center justify-between gap-8 p-2 ${index % 2 == 0 ? "bg-blue-light/20" : "bg-blue-bold/20"}`} key={index} onClick={GoTop}>
                                <p className="w-full line-clamp-1">{submission.problem.title}</p>
                                <p className={`whitespace-nowrap text-sm font-bold ${submission.status == "Accepted" ? "text-Mudah" : "text-Sulit"}`}>{submission.status}</p>
                                <p className="whitespace-nowrap text-sm text-gray-400">{DateParser(submission.updated_at)}</p>
                            </Link>    
                        ))
                    }
                    </article>
                </article>
            </section>
        </section>
    )
}