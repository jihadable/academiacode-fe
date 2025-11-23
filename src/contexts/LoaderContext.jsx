import { createContext, useState } from "react"

export const LoaderContext = createContext()

export default function LoaderProvider({ children }){
    const [loadingElementWidth, setLoadingElementWidth] = useState(0)
    const [loadingElementHeight, setLoadingElementHeight] = useState(0)

    return (
        <LoaderContext.Provider value={{ loadingElementWidth, setLoadingElementWidth, loadingElementHeight, setLoadingElementHeight }}>
            {children}
        </LoaderContext.Provider>
    )
}