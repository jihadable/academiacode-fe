import { IconChartBarPopular, IconClipboardText, IconCode, IconUsers } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import codingVibe1 from "../assets/imgHome1.png";
import codingVibe2 from "../assets/imgHome2.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import GoTop from "../utils/GoTop";

export default function Home(){
    return (
        <>
        <Navbar />
        <Hero />
        <Features />
        <Layout1 />
        <Footer theme={"light"} />
        </>
    )
}

function Hero(){
    return (
        <section className="w-full h-screen flex px-[10vw] items-center bg-blue-semibold gap-8 mobile:flex-col mobile:justify-center mobile:px-4 tablet:flex-col tablet:px-[5vw] tablet:justify-center">
            <img src={codingVibe1} alt="Coding vibe" className="h-fit drop-shadow-2xl" />
            <article className="text-white">
                <h3 className="font-bold text-2xl">AcademiaCode</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt nam officiis corrupti harum. Blanditiis quo ipsum laborum temporibus nam. Cumque ut tempore nemo repellendus sunt labore voluptates ad! Aperiam, omnis?</p>
            </article>
        </section>
    )
}

function Features(){
    return (
        <section className="flex flex-col py-20 px-[10vw] gap-4 bg-blue-light items-center mobile:px-4 tablet:px-[5vw]">
            <h3 className="font-bold text-2xl text-black text-center">Kenapa AcademiaCode?</h3>
            <article className="flex gap-4 mobile:flex-col">
                <article className="flex flex-col p-4 rounded-2xl bg-blue-bold w-3/5 text-white gap-4 shadow-2xl mobile:w-full">
                    <div>
                        <IconCode stroke={1.5} width={56} height={56} />
                    </div>
                    <h4 className="font-bold text-xl">Code practice</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consequatur inventore maxime ullam id cupiditate delectus. Velit similique facere pariatur enim consequuntur, laudantium exercitationem, eaque voluptas quas a explicabo quis.</p>
                </article>
                <article  className="flex flex-col p-4 rounded-2xl bg-blue-bold w-2/5 text-white gap-4 shadow-2xl mobile:w-full">
                    <div>
                        <IconUsers stroke={1.5} width={56} height={56} />
                    </div>
                    <h4 className="font-bold text-xl">User-generated problems</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consequatur inventore maxime ullam id cupiditate delectus. Velit similique facere pariatur enim consequuntur, laudantium exercitationem, eaque voluptas quas a explicabo quis.</p>
                </article>
            </article>
            <article className="flex gap-4 mobile:flex-col">
                <article className="flex flex-col p-4 rounded-2xl bg-blue-bold w-2/5 text-white gap-4 shadow-2xl mobile:w-full">
                    <div>
                        <IconClipboardText stroke={1.5} width={56} height={56} />
                    </div>
                    <h4 className="font-bold text-xl">Gamifikasi</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consequatur inventore maxime ullam id cupiditate delectus. Velit similique facere pariatur enim consequuntur, laudantium exercitationem, eaque voluptas quas a explicabo quis.</p>
                </article>
                <article className="flex flex-col p-4 rounded-2xl bg-blue-bold w-3/5 text-white gap-4 shadow-2xl mobile:w-full">
                    <div>
                        <IconChartBarPopular stroke={1.5} width={56} height={56} />
                    </div>
                    <h4 className="font-bold text-xl">Leaderboard</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil consequatur inventore maxime ullam id cupiditate delectus. Velit similique facere pariatur enim consequuntur, laudantium exercitationem, eaque voluptas quas a explicabo quis.</p>
                </article>
            </article>
        </section>
    )
}

function Layout1(){
    return (
        <section className="flex flex-col py-20 px-[10vw] gap-4 bg-blue-semibold items-center mobile:px-4">
            <h3 className="font-bold text-2xl text-white text-center">Petualangan coding Anda dimulai di sini</h3>
            <Link to={"/register"} className="py-2 px-4 rounded-full bg-blue-bold text-white shadow-2xl" onClick={GoTop}>Daftar sekarang</Link>
            <img src={codingVibe2} alt="Coding vibe" className="w-[50vw] drop-shadow-2xl mobile:w-full" />
        </section>
    )
}