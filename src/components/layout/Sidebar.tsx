import { Link, useLocation } from "react-router-dom"
import { 
    LayoutDashboard, 
    FileText, 
    Settings, 
    LogOut, 
    Menu, 
    ChevronLeft, 
    Users, 
    MapPin,
    ShieldCheck,
    History
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"

interface SidebarProps {
    className?: string
    isCollapsed: boolean
    toggleSidebar: () => void
}

export function Sidebar({ className, isCollapsed, toggleSidebar }: SidebarProps) {
  const location = useLocation()
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'
  
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
             <div className="flex items-center gap-2 overflow-hidden">
                {isAdmin ? (
                    <div className="h-10 w-10 rounded-full border-2 border-primary bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                        {/* Photo placeholder for Admin */}
                        <div className="text-[10px] font-bold text-gray-400">PHOTO</div>
                    </div>
                ) : (
                    <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
                        <ShieldCheck className="text-white" size={24} />
                    </div>
                )}
                {!isAdmin && <span className="font-bold text-xl tracking-tight text-foreground whitespace-nowrap">LOGO</span>}
             </div>
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
                    MAIN MENU
                </h3>
            )}
            <div className="space-y-1">
                {isAdmin ? (
                    <>
                        <SidebarLink 
                            to="/admin/dashboard" 
                            icon={<LayoutDashboard size={22} />} 
                            label="Overview" 
                            active={location.pathname === "/admin/dashboard"} 
                            isCollapsed={isCollapsed} 
                        />
                        <SidebarLink 
                            to="/admin/users" 
                            icon={<Users size={22} />} 
                            label="Users" 
                            active={location.pathname === "/admin/users"} 
                            isCollapsed={isCollapsed} 
                        />
                        <SidebarLink 
                            to="/admin/locations" 
                            icon={<MapPin size={22} />} 
                            label="Locations" 
                            active={location.pathname === "/admin/locations"} 
                            isCollapsed={isCollapsed} 
                        />
                        <SidebarLink 
                            to="/admin/activity" 
                            icon={<History size={22} />} 
                            label="Activity Log" 
                            active={location.pathname === "/admin/activity"} 
                            isCollapsed={isCollapsed} 
                        />
                    </>
                ) : (
                    <>
                        <SidebarLink 
                            to="/dashboard" 
                            icon={<LayoutDashboard size={22} />} 
                            label="Dashboard" 
                            active={location.pathname === "/dashboard"} 
                            isCollapsed={isCollapsed} 
                        />
                        <SidebarLink 
                            to="/transactions" 
                            icon={<FileText size={22} />} 
                            label="Transactions" 
                            active={location.pathname === "/transactions"} 
                            isCollapsed={isCollapsed} 
                        />
                    </>
                )}
            </div>
        </div>

        {/* Section: SETTINGS */}
        <div className="space-y-2">
            {!isCollapsed && (
                <h3 className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider animate-in fade-in duration-300">
                    PREFERENCES
                </h3>
            )}
             <div className="space-y-1">
                <SidebarLink 
                    to="/settings" 
                    icon={<Settings size={22} />} 
                    label="Settings" 
                    active={location.pathname === "/settings"} 
                    isCollapsed={isCollapsed} 
                />
            </div>
        </div>

      </nav>

      {/* Disclaimer / Bottom */}
      <div className="p-4 border-t border-gray-100 mx-2">
         <Link 
            to="/login" 
            className={cn(
                "flex items-center gap-3 px-3 py-2 font-medium text-primary hover:text-primary/80 transition-colors group",
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

interface SidebarLinkProps {
    to: string
    icon: React.ReactNode
    label: string
    active: boolean
    isCollapsed: boolean
}

function SidebarLink({ to, icon, label, active, isCollapsed }: SidebarLinkProps) {
    return (
        <Link
            to={to}
            className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative",
                active
                    ? "bg-primary/5 text-primary font-bold"
                    : "text-gray-500 hover:text-primary hover:bg-gray-50",
                isCollapsed && "justify-center"
            )}
            title={isCollapsed ? label : ""}
        >
            <div className={cn(active ? "text-primary" : "text-gray-400 group-hover:text-primary")}>
                {icon}
            </div>
            {!isCollapsed && <span>{label}</span>}
        </Link>
    )
}
