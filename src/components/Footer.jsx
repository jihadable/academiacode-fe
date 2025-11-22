import { IconBrandFacebookFilled, IconBrandGithubFilled, IconBrandInstagram, IconBrandLinkedinFilled, IconMail } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import GoTop from "../utils/GoTop";

export default function Footer(){
    return (
        <footer className={`flex justify-between py-20 px-[10vw] bg-blue-semibold text-white mobile:grid mobile:grid-cols-2 mobile:gap-4 mobile:px-4 mobile:py-12 tablet:px-[5vw]`}>
            <article className="mobile:col-span-2 mobile:flex mobile:items-center mobile:justify-center">
                <img src={logo} alt="Logo" className="w-16" />
            </article>
            <ul className="flex flex-col gap-4">
                <li className="hover:underline">
                    <Link to={"/about"} onClick={GoTop}>Tentang</Link>
                </li>
                <li className="hover:underline">
                    <Link to={"/problems"} onClick={GoTop}>Soal</Link>
                </li>
                <li className="hover:underline">
                    <Link to={"/discussions"} onClick={GoTop}>Forum diskusi</Link>
                </li>
                <li className="hover:underline">
                    <Link to={"/leaderboard"} onClick={GoTop}>Leaderboard</Link>
                </li>
            </ul>
            <ul className="flex flex-col gap-4 mobile:items-end">
                <li className="hover:underline">
                    <Link>Privacy policy</Link>
                </li>
                <li className="hover:underline">
                    <Link>Help center</Link>
                </li>
                <li className="hover:underline">
                    <Link>Terms of services</Link>
                </li>
            </ul>
            <article className="flex flex-col items-end gap-4 self-end mobile:items-center mobile:self-center mobile:col-span-2">
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
                <p>© 2025 Copyright</p>
            </article>
        </footer>
    )
}