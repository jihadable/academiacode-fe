export default function Loading(){
    return (
        <section className="flex relative w-screen h-screen bg-blue-semibold">
            <div className="skeleton-animation absolute top-0 left-0 w-[80%] h-full skew-x-20 bg-white/1"></div>
        </section>
    )
}