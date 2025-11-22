import { IconMoodPuzzled } from "@tabler/icons-react";

export default function NotFound(){
    return (
        <section className="flex flex-col text-white items-center justify-center w-screen h-screen bg-blue-semibold">
            <IconMoodPuzzled className="w-32 h-32" />
            <p className="text-xl">404</p>
            <p>Not Found</p>
        </section>
    )
}