import { IconBook, IconTargetArrow } from "@tabler/icons-react";
import backgorundImg from "../assets/imgBackg.png";
import dedadFajar from "../assets/imgHero1.png";
import umarJihad from "../assets/imgHero3.png";
import targetImg from "../assets/imgTarg.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function About(){
    return (
        <>
        <Navbar />
        <Team />
        <BackgroundAndTarget />
        <Footer theme={"bold"} />
        </>
    )
}

function Team(){
    return (
        <section className="flex flex-col items-center gap-8 py-24 px-[20vw] bg-blue-semibold text-white mobile:py-24 tablet:px-[5vw]">
            <h3 className="font-bold text-2xl text-center">Menjadikan pendidikan teknologi yang inklusif dan merata untuk semua</h3>
            <p className="text-center">Misi kami adalah menyediakan pendidikan coding yang inklusif dan merata bagi semua talenta, di mana pun mereka berada. Komitmen kami mendukung SDG 4: Pendidikan Berkualitas.</p>
            <article className="flex gap-4 mobile:flex-col">
                <article className="overflow-hidden rounded-lg bg-blue-bold text-white shadow-2xl">
                    <img src={dedadFajar} alt="Person" width={200} />
                    <article className="flex flex-col p-2">
                        <p className="font-bold">Dedad Fajar</p>
                        <p>UI/UX Designer</p>
                    </article>
                </article>
                <article className="overflow-hidden rounded-lg bg-blue-bold text-white shadow-2xl">
                    <img src={umarJihad} alt="Person" width={200} />
                    <article className="flex flex-col p-2">
                        <p className="font-bold">Umar Jihad</p>
                        <p>Fullstack Developer</p>
                    </article>
                </article>
            </article>
        </section>
    )
}

function BackgroundAndTarget(){
    return (
        <section className="flex flex-col gap-4 px-[10vw] py-20 bg-blue-light mobile:px-4 tablet:px-[5vw]">
            <article className="overflow-hidden rounded-4xl flex bg-blue-bold shadow-2xl mobile:flex-col-reverse">
                <article className="flex flex-col gap-4 p-8 text-white mobile:p-4">
                    <article className="flex items-center gap-2">
                        <IconBook stroke={1.5} width={56} height={56} />
                        <h3 className="font-bold text-2xl">Latar belakang</h3>
                    </article>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam similique quasi, molestiae sed odio labore animi id incidunt asperiores cum, maiores optio ratione laboriosam quidem. Quam officia doloribus corporis veniam laudantium molestias sequi nam dolor explicabo dolore distinctio dolorum libero iusto rem quae et, possimus accusantium aspernatur alias, tempore nihil!</p>
                </article>
                <img src={backgorundImg} alt="Coding vibe" className="w-2/5 mobile:w-full" />
            </article>
            <article className="overflow-hidden rounded-4xl flex bg-blue-bold shadow-2xl mobile:flex-col">
                <img src={targetImg} alt="Coding vibe" className="w-2/5 mobile:w-full" />
                <article className="flex flex-col gap-4 p-8 text-white mobile:p-4">
                    <article className="flex items-center gap-2">
                        <IconTargetArrow stroke={1.5} width={56} height={56} />
                        <h3 className="font-bold text-2xl">Target kami</h3>
                    </article>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam eum rem voluptatum sequi eius voluptas repellat quia inventore numquam. Laborum dolorum corporis eligendi maxime temporibus enim? Alias iure iusto sint commodi unde voluptatem error vel rem enim quis porro totam fuga quo voluptatibus, excepturi magni et rerum asperiores quas nesciunt.</p>
                </article>
            </article>
        </section>
    )
}