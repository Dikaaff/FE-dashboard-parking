import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./Sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Settings, HelpCircle, LogOut } from "lucide-react"

import { useNavigate } from "react-router-dom"

import { useAuth } from "@/contexts/AuthContext"

export function Header() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  return (
    <header className="flex h-16 items-center justify-between border-b border-border/40 bg-white/80 backdrop-blur-md px-6 shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-secondary">
              <Menu size={24} className="text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r border-border/40 w-72 bg-background">
            <Sidebar className="border-none" isCollapsed={false} toggleSidebar={() => {}} />
          </SheetContent>
        </Sheet>
        
        <h2 className="text-lg font-semibold lg:hidden text-foreground">Soul Parking</h2>
        <div className="hidden lg:block text-sm text-muted-foreground font-medium">
           Overview
        </div>
      </div>

      <div className="flex items-center gap-4">

        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold cursor-pointer hover:bg-primary/20 transition-colors">
                US
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] border-none bg-white/95 backdrop-blur-sm p-2">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">User</p>
                <p className="text-xs leading-none text-muted-foreground">user@soulparking.co.id</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer rounded-lg focus:bg-primary/10 focus:text-primary">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer rounded-lg focus:bg-primary/10 focus:text-primary">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/support')} className="cursor-pointer rounded-lg focus:bg-primary/10 focus:text-primary">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem onClick={logout} className="text-red-500 cursor-pointer rounded-lg focus:bg-red-50 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
