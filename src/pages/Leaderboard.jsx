import { IconArrowRight } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/imgHome2.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import GoTop from "../utils/GoTop";

export default function Leaderboard(){
    const [leaderboard, setLeaderboard] = useState(null)
    useEffect(() => {
        const getLeaderboard = async() => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/leaderboard`)

                setLeaderboard(data.data.leaderboard)
            } catch(error){
                console.log(error)
            }
        }

        getLeaderboard()
    }, [])

    return (
        <>
        <Navbar />
        <LeaderboardSection leaderboard={leaderboard} />
        <Layout1 />
        <Footer theme={"light"} />
        </>
    )
}

function LeaderboardSection({ leaderboard }){
    return (
        <section className="flex flex-col gap-4 w-full px-[10vw] pt-24 bg-blue-semibold text-white mobile:px-4 tablet:px-[5vw]">
            <p className="font-bold text-2xl text-center">Papan Peringkat</p>
            <p className="text-center">Setiap upaya yang kamu lakukan membawamu lebih dekat ke puncak</p>
            <table className="rounded-md overflow-hidden shadow-2xl w-full">
                <thead className="w-full">
                    <tr className="bg-blue-bold w-full">
                        <td className="p-2">No</td>
                        <td className="p-2">Nama pengguna</td>
                        <td className="p-2">Jumlah poin</td>
                    </tr>
                </thead>
                <tbody>
                {
                    leaderboard === null &&
                    Array.from({ length: 10 }).map((_, index) => (
                        <tr className={`relative overflow-hidden ${index % 2 == 0 ? "bg-blue-light/20" : "bg-blue-bold/20"}`} key={index}>
                            <td className="p-5">
                                <div className="skeleton-animation absolute top-0 left-0 w-[80%] h-full skew-x-20 bg-white/1"></div>
                            </td>
                            <td className="p-5"></td>
                            <td className="p-5"></td>
                        </tr>
                    ))
                }
                {
                    leaderboard?.map((user, index) => (
                        <tr className={`${index % 2 == 0 ? "bg-blue-light/20" : "bg-blue-bold/20"}`} key={index}>
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{user.username}</td>
                            <td className="p-2">{user.total_points}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </section>
    )
}

function Layout1(){
    return (
        <section className="flex items-center gap-8 w-full px-[10vw] py-8 bg-blue-semibold text-white mobile:px-4 mobile:flex-col tablet:px-[5vw]">
            <img src={img} alt="Coding vibe" className="w-1/2 drop-shadow-2xl mobile:w-full" />
            <article className="flex flex-col items-center w-1/2 text-xl gap-4 mobile:w-full">
                <p className="text-center">Namamu belum ada di sini?</p>
                <Link to={"/problems"} className="flex items-center py-2 px-4 gap-2 rounded-full bg-blue-light w-fit text-black shadow-2xl" onClick={GoTop}>
                    <span>Kerjakan soal</span>
                    <IconArrowRight stroke={1.5} />
                </Link>
                <p className="text-center">Dapatkan poin dan bergabung ke papan peringkat</p>
            </article>
        </section>
    )
}