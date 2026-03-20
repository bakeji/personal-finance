import Menu, { MenuProvider } from "@/components/menu"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <MenuProvider>
            <div className="flex min-h-screen w-full bg-[#F8F4F0]">
                {/* Sidebar Menu - Desktop */}
                <aside className="max-lg:hidden">
                    <Menu />
                </aside>

                {/* Main Content */}
                <main className="flex-1 pb-[120px] lg:pb-0 transition-all duration-300">
                    {children}
                </main>

                {/* Bottom Menu - Mobile/Tablet */}
                <div className="lg:hidden">
                    <Menu />
                </div>
            </div>
        </MenuProvider>
    )
}