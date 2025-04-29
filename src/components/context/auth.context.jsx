import { createContext, useState } from "react"

export const AuthContext = createContext({
    id: "",
    email: ""
})

export const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        id: "",
        email: ""
    })

    const [isAppLoading, setIsAppLoading] = useState(true)

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, setIsAppLoading }}>
            {props.children}
        </AuthContext.Provider>
    )
}