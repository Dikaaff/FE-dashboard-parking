import { useState } from 'react'
import { 
  History, 
  MapPin,
  Settings,
  LogIn,
  Search,
  Filter,
  ArrowUpRight,
  MoreVertical,
  UserCog,
  ShieldCheck,
  Activity,
  Zap,
  Users
} from 'lucide-react'
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Activity {
  id: string
  user: {
    name: string
    role: string
    avatar?: string
  }
  action: string
  type: 'user' | 'location' | 'system' | 'auth'
  timestamp: string
  details: string
}

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: '1',
    user: { name: 'Dedi Admin', role: 'admin' },
    action: 'User Added',
    type: 'user',
    timestamp: '2 mins ago',
    details: 'Added Ahmad Staff to Yogyakarta Central'
  },
  {
    id: '2',
    user: { name: 'Ahmad Staff', role: 'staff' },
    action: 'Status Update',
    type: 'location',
    timestamp: '15 mins ago',
    details: 'Changed status of Yogyakarta Central to "Active"'
  },
  {
    id: '3',
    user: { name: 'System', role: 'system' },
    action: 'Backup Completed',
    type: 'system',
    timestamp: '1 hour ago',
    details: 'Nightly database backup performed successfully'
  },
  {
    id: '4',
    user: { name: 'Cici Jakarta', role: 'staff' },
    action: 'Login',
    type: 'auth',
    timestamp: '3 hours ago',
    details: 'Logged in from SCBD Jakarta Office'
  },
  {
      id: '5',
      user: { name: 'Dedi Admin', role: 'admin' },
      action: 'Location Config',
      type: 'location',
      timestamp: '5 hours ago',
      details: 'Increased capacity for Bandung Mall by 50 spots'
  }
]

export default function ActivityLogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const getTypeColor = (type: Activity['type']) => {
    switch (type) {
      case 'user': return 'bg-blue-100 text-blue-600'
      case 'location': return 'bg-emerald-100 text-emerald-600'
      case 'system': return 'bg-purple-100 text-purple-600'
      case 'auth': return 'bg-amber-100 text-amber-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getIcon = (type: Activity['type']) => {
      switch (type) {
        case 'user': return <UserCog size={16} />
        case 'location': return <MapPin size={16} />
        case 'system': return <Settings size={16} />
        case 'auth': return <LogIn size={16} />
        default: return <History size={16} />
      }
  }

  return (
    <div className="p-6 space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Activity Log</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor all administrative actions and security events.</p>
        </div>
        <div className="flex items-center gap-3">
             <Button className="bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2 h-11 px-6 text-xs font-bold">
                Download Report
             </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatMiniCard label="Staff Managed" value="46" color="bg-blue-50 text-blue-600" icon={<Users size={18} />} />
          <StatMiniCard label="Active Hubs" value="4" color="bg-emerald-50 text-emerald-600" icon={<MapPin size={18} />} />
          <StatMiniCard label="Admin Actions" value="24" color="bg-amber-50 text-amber-600" icon={<Zap size={18} />} />
          <StatMiniCard label="Security Logs" value="1,284" color="bg-purple-50 text-purple-600" icon={<ShieldCheck size={18} />} />
      </div>

      <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden bg-white">
        <CardHeader className="border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 px-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Filter logs..." 
              className="pl-12 h-11 rounded-2xl bg-gray-50 border-none text-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
             <Button variant="ghost" size="sm" className="rounded-xl font-bold text-slate-500 text-xs">
                <Filter size={14} className="mr-2" />
                All Types
             </Button>
          </div>
        </CardHeader>
        
        <div className="overflow-x-scroll scrollbar-primary pb-6">
          <div className="divide-y divide-gray-50 min-w-[500px] md:min-w-0">
           {INITIAL_ACTIVITIES.map((activity) => (
             <div key={activity.id} className="p-6 hover:bg-slate-50/50 transition-colors group">
               <div className="flex items-start gap-4">
                  <div className={cn("p-3 rounded-2xl shrink-0", getTypeColor(activity.type))}>
                     {getIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                           <span className="font-bold text-slate-900 text-sm">{activity.user.name}</span>
                           <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">{activity.user.role}</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">{activity.timestamp}</span>
                     </div>
                     <div className="mt-1 flex items-center gap-2">
                        <h4 className="font-bold text-slate-700 text-sm">{activity.action}</h4>
                        <div className="h-1 w-1 rounded-full bg-slate-300" />
                        <p className="text-sm text-slate-500 line-clamp-1">{activity.details}</p>
                     </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100">
                     <MoreVertical size={16} />
                  </Button>
               </div>
             </div>
           ))}
          </div>
        </div>
        
        <div className="p-4 bg-gray-50/50 border-t border-gray-50 text-center">
            <Button variant="link" className="text-primary font-bold text-xs uppercase tracking-widest">
                View Older Activity <ArrowUpRight size={14} className="ml-1" />
            </Button>
        </div>
      </Card>
    </div>
  )
}

function StatMiniCard({ label, value, color, icon }: { label: string, value: string, color: string, icon: React.ReactNode }) {
    return (
        <Card className="border-none shadow-sm rounded-2xl p-4 bg-white border border-gray-50">
            <div className="flex items-center gap-3">
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", color)}>
                    {icon}
                </div>
                <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</div>
                    <div className="text-lg font-black text-slate-900 mt-1">{value}</div>
                </div>
            </div>
        </Card>
    )
}
