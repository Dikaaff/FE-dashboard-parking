import { useState, type ReactNode } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Header } from "@/components/layout/Header"
import { DateFilterProvider } from "@/contexts/DateFilterContext"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <DateFilterProvider>
      <div className="flex min-h-screen bg-background text-foreground font-sans">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block flex-shrink-0 z-30 relative transition-all duration-300 ease-in-out">
           <Sidebar 
                isCollapsed={isCollapsed} 
                toggleSidebar={() => setIsCollapsed(!isCollapsed)} 
           />
        </div>
        
        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden h-screen">
          <Header />
           <main className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
              {children}
           </main>
        </div>
      </div>
    </DateFilterProvider>
  )
}
