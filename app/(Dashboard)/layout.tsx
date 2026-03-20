import Menu from "@/components/menu"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full bg-[#F8F4F0]">
            {/* Sidebar Menu - Desktop */}
            <aside className="w-[300px] max-lg:hidden">
                <Menu />
            </aside>

            {/* Main Content */}
            <main className="flex-1 pb-[120px] lg:pb-0">
                {children}
            </main>

            {/* Bottom Menu - Mobile/Tablet */}
            <div className="lg:hidden">
                <Menu />
            </div>
        </div>
    )
}

