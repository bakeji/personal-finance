'use client'
import { User, LogOut, LogIn } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/lib/authContext"

export default function PageTitle(){
    const [showLogout, setShowLogout] = useState(false)
    const { userData, logout, loading } = useAuth()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout()
            toast.success('Logged out successfully!')
            router.push('/login')
        } catch (error) {
            toast.error('Error logging out')
        }
        setShowLogout(false)
    }

    const handleLogin = () => {
        router.push('/login')
    }

    if (loading) {
        return (
            <div className="flex justify-between items-center">
                <h1 className="text-[#201F24] font-bold text-[32px]">Overview</h1>
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
        )
    }

    return(
        <div className="flex justify-between items-center">
            <h1 className="text-[#201F24] font-bold text-[32px]">Overview</h1>
            
            {/* Profile/Login Section */}
            <div className="relative">
                {userData ? (
                    // Logged In - Show Profile
                    <>
                        <button 
                            onClick={() => setShowLogout(!showLogout)}
                            className="flex items-center gap-3 text-[#201F24] hover:opacity-80 transition-opacity group"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#277C78] flex items-center justify-center group-hover:bg-[#2e9388] transition-colors">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-bold text-[14px] max-sm:hidden">{userData.name}</span>
                        </button>

                        {/* Logout Popup */}
                        {showLogout && (
                            <>
                                {/* Backdrop */}
                                <div 
                                    className="fixed inset-0 z-40"
                                    onClick={() => setShowLogout(false)}
                                />
                                
                                {/* Popup */}
                                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-100 p-1 z-50 min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-[#201F24] hover:bg-[#F8F4F0] rounded-lg transition-colors group"
                                    >
                                        <LogOut className="w-5 h-5 text-[#277C78] group-hover:text-[#1f6662]" />
                                        <span className="font-bold text-[14px]">Log Out</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    // Not Logged In - Show Login Button
                    <button 
                        onClick={handleLogin}
                        className="flex items-center gap-2 px-4 py-2 bg-[#277C78] text-white font-bold text-[14px] rounded-lg hover:bg-[#2e9388] transition-colors"
                    >
                        <LogIn className="w-5 h-5" />
                        <span>Login</span>
                    </button>
                )}
            </div>
        </div>
    )
}