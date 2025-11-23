import { IconArrowRight, IconChevronDown, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/imgHome2.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import GoTop from "../utils/GoTop";

export default function Problems(){
    const [allProblems, setAllProblems] = useState(null)
    const [problems, setProblems] = useState([])

    useEffect(() => {
        const getProblems = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/problems`)
                setAllProblems(data.data.problems)
                setProblems(data.data.problems)
            } catch (error) {
                console.log(error)
            }
        }

        getProblems()
    }, [])
    
    return (
        <>
        <Navbar />
        <SearchAndFilter allProblems={allProblems} setProblems={setProblems} />
        <ProblemList allProblems={allProblems} problems={problems} />
        <Layout1 />
        <Footer />
        </>
    )
}

function SearchAndFilter({ allProblems, setProblems }){
    const [showDifficultyMenu, setShowDifficultyMenu] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [selectedDifficulty, setSelectedDifficulty] = useState("Semua")

    useEffect(() => {
        setShowDifficultyMenu(false)

        if (selectedDifficulty === "Semua") {
            setProblems(allProblems?.filter(problem => problem.title.toLowerCase().includes(searchValue.toLowerCase())))
        } else {
            setProblems(allProblems?.filter(problem => problem.title.toLowerCase().includes(searchValue.toLowerCase()) && problem.difficulty == selectedDifficulty))
        }
    }, [searchValue, selectedDifficulty, allProblems])

    const difficultyMenuBtn = useRef(null)
    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!difficultyMenuBtn.current?.contains(e.target)){
                setShowDifficultyMenu(false)
            }
        })
    })

    return (
        <section className="flex gap-4 w-full px-[10vw] pt-20 bg-blue-semibold text-white mobile:px-4 mobile:flex-col tablet:px-[5vw]">
            <article className="flex gap-1 py-1 px-2 items-center rounded-full bg-blue-bold">
                <IconSearch />
                <input type="text" className="border-none outline-none mobile:w-full" placeholder="Cari soal" onChange={(event) => setSearchValue(event.target.value)} />
            </article>
            <article className="flex items-center gap-2">
                <label htmlFor="">Kesulitan: </label>
                <article className="flex relative">
                    <button type="button" className="flex items-center gap-1 py-1 px-2 rounded-md bg-blue-bold" onClick={() => setShowDifficultyMenu(!showDifficultyMenu)} ref={difficultyMenuBtn}>
                        <p>{selectedDifficulty}</p> <IconChevronDown stroke={1.5} className={`${showDifficultyMenu ? "rotate-180" : ""} transition-all`} />
                    </button>
                    <ul className={`${showDifficultyMenu ? "flex" : "hidden"} flex-col absolute top-[105%] rounded-md overflow-hidden bg-blue-bold py-1`}>
                        <li className="py-1 pl-2 pr-10 hover:bg-blue-light/20 transition-all" onClick={() => setSelectedDifficulty("Semua")}>
                            <button type="button">Semua</button>
                        </li>
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
        </section>
    )
}

function ProblemList({ allProblems, problems }){
    return (
        <section className="flex flex-col gap-8 px-[10vw] pt-4 bg-blue-semibold mobile:px-4 tablet:px-[5vw]">
            {
                allProblems !== null && problems.length == 0 &&
                <article className="flex items-center justify-center py-20">
                    <p className="text-center font-bold text-xl text-white">Soal tidak ditemukan</p>
                </article>
            }
            <article className="flex flex-col text-white rounded-md overflow-hidden shadow-2xl">
            {
                allProblems === null &&
                Array.from({ length: 5 }).map((_, index) => (
                    <article className={`relative overflow-hidden flex p-5 ${index % 2 == 0 ? "bg-blue-light/20" : "bg-blue-bold/20"}`} key={index}>
                        <div className="skeleton-animation absolute top-0 left-0 w-[80%] h-full skew-x-20 bg-white/1"></div>
                    </article>
                ))
            }
            {
                problems?.map((problem, index) => (
                    <Link to={`/problems/${problem.id}`} className={`flex items-center justify-between gap-8 p-2 ${index % 2 == 0 ? "bg-blue-light/20" : "bg-blue-bold/20"}`} key={index} onClick={GoTop}>
                        <p className="w-full" title="Nama quiz">{index + 1}. {problem.title}</p>
                        <p className={`text-${problem.difficulty}`} title="Tingkat kesulitan">{problem.difficulty}</p>
                    </Link>        
                ))
            }
            </article>
            {/* <article className="flex items-center rounded-md gap-px overflow-hidden self-center bg-blue-light/20 text-white">
                <button type="button" className="p-1 bg-blue-bold">
                    <IconChevronLeft stroke={1.5} />
                </button>
                <button type="button" className="py-1 px-3 bg-blue-light/20">1</button>
                <button type="button" className="py-1 px-3 bg-blue-bold">2</button>
                <button type="button" className="py-1 px-3 bg-blue-bold">..</button>
                <button type="button" className="py-1 px-3 bg-blue-bold">99</button>
                <button type="button" className="py-1 px-3 bg-blue-bold">100</button>
                <button type="button" className="p-1 bg-blue-bold">
                    <IconChevronRight stroke={1.5} />
                </button>
            </article> */}
        </section>
    )
}

function Layout1(){
    return (
        <section className="flex items-center gap-8 w-full px-[10vw] py-8 bg-blue-semibold text-white mobile:px-4 mobile:flex-col tablet:px-[5vw]">
            <img src={img} alt="Coding vibe" className="w-1/2 drop-shadow-2xl mobile:w-full" />
            <article className="flex flex-col items-center w-1/2 text-xl gap-4 mobile:w-full">
                <p className="text-center">Punya ide menarik buat dijadikan soal?</p>
                <Link to={"/problems/suggest"} className="flex items-center py-2 px-4 gap-2 rounded-full bg-blue-light w-fit text-black shadow-2xl" onClick={GoTop}>
                    <span>Berikan saran soal</span>
                    <IconArrowRight stroke={1.5} />
                </Link>
            </article>
        </section>
    )
}