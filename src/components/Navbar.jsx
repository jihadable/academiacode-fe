import { IconChevronDown, IconLogout, IconMenu2, IconUserCircle, IconX } from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../contexts/AuthContext";
import GoTop from "../utils/GoTop";

export default function Navbar(){
    const { isLogin, setIsLogin, user, setUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [showMobileAccountMenu, setShowMobileAccountMenu] = useState(false)

    const logoutHandler = () => {
        setIsLogin(false)
        setUser(null)
        localStorage.removeItem("jwt")
        navigate("/")
    }

    const accountMenuBtn = useRef(null)
    const mobileAccountMenuBtn = useRef(null)
    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!accountMenuBtn.current?.contains(e.target)){
                setShowAccountMenu(false)
            }
            if (!mobileAccountMenuBtn.current?.contains(e.target)){
                setShowMobileAccountMenu(false)
            }
        })
    })

    const [showHumbergerMenu, setShowHumbergerMenu] = useState(false)
    
    return (
        <nav className="fixed top-0 w-full flex items-center px-[10vw] py-4 bg-blue-semibold shadow-2xl justify-between z-10 mobile:px-4 tablet:px-[5vw]">
            <Link to={"/"} className="flex items-center justify-center" onClick={GoTop}>
                <img src={logo} alt="Logo" className="w-10" />
            </Link>
            <ul className={`flex gap-8 items-center text-white mobile:absolute mobile:bg-blue-bold mobile:flex-col mobile:top-0 mobile:right-0 mobile:w-[75vw] mobile:h-screen mobile:items-end mobile:p-4 mobile:z-30 ${showHumbergerMenu ? "" : "mobile:hidden"}`}>
                <li className="hidden mobile:flex items-center justify-center hover:bg-blue-light/20 p-2 rounded-md" onClick={() => setShowHumbergerMenu(!showHumbergerMenu)}>
                    <button type="button">
                        <IconX stroke={1.5} />
                    </button>
                </li>
                <li>
                    <Link to={"/about"} onClick={GoTop}>Tentang</Link>
                </li>
                <li>
                    <Link to={"/problems"} onClick={GoTop}>Soal</Link>
                </li>
                <li>
                    <Link to={"/discussions"} onClick={GoTop}>Forum diskusi</Link>
                </li>
                <li>
                    <Link to={"/leaderboard"} onClick={GoTop}>Leaderboard</Link>
                </li>
                {
                    !isLogin &&
                    <li>
                        <Link to={"/login"} className="mobile:hidden py-2 px-4 rounded-full bg-blue-light text-black" onClick={GoTop}>Masuk</Link>
                    </li>
                }
                {
                    isLogin === true &&
                    <li className="flex relative mobile:hidden">
                        <button type="button" className="flex items-center p-px rounded-full bg-blue-light" onClick={() => setShowAccountMenu(!showAccountMenu)} ref={accountMenuBtn}>
                            <img src={`${import.meta.env.VITE_AVATAR_API_ENDPOINT}&name=${user.username}`} alt="User" className="w-8 h-8 rounded-full" />
                            <IconChevronDown stroke={1.5} width={20} height={20} className={`text-black transition-all ${showAccountMenu ? "rotate-180" : ""}`} />
                        </button>
                        <ul className={`${showAccountMenu ? "flex" : "hidden"} flex-col absolute top-[105%] right-0 rounded-md overflow-hidden bg-blue-bold py-1`}>
                            <li className="py-2 pl-2 pr-10 hover:bg-blue-light/20 transition-all text-white">
                                <Link to={"/account"} className="flex items-center gap-1" onClick={GoTop}>
                                    <IconUserCircle stroke={1.5} />
                                    <p>Akun</p>
                                </Link>
                            </li>
                            <li className="py-2 pl-2 pr-10 hover:bg-blue-light/20 text-Sulit transition-all" onClick={logoutHandler}>
                                <button type="button" className="flex items-center gap-1">
                                    <IconLogout stroke={1.5} />
                                    <p>Keluar</p>
                                </button>
                            </li>
                        </ul>
                    </li>
                }
            </ul>
            <div className={`hidden ${showHumbergerMenu ? "mobile:block" : ""} absolute top-0 left-0 w-screen h-screen bg-blue-bold/20 backdrop-blur-lg z-20`}></div>
            <article className="hidden mobile:flex items-center gap-4">

                {
                    !isLogin &&
                    <Link to={"/login"} className="py-2 px-4 rounded-full bg-blue-light text-black" onClick={GoTop}>Masuk</Link>
                }
                {
                    isLogin === true &&
                    <article className="flex relative">
                        <button type="button" className="flex items-center p-px rounded-full bg-blue-light" onClick={() => setShowMobileAccountMenu(!showMobileAccountMenu)} ref={mobileAccountMenuBtn}>
                            <img src={`${import.meta.env.VITE_AVATAR_API_ENDPOINT}&name=${user.username}`} alt="User" className="w-8 h-8 rounded-full" />
                            <IconChevronDown stroke={1.5} width={20} height={20} className={`text-black transition-all ${showMobileAccountMenu ? "rotate-180" : ""}`} />
                        </button>
                        <ul className={`${showMobileAccountMenu ? "flex" : "hidden"} flex-col absolute top-[105%] right-0 rounded-md overflow-hidden bg-blue-bold py-1`}>
                            <li className="py-2 pl-2 pr-10 hover:bg-blue-light/20 transition-all text-white">
                                <Link to={"/account"} className="flex items-center gap-1" onClick={GoTop}>
                                    <IconUserCircle stroke={1.5} />
                                    <p>Akun</p>
                                </Link>
                            </li>
                            <li className="py-2 pl-2 pr-10 hover:bg-blue-light/20 text-Sulit transition-all" onClick={logoutHandler}>
                                <button type="button" className="flex items-center gap-1">
                                    <IconLogout stroke={1.5} />
                                    <p>Keluar</p>
                                </button>
                            </li>
                        </ul>
                    </article>
                }
                <button type="button" className="items-center justify-center p-2 rounded-md hover:bg-blue-light/20 text-white" onClick={() => setShowHumbergerMenu(!showHumbergerMenu)}>
                    <IconMenu2 stroke={1.5} />
                </button>
            </article>
        </nav>
    )
}