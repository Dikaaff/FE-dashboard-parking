import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, FileText, Settings, LogOut, Menu, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
    className?: string
    isCollapsed: boolean
    toggleSidebar: () => void
}

export function Sidebar({ className, isCollapsed, toggleSidebar }: SidebarProps) {
  const location = useLocation()
  
  return (
    <div 
        className={cn(
            "flex flex-col h-full bg-white transition-all duration-300 ease-in-out border-r border-gray-100 z-50 relative", 
            isCollapsed ? "w-[80px]" : "w-72", // Dynamic Width
            className
        )}
    >
      {/* Toggle & Logo Section */}
      <div className={cn("flex items-center py-6 px-4", isCollapsed ? "justify-center" : "justify-between")}>
         {!isCollapsed && (
             <img src="/src/assets/logo.png" alt="Soul Parking" className="h-8 w-auto object-contain transition-opacity duration-300" />
         )}
         <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="text-gray-400 hover:text-primary hover:bg-transparent"
         >
            {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
         </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-6 overflow-y-auto mt-4">
        
        {/* Section: OVERVIEW */}
        <div className="space-y-2">
            {!isCollapsed && (
                <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider animate-in fade-in duration-300">
                    OVERVIEW
                </h3>
            )}
            <div className="space-y-1">
                <Link
                    to="/dashboard"
                    className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                        location.pathname === "/dashboard"
                            ? "bg-primary/5 text-primary font-bold"
                            : "text-gray-500 hover:text-primary hover:bg-gray-50",
                        isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? "Dashboard" : ""}
                >
                    <LayoutDashboard size={22} className={cn(location.pathname === "/dashboard" ? "text-primary" : "text-gray-400 group-hover:text-primary")} />
                    {!isCollapsed && <span>Dashboard</span>}
                </Link>
                <Link
                    to="/transactions"
                    className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                        location.pathname === "/transactions"
                             ? "bg-primary/5 text-primary font-bold"
                            : "text-gray-500 hover:text-primary hover:bg-gray-50",
                         isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? "Transactions" : ""}
                >
                    <FileText size={22} className={cn(location.pathname === "/transactions" ? "text-primary" : "text-gray-400 group-hover:text-primary")} />
                    {!isCollapsed && <span>Transactions</span>}
                </Link>
            </div>
        </div>

        {/* Section: SETTINGS */}
        <div className="space-y-2">
            {!isCollapsed && (
                <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider animate-in fade-in duration-300">
                    SETTINGS
                </h3>
            )}
             <div className="space-y-1">
                 <Link
                    to="/settings"
                    className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                        location.pathname === "/settings"
                             ? "bg-primary/5 text-primary font-bold"
                            : "text-gray-500 hover:text-primary hover:bg-gray-50",
                         isCollapsed && "justify-center"
                    )}
                    title={isCollapsed ? "Settings" : ""}
                >
                    <Settings size={22} className={cn(location.pathname === "/settings" ? "text-primary" : "text-gray-400 group-hover:text-primary")} />
                    {!isCollapsed && <span>Settings</span>}
                </Link>
            </div>
        </div>

      </nav>

      {/* Disclaimer / Bottom */}
      <div className="p-4 border-t border-gray-100 mx-2">
         <Link 
            to="/login" 
            className={cn(
                "flex items-center gap-3 px-3 py-2 font-medium text-orange-500 hover:text-orange-600 transition-colors group",
                 isCollapsed && "justify-center"
            )}
            title={isCollapsed ? "Logout" : ""}
        >
           <LogOut size={22} />
           {!isCollapsed && <span>Logout</span>}
        </Link>
      </div>
    </div>
  )
}
