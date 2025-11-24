import { Editor } from "@monaco-editor/react";
import { IconChevronDown, IconClipboardText, IconCode, IconInfoCircle, IconPlayerPlay } from "@tabler/icons-react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import { LoaderContext } from "../contexts/LoaderContext";
import Loading from "./Loading";
import NotFound from "./NotFound";

export default function Problem(){
    const { problem_id } = useParams()
    const [problem, setProblem] = useState(null)
    const [defaultCodes, setDefaultCodes] = useState(null)
    const [submission, setSubmission] = useState(null)
    useEffect(() => {
        const fetchData = async() => {
            try {
                const [problemRes, defaultCodesRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/problems/${problem_id}`),
                    axios.get(`${import.meta.env.VITE_API_ENDPOINT}/default_codes/problems/${problem_id}`)
                ])

                setProblem(problemRes.data.data.problem)
                setDefaultCodes(defaultCodesRes.data.data.default_codes)
            } catch(error){
                console.log(error)
                setProblem(undefined)
            }
        }

        fetchData()
    }, [problem_id])

    if (problem === undefined){
        return <NotFound />
    }

    if (problem !== null && problem !== undefined){
        return (
            <>
            <Navbar />
            <Container problem={problem} defaultCodes={defaultCodes} submission={submission} setSubmission={setSubmission} />
            </>
        )
    }

    return <Loading />
}

function Container({ problem, defaultCodes, submission, setSubmission }){
    const [selectedBar, setSelectedBar] = useState("Deskripsi")

    return (
        <section className="flex pt-20 px-2 pb-2 bg-blue-semibold gap-2 mobile:flex-col tablet:flex-col">
            <Information problem={problem} submission={submission} selectedBar={selectedBar} setSelectedBar={setSelectedBar} />
            <CodeField problem={problem} defaultCodes={defaultCodes} setSubmission={setSubmission} setSelectedBar={setSelectedBar} />
        </section>
    )
}

function Information({ problem, submission, selectedBar, setSelectedBar }){
    const bars = [
        {
            svg: <IconInfoCircle stroke={1.5} />,
            label: "Instruksi"
        },
        {
            svg: <IconClipboardText stroke={1.5} />,
            label: "Deskripsi"
        },
        {
            svg: <IconCode stroke={1.5} />,
            label: "Jawaban"
        }
    ]

    return (
        <section className="flex flex-col w-1/2 h-[calc(100vh-5.5rem)] bg-blue-bold rounded-md mobile:w-full tablet:w-full tablet:h-[50vh]">
        {
            problem === null &&
            <>
            <article className="flex p-6 relative overflow-hidden bg-blue-light rounded-t-md">
                <div className="skeleton-animation absolute top-0 left-0 w-[80%] h-full skew-x-20 bg-white/[.07]"></div>
            </article>
            <article className="flex relative h-full overflow-hidden">
                <div className="skeleton-animation absolute top-0 left-0 w-[80%] h-full skew-x-20 bg-white/1"></div>
            </article>
            </>
        }
        {
            problem !== null &&
            <>
            <article className="flex items-center gap-2 p-2 bg-blue-light rounded-t-md">
            {
                bars.map((bar, index) => (
                    <button type="button" className={`flex items-center gap-1 hover:bg-blue-semibold/20 transition-all p-1 pr-2 rounded-md ${selectedBar == bar.label ? "bg-blue-semibold/20" : ""}`} onClick={() => setSelectedBar(bar.label)} key={index}>
                        {bar.svg}
                        <p>{bar.label}</p>
                    </button>    
                ))
            }
            </article>
            <article className="flex overflow-y-auto">
            {
                problem !== null &&
                <article className="flex flex-col gap-2 w-full h-full p-2 text-white">
                {
                    selectedBar == "Instruksi" &&
                    <article>
                    <p className="font-bold">Instruksi Umum</p>
                    <ul className="list-disc pl-6">
                        <li>Nama function serta parameter telah ditentukan dan dideklarasikan pada tiap soal, tidak diperbolehkan untuk mengubah nama function dan parameternya</li>
                        <li>Gunakan return untuk menjalankan output pada function yang telah disediakan</li>
                        <li>Tidak diperbolehkan menambahkan fungsi <code>console</code> pada bahasa pemrograman javascript, fungsi <code>print</code> pada bahasa pemrograman python, dan <code>echo</code> pada bahasa php</li>
                    </ul>   
                    </article>
                }
                {
                    selectedBar == "Deskripsi" &&
                    <article dangerouslySetInnerHTML={{__html: problem.description}}></article> 
                }
                {
                    selectedBar == "Jawaban" &&
                    <>
                    {
                        submission === null ?
                        <p>Belum ada jawaban</p> :
                        <>
                        {
                            submission.status == "Accepted" &&
                            <article className="flex items-center gap-2">
                                <p className="font-bold text-xl text-Mudah">Accepted</p>
                                <p className="text-sm text-gray-400">•</p>
                                <p className="text-sm text-gray-400"> {submission.accepted.passed_test_cases}/{submission.accepted.total_test_cases} kasus uji lolos</p>
                            </article>
                        }
                        {
                            submission.status == "Wrong Answer" &&
                            <article className="flex flex-col gap-4">
                                <article className="flex items-center gap-2">
                                    <p className="font-bold text-xl text-Sulit">Wrong Answer</p>
                                    <p className="text-sm text-gray-400">•</p>
                                    <p className="text-sm text-gray-400"> {submission.wrong_answer.passed_test_cases}/{submission.wrong_answer.total_test_cases} kasus uji lolos</p>
                                </article>
                                <article className="flex flex-col w-full">
                                    <p className="text-gray-400 text-sm">Masukan</p>
                                    <p className="p-2 bg-blue-light/20 w-full rounded-md">{submission.wrong_answer.input}</p>
                                </article>
                                <article className="flex flex-col w-full">
                                    <p className="text-gray-400 text-sm">Keluaran asli</p>
                                    <p className="p-2 bg-blue-light/20 w-full rounded-md">{submission.wrong_answer.actual_output}</p>
                                </article>
                                <article className="flex flex-col w-full">
                                    <p className="text-gray-400 text-sm">Harapan keluaran</p>
                                    <p className="p-2 bg-blue-light/20 w-full rounded-md">{submission.wrong_answer.expected_output}</p>
                                </article>
                            </article>
                        }
                        {
                            submission.status == "Runtime Error" &&
                            <article className="flex flex-col gap-4">
                                <p className="flex items-center gap-2">
                                    <p className="font-bold text-xl text-Sulit">Runtime Error</p>
                                </p>
                                <article className="flex w-full bg-Sulit/15 p-2 rounded-md">
                                    <pre className="text-gray-400 text-xs whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: submission.runtime_error.stderr.replaceAll("\n", "<br>")}}></pre>
                                </article>
                            </article>
                        }
                        </>
                    }
                    </>
                }
                </article>
            }
            </article>
            </>
        }
        </section>
    )
}

function CodeField({ problem, defaultCodes, setSubmission, setSelectedBar }){
    const [showLanguageMenu, setShowLanguageMenu] = useState(false)

    const languages = defaultCodes?.map(defaultCode => defaultCode.programming_language)
    const [selectedLanguage, setSelectedLanguage] = useState("javascript")
    const [defaultCode, setDefaultCode] = useState(defaultCodes?.find(defaultCode => defaultCode.programming_language.name == selectedLanguage).code)

    useEffect(() => {
        setShowLanguageMenu(false)
        setDefaultCode(defaultCodes?.find(defaultCode => defaultCode.programming_language.name == selectedLanguage).code)
    }, [selectedLanguage])

    const languageMenuBtn = useRef(null)
    useEffect(() => {
        document.addEventListener("click", function(e){
            if (!languageMenuBtn.current?.contains(e.target)){
                setShowLanguageMenu(false)
            }
        })
    })

    const { isLogin } = useContext(AuthContext)
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { setLoadingElementWidth, setLoadingElementHeight } = useContext(LoaderContext)
    const submitBtn = useRef(null)

    const submitHandler = async() => {
        try {
            setLoadingElementWidth(submitBtn.current.clientWidth)
            setLoadingElementHeight(submitBtn.current.clientHeight)
            setIsLoading(true)

            const jwt = localStorage.getItem("jwt")
            const language = languages.find(language => language.name == selectedLanguage)
            const { data } = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/submissions`,
                {
                    code, 
                    problem_id: problem.id,
                    programming_language_id: language.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`
                    }
                }
            )

            setSubmission(data.data.submission)
            setSelectedBar("Jawaban")
            setIsLoading(false)
        } catch(error){
            console.log(error)
            setIsLoading(false)
            toast.error("Jawaban gagal disubmit")
        }
    }

    return (
        <section className="flex flex-col w-1/2 h-[calc(100vh-5.5rem)] bg-blue-bold rounded-md mobile:w-full tablet:w-full tablet:h-[50vh]">
        {
            problem === null &&
            <>
            <article className="flex p-6 relative overflow-hidden bg-blue-light rounded-t-md">
                <div className="skeleton-animation absolute top-0 left-0 w-[80%] h-full skew-x-20 bg-white/[.07]"></div>
            </article>
            <article className="flex relative h-full overflow-hidden">
                <div className="skeleton-animation absolute top-0 left-0 w-[80%] h-full skew-x-20 bg-white/1"></div>
            </article>
            </>
        }
        {
            problem !== null &&
            <>
            <article className="flex items-center justify-between gap-2 p-2 bg-blue-light rounded-t-md">
                <article className="flex relative">
                    <button type="button" className="flex items-center gap-1 hover:bg-blue-semibold/20 transition-all p-1 rounded-md" onClick={() => setShowLanguageMenu(!showLanguageMenu)} ref={languageMenuBtn}>
                        <IconCode stroke={1.5} />
                        <p>{selectedLanguage}</p>
                        <IconChevronDown stroke={1.5} className={`${showLanguageMenu ? "rotate-180" : ""} transition-all`} />
                    </button>
                    <ul className={`${showLanguageMenu ? "flex" : "hidden"} flex-col absolute top-[105%] rounded-md overflow-hidden bg-blue-bold py-1 z-50 text-white shadow-2xl`}>
                    {
                        languages.map((language, index) => (
                            <li className="py-1 pl-2 pr-10 hover:bg-blue-light/20 transition-all" key={index} onClick={() => setSelectedLanguage(language.name)}>
                                <button type="button" className="flex gap-1"><p>{language.name}</p> • <p>{language.version}</p></button>
                            </li>
                        ))
                    }
                    </ul>
                </article>
                {
                    isLogin === true &&
                    <>
                    {
                        isLoading ?
                        <Loader className={"bg-blue-semibold/20 rounded-md"} /> :
                        <button type="button" className="flex items-center gap-1 hover:bg-blue-semibold/20 transition-all p-1 pr-2 rounded-md" onClick={submitHandler} ref={submitBtn}>
                            <IconPlayerPlay stroke={1.5} />
                            <p>Submit</p>
                        </button>
                    }
                    </>
                }
                {
                    isLogin === false &&
                    <p className="text-sm text-red-600">Masuk untuk menjawab</p>
                }
            </article>
            <article className="flex h-full rounded-md overflow-hidden">
                <Editor
                    theme="vs-dark"
                    language={selectedLanguage}
                    options={{
                        minimap: { enabled: false }
                    }}
                    value={defaultCode}
                    defaultValue={defaultCode}
                    onChange={setCode}
                />
            </article>
            </>
        }
        </section>
    )
}