import { IconBrandFacebookFilled, IconBrandGithubFilled, IconBrandInstagram, IconBrandLinkedinFilled, IconLock, IconMail, IconUser } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import registerImg from "../assets/imgRegister.svg";
import logo from "../assets/logo.png";
import Loader from "../components/Loader";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";
import GoTop from "../utils/GoTop";
import Loading from "./Loading";
import NotFound from "./NotFound";

export default function Register(){
    const [emailRef, fullnameRef, usernameRef, passwordRef, passwordConfirmationRef] = [
        useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
    ]
    const [isLoading, setIsLoading] = useState(false)
    const { isLogin, setIsLogin, setUser } = useContext(AuthContext)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const navigate = useNavigate()
    
    const registerHandler = async(event) => {
        try {
            setIsLoading(true)
            event.preventDefault()

            setLoadingElementWidth(event.currentTarget.querySelector("button").clientWidth)
            setLoadingElementHeight(event.currentTarget.querySelector("button").clientHeight)

            if (passwordRef.current.value != passwordConfirmationRef.current.value){
                toast.warn("Konfirmasi password tidak sesuai")

                return
            }

            const requestBody = {
                email: emailRef.current.value,
                fullname: fullnameRef.current.value,
                username: usernameRef.current.value,
                password: passwordRef.current.value
            }

            const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/users/register`, requestBody)
            setIsLogin(true)
            setUser(data.data.user)
            localStorage.setItem("jwt", data.data.jwt)

            navigate("/")
            setIsLoading(false)
        } catch(error){
            console.log(error)
            setIsLoading(false)
            setIsLogin(false)
            toast.error("Pendaftaran gagal")
        }
    }

    if (isLogin === true){
        return <NotFound />
    }
    if (isLogin === false){
        return (
            <section className="relative flex justify-center items-center w-screen h-screen bg-blue-semibold">
                <article className="flex items-center gap-20">
                    <article className="flex flex-col items-center bg-white p-4 rounded-xl">
                        <img src={registerImg} alt="Coding vibe" className="w-[25vw]" />
                        <h3 className="font-bold text-2xl">Selangkah lagi untuk memulai</h3>
                        <p>Daftar sekarang</p>
                    </article>
                    <form className="flex flex-col items-center gap-4" onSubmit={registerHandler}>
                        <img src={logo} alt="Logo" className="w-24" />
                        <article className="flex flex-col">
                            <label htmlFor="email" className="text-white">Email</label>
                            <article className="flex items-center gap-2 bg-white rounded-md p-2">
                                <IconMail stroke={1.5} />
                                <input type="email" placeholder="example@mail.com" id="email" className="border-none outline-none" ref={emailRef} />
                            </article>
                        </article>
                        <article className="flex flex-col">
                            <label htmlFor="fullname" className="text-white">Nama lengkap</label>
                            <article className="flex items-center gap-2 bg-white rounded-md p-2">
                                <IconUser stroke={1.5} />
                                <input type="text" placeholder="John Doe" id="fullname" className="border-none outline-none" ref={fullnameRef} />
                            </article>
                        </article>
                        <article className="flex flex-col">
                            <label htmlFor="username" className="text-white">Username</label>
                            <article className="flex items-center gap-2 bg-white rounded-md p-2">
                                <IconUser stroke={1.5} />
                                <input type="text" placeholder="johndoe" id="username" className="border-none outline-none" ref={usernameRef} />
                            </article>
                        </article>
                        <article className="flex flex-col">
                            <label htmlFor="password" className="text-white">Password</label>
                            <article className="flex items-center gap-2 bg-white rounded-md p-2">
                                <IconLock stroke={1.5} />
                                <input type="password" placeholder="********" id="password" className="border-none outline-none" ref={passwordRef} />
                            </article>
                        </article>
                        <article className="flex flex-col">
                            <label htmlFor="password-confirmation" className="text-white">Konfirmasi password</label>
                            <article className="flex items-center gap-2 bg-white rounded-md p-2">
                                <IconLock stroke={1.5} />
                                <input type="password" placeholder="********" id="password-confirmation" className="border-none outline-none" ref={passwordConfirmationRef} />
                            </article>
                        </article>
                        {
                            isLoading ?
                            <Loader className={"bg-blue-light rounded-md mt-8"} /> :
                            <button type="submit" className="bg-blue-light p-2 rounded-md w-full mt-8">Daftar</button>
                        }
                        <p className="text-white">Sudah punya akun? <Link to={"/login"} className="font-bold underline" onClick={GoTop}>Masuk</Link></p>
                    </form>
                </article>
                <footer className="flex items-center justify-between py-4 px-[10vw] absolute bottom-0 left-0 right-0 bg-blue-light rounded-t-4xl">
                    <p>© 2025 Copyright</p>
                    <article className="flex gap-2 items-center">
                        <button className="p-1 rounded-sm bg-blue-bold text-white">
                            <IconMail stroke={1.5} />
                        </button>
                        <button className="p-1 rounded-sm bg-blue-bold text-white">
                            <IconBrandFacebookFilled stroke={1.5} />
                        </button>
                        <button className="p-1 rounded-sm bg-blue-bold text-white">
                            <IconBrandInstagram stroke={1.5} />
                        </button>
                        <button className="p-1 rounded-sm bg-blue-bold text-white">
                            <IconBrandLinkedinFilled stroke={1.5} />
                        </button>
                        <button className="p-1 rounded-sm bg-blue-bold text-white">
                            <IconBrandGithubFilled stroke={1.5} />
                        </button>
                    </article>
                </footer>
            </section>
        )
    }

    return <Loading />
}