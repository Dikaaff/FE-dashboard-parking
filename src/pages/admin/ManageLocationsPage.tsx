import { useState } from 'react'
import { 
  MapPin, 
  Plus, 
  Search, 
  Settings2, 
  TrafficCone, 
  Clock, 
  TrendingUp,
  ExternalLink,
  X
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/Progress"
import { cn } from "@/lib/utils"
import { toast } from 'sonner'

interface LocationData {
  id: string
  name: string
  address: string
  totalSpots: number
  occupiedSpots: number
  status: 'active' | 'maintenance' | 'full'
  revenueToday: number
  lastUpdated: string
}

const INITIAL_LOCATIONS: LocationData[] = [
  {
    id: '1',
    name: 'Yogyakarta Central',
    address: 'Jl. Malioboro No. 1, Yogyakarta',
    totalSpots: 500,
    occupiedSpots: 412,
    status: 'active',
    revenueToday: 12500000,
    lastUpdated: '5 mins ago'
  },
  {
    id: '2',
    name: 'Bandung Mall',
    address: 'Jl. Asia Afrika No. 10, Bandung',
    totalSpots: 300,
    occupiedSpots: 285,
    status: 'full',
    revenueToday: 8900000,
    lastUpdated: '2 mins ago'
  },
  {
    id: '3',
    name: 'Jakarta Selatan Hub',
    address: 'SCBD Lot 8, Jakarta Selatan',
    totalSpots: 1000,
    occupiedSpots: 650,
    status: 'active',
    revenueToday: 45000000,
    lastUpdated: 'Just now'
  },
]

export default function ManageLocationsPage() {
  const [locations, setLocations] = useState<LocationData[]>(INITIAL_LOCATIONS)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'location' | 'property'>('location')

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleOpenModal = (type: 'location' | 'property') => {
      setModalType(type)
      setIsModalOpen(true)
  }

  const handleAddLocation = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const newLoc: LocationData = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.get('name') as string,
          address: formData.get('address') as string,
          totalSpots: parseInt(formData.get('spots') as string) || 100,
          occupiedSpots: 0,
          status: 'active',
          revenueToday: 0,
          lastUpdated: 'Just now'
      }
      setLocations([...locations, newLoc])
      setIsModalOpen(false)
      toast.success(`${modalType === 'location' ? 'Location' : 'Property'} added successfully`)
  }

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900">Location Network</h1>
          <p className="text-muted-foreground mt-1 text-base font-medium">Monitor and optimize your parking facility network.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="relative w-64 hidden md:block">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                    placeholder="Search locations..." 
                    className="pl-12 h-12 rounded-2xl bg-white border-gray-100 shadow-sm font-medium focus:ring-2 focus:ring-primary/20"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button 
                onClick={() => handleOpenModal('location')}
                className="bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center gap-2 h-12 px-8 font-bold"
            >
                <Plus size={20} />
                <span>Add Location</span>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {filteredLocations.map((loc) => (
             <Card key={loc.id} className="group overflow-hidden border-none shadow-xl shadow-gray-200/50 hover:shadow-primary/10 transition-all duration-500 rounded-[2.5rem] bg-white">
                <div className={cn(
                    "h-3 w-full",
                    loc.status === 'active' ? "bg-emerald-500" : 
                    loc.status === 'full' ? "bg-primary" : "bg-red-500"
                )} />
                <CardHeader className="pb-4 px-8 pt-8">
                    <div className="flex justify-between items-start">
                        <div className="p-4 rounded-3xl bg-secondary/5 text-secondary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30">
                            <MapPin size={28} />
                        </div>
                        <Badge className={cn(
                            "rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-widest border-none shadow-sm",
                            loc.status === 'active' ? "bg-emerald-50 text-emerald-600" : 
                            loc.status === 'full' ? "bg-primary/10 text-primary" : "bg-red-50 text-red-600"
                        )}>
                            {loc.status}
                        </Badge>
                    </div>
                    <CardTitle className="mt-6 text-xl font-black tracking-tight text-slate-900">{loc.name}</CardTitle>
                    <CardDescription className="line-clamp-1 flex items-center gap-2 font-medium text-muted-foreground mt-1">
                        <ExternalLink size={14} className="text-primary/60" />
                        {loc.address}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-8">
                    <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                            <span className="flex items-center gap-2">
                                <TrafficCone size={16} className="text-primary" />
                                Occupancy Status
                            </span>
                            <span>{Math.round((loc.occupiedSpots / loc.totalSpots) * 100)}%</span>
                        </div>
                        <Progress value={(loc.occupiedSpots / loc.totalSpots) * 100} className="h-3 rounded-full bg-gray-100" />
                        <div className="flex justify-between text-[11px] text-muted-foreground font-bold pt-1 uppercase tracking-wider">
                            <span>{loc.occupiedSpots} Occupied</span>
                            <span>{loc.totalSpots} Total</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-secondary/5 p-4 rounded-3xl border border-secondary/5">
                            <div className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Revenue Today</div>
                            <div className="text-base font-black mt-1 text-slate-900">Rp {(loc.revenueToday/1000).toLocaleString()}k</div>
                        </div>
                        <div className="bg-primary/5 p-4 rounded-3xl border border-primary/5">
                            <div className="text-[10px] text-primary/40 uppercase font-black tracking-widest">Growth</div>
                            <div className="text-lg font-black text-emerald-600 mt-1 flex items-center">
                                <TrendingUp size={16} className="mr-1" />
                                +8.2%
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                            <Clock size={14} className="text-primary/60" />
                            Updated {loc.lastUpdated}
                         </div>
                         <Button variant="ghost" size="icon" className="h-10 w-10 rounded-2xl hover:bg-secondary/5 hover:text-secondary group-hover:translate-x-1 transition-transform">
                            <Settings2 size={20} />
                         </Button>
                    </div>
                </CardContent>
             </Card>
         ))}

         <button 
            onClick={() => handleOpenModal('property')}
            className="flex flex-col items-center justify-center gap-6 border-4 border-dashed border-gray-100 rounded-[2.5rem] p-12 hover:border-primary/40 hover:bg-primary/5 transition-all group min-h-[460px]"
         >
            <div className="p-6 rounded-full bg-gray-50 text-gray-300 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/30">
                <Plus size={48} />
            </div>
            <div className="text-center">
                <div className="font-black text-xl text-slate-900 group-hover:text-primary transition-colors">Add New Property</div>
                <p className="text-sm text-muted-foreground font-medium mt-2 max-w-[200px]">Initialize a new parking location or branch</p>
            </div>
         </button>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <Card className="w-full max-w-md border-none shadow-2xl rounded-[2.5rem] overflow-hidden animate-in zoom-in duration-300">
                  <CardHeader className={cn("text-white py-8 px-8", modalType === 'location' ? "bg-primary" : "bg-secondary")}>
                      <div className="flex justify-between items-center">
                          <CardTitle className="text-2xl font-black tracking-tight">
                              {modalType === 'location' ? 'New Location' : 'Add Property'}
                          </CardTitle>
                          <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="text-white hover:bg-white/20 rounded-full h-10 w-10">
                                <X size={24} />
                          </Button>
                      </div>
                  </CardHeader>
                  <CardContent className="p-8">
                      <form onSubmit={handleAddLocation} className="space-y-6">
                          <div className="space-y-2">
                              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Name</label>
                              <Input name="name" required placeholder="e.g. Yogyakarta Hub" className="h-14 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 font-bold" />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Address</label>
                              <Input name="address" required placeholder="Full address" className="h-14 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 font-bold" />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Total Spots</label>
                              <Input name="spots" type="number" defaultValue="100" className="h-14 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 font-bold" />
                          </div>
                          <Button 
                            type="submit" 
                            className={cn(
                                "w-full h-16 text-white rounded-2xl font-black text-xl shadow-xl transition-all mt-4",
                                modalType === 'location' ? "bg-primary shadow-primary/20 hover:bg-primary/90" : "bg-secondary shadow-secondary/20 hover:bg-secondary/90"
                            )}>
                              Create {modalType === 'location' ? 'Location' : 'Property'}
                          </Button>
                      </form>
                  </CardContent>
              </Card>
          </div>
      )}
    </div>
  )
}

