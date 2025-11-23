import { useContext } from "react"
import { LoaderContext } from "../contexts/LoaderContext"

export default function Loader({ className }){
    const { loadingElementWidth, loadingElementHeight } = useContext(LoaderContext)

    return (
        <div className={`loader ${className}`} style={{ width: `${loadingElementWidth}px`, height: `${loadingElementHeight}px` }}>
            <div className="spinner"></div>
        </div>
    )
}