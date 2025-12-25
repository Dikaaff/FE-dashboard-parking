import React, { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

interface User {
    email: string
    name: string
    role: 'admin' | 'user'
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Check local storage for persisted session
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (email: string) => {
        const isAdmin = email.toLowerCase() === 'admin@soulparking.co.id'
        const newUser: User = { 
            email, 
            name: isAdmin ? "System Admin" : "Parking Staff",
            role: isAdmin ? 'admin' : 'user'
        }
        setUser(newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        toast.success(`Login successful as ${newUser.role}`)
        
        if (isAdmin) {
            navigate("/admin/dashboard")
        } else {
            navigate("/dashboard")
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
        toast.info("Logged out successfully")
        navigate("/login")
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
