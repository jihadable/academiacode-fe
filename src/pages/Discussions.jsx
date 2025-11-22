import { IconArrowRight, IconMessageCircle, IconPlus, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/imgHome2.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { DateParser } from "../utils/DateParser";
import GoTop from "../utils/GoTop";

export default function Discussions(){
    const [allDiscussions, setAllDiscussions] = useState(null)
    const [discussions, setDiscussions] = useState([])
    useEffect(() => {
        const getDiscussions = async() => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/discussions`)

                setAllDiscussions(data.data.discussions)
                setDiscussions(data.data.discussions)
            } catch(error){
                console.log(error)
            }
        }

        getDiscussions()
    }, [])

    return (
        <>
        <Navbar />
        <ToolBar allDiscussions={allDiscussions} setDiscussions={setDiscussions} />
        <DiscussionList allDiscussions={allDiscussions} discussions={discussions} />
        <Layout1 />
        <Footer theme={"bold"} />
        </>
    )
}

function ToolBar({ allDiscussions, setDiscussions }){
    const [searchValue, setSearchValue] = useState("")
    useEffect(() => {
        setDiscussions(allDiscussions?.filter(discussion => discussion.title.toLowerCase().includes(searchValue.toLowerCase())))
    }, [searchValue])
    
    return (
        <section className="flex items-center justify-between gap-4 w-full px-[10vw] pt-20 bg-blue-semibold text-white mobile:px-4 mobile:flex-col mobile:items-start tablet:px-[5vw]">
            <article className="flex gap-1 py-1 px-2 items-center rounded-full bg-blue-bold shadow-lg mobile:w-full">
                <IconSearch />
                <input type="text" className="border-none outline-none mobile:w-full" placeholder="Cari diskusi" onChange={(event) => setSearchValue(event.target.value)} />
            </article>
            <Link to={"/discussions/create"} className="flex items-center gap-1 rounded-full p-1 pr-3 text-black bg-blue-light shadow-lg" onClick={GoTop}>
                <IconPlus stroke={1.5} />
                <p>Buat diskusi</p>
            </Link>
        </section>
    )
}

function DiscussionList({ allDiscussions, discussions }){
    return (
        <section className="flex flex-col px-[10vw] pt-4 bg-blue-semibold mobile:px-4 tablet:px-[5vw]">
            {
                allDiscussions !== null && discussions.length == 0 &&
                <article className="flex items-center justify-center py-20">
                    <p className="text-center font-bold text-xl text-white">Diskusi tidak ditemukan</p>
                </article>
            }
            <section className="flex flex-col shadow-2xl overflow-hidden rounded-md w-full">
            {
                allDiscussions === null &&
                Array.from({ length: 3 }).map((_, index) => (
                    <article className={`relative overflow-hidden w-full flex p-19 ${index % 2 == 0 ? "bg-blue-light/20" : "bg-blue-bold/20"}`} key={index}>
                        <div className="skeleton-animation absolute top-0 left-0 w-[80%] h-full skew-x-20 bg-white/1"></div>
                    </article>
                ))
            }
            {
                discussions?.map((discussion, index) => (
                    <Link to={`/discussions/${discussion.id}`} className={`flex flex-col gap-2 p-2 ${index % 2 == 0 ? "bg-blue-light/20" : "bg-blue-bold/50"} text-white`} key={index} onClick={GoTop}>
                        <article className="flex gap-2 items-center">
                            <img src={`${import.meta.env.VITE_AVATAR_API_ENDPOINT}&name=${discussion.creator.username}`} alt="Profile" className="w-10 h-10 rounded-full" />
                            <article>
                                <p className="text-gray-300">{discussion.creator.username} • <span className="text-sm">{DateParser(discussion.created_at)}</span></p>
                                <p className="font-bold line-clamp-1">{discussion.title}</p>
                            </article>
                        </article>
                        <article className="flex flex-col gap-2">
                            <p className="line-clamp-2 text-gray-300">{discussion.content}</p>
                            <article className="flex items-center gap-1 self-end">
                                <IconMessageCircle stroke={1.5} />
                                <p>{Intl.NumberFormat("en", { notation: "compact" }).format(discussion.total_comments)}</p>
                            </article>
                        </article>
                    </Link>
                ))
            }
            </section>
        </section>
    )
}

function Layout1(){
    return (
        <section className="flex items-center gap-8 w-full px-[10vw] py-8 bg-blue-semibold text-white mobile:px-4 mobile:flex-col tablet:px-[5vw]">
            <img src={img} alt="Coding vibe" className="w-1/2 drop-shadow-2xl mobile:w-full" />
            <article className="flex flex-col items-center w-1/2 text-xl gap-4 mobile:w-full">
                <p className="text-center">Belajar lebih cepat dengan berdiskusi</p>
                <Link to={"/discussions/create"} className="flex items-center py-2 px-4 gap-2 rounded-full bg-blue-light w-fit text-black shadow-2xl" onClick={GoTop}>
                    <span>Buat diskusi</span>
                    <IconArrowRight stroke={1.5} />
                </Link>
                <p className="text-center">Temukan perspektif baru dari sesama pengguna</p>
            </article>
        </section>
    )
}