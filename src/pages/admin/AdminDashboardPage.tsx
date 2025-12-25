import { useMemo } from 'react'
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Car,
  ChevronRight,
  Clock,
  Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useDateFilter } from '@/contexts/DateFilterContext'
import { DateRangePicker } from "@/components/common/DateRangePicker"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell 
} from 'recharts'

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { date } = useDateFilter();

  const rangeMultiplier = useMemo(() => {
    if (!date?.from || !date?.to) return 7;
    return Math.max(1, Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)));
  }, [date]);

  const stats = useMemo(() => ({
    revenue: (18.2 * rangeMultiplier).toFixed(1),
    vehicles: Math.floor(1245 * rangeMultiplier).toLocaleString(),
    upTime: "99.99%",
    avgSession: "2h 45m"
  }), [rangeMultiplier]);

  const revenueData = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      name: `Day ${i + 1}`,
      revenue: Math.floor((15 + Math.random() * 10) * (rangeMultiplier / 7) * 1000000)
    }));
  }, [rangeMultiplier]);

  const locationData = useMemo(() => [
    { name: 'Jakarta', value: 45 * rangeMultiplier, color: 'hsl(var(--primary))' },
    { name: 'Bandung', value: 32 * rangeMultiplier, color: 'hsl(var(--secondary))' },
    { name: 'Surakarta', value: 28 * rangeMultiplier, color: '#10b981' },
    { name: 'Yogyakarta', value: 38 * rangeMultiplier, color: '#f59e0b' },
  ], [rangeMultiplier]);

  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Global Overview</h1>
          <p className="text-muted-foreground mt-1 text-base">Real-time performance across all 4 metropolitan locations.</p>
        </div>
        <div className="flex items-center gap-4">
           <DateRangePicker className="w-full sm:w-[280px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Net Revenue" 
            value={`Rp ${stats.revenue}M`} 
            trend="+12.5%" 
            trendUp={true} 
            icon={<DollarSign className="text-secondary" size={20} />} 
            iconBg="bg-secondary/10"
        />
        <StatCard 
            title="Total Vehicles" 
            value={stats.vehicles} 
            trend="+5.2%" 
            trendUp={true} 
            icon={<Car className="text-primary" size={20} />} 
            iconBg="bg-primary/10"
        />
        <StatCard 
            title="Average Session" 
            value={stats.avgSession} 
            trend="-2.1%" 
            trendUp={false} 
            icon={<Clock className="text-primary" size={20} />} 
            iconBg="bg-primary/10"
        />
        <StatCard 
            title="System Uptime" 
            value={stats.upTime} 
            trend="Stable" 
            trendUp={true} 
            icon={<Activity className="text-secondary" size={20} />} 
            iconBg="bg-secondary/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden bg-white">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Revenue Growth</CardTitle>
                  <CardDescription>Network-wide revenue comparison</CardDescription>
                </div>
                <div className="p-2 bg-primary/10 rounded-xl">
                    <TrendingUp className="text-primary" size={20} />
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}}
                    tickFormatter={(value) => `Rp${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [`Rp ${Number(value || 0).toLocaleString()}`, 'Revenue']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorRev)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* City Performance */}
        <Card className="border-none shadow-xl shadow-gray-200/50 rounded-3xl overflow-hidden bg-white">
          <CardHeader>
             <CardTitle className="text-xl font-bold">Location Performance</CardTitle>
             <CardDescription>revenue share per region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis 
                            dataKey="name" 
                            type="category" 
                            axisLine={false} 
                            tickLine={false}
                            tick={{fill: '#475569', fontWeight: 600, fontSize: 13}}
                            width={80}
                        />
                        <Tooltip cursor={{fill: 'transparent'}} />
                        <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
                            {locationData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActionCard 
            title="User Management"
            desc="Control access rights and staff roles"
            icon={<Users className="text-primary" size={24} />}
            onClick={() => navigate('/admin/users')}
        />
        <QuickActionCard 
            title="Infrastructure"
            desc="Configure hardware and spot zones"
            icon={<MapPin className="text-primary" size={24} />}
            onClick={() => navigate('/admin/locations')}
        />
      </div>
    </div>
  )
}

function StatCard({ title, value, trend, trendUp, icon, iconBg }: any) {
  return (
    <Card className="border-none shadow-lg shadow-gray-100/50 rounded-3xl p-6 bg-white hover:translate-y-[-4px] transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className={cn("p-3 rounded-2xl", iconBg || "bg-primary/10")}>
          {icon}
        </div>
        <Badge variant="outline" className={cn(
            "rounded-full px-2 py-0 border-none font-bold text-[10px]",
            trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
        )}>
           {trendUp ? <TrendingUp size={10} className="mr-1 inline" /> : <TrendingDown size={10} className="mr-1 inline" />}
           {trend}
        </Badge>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-muted-foreground">{title}</h3>
        <div className="text-2xl font-bold mt-1 text-foreground">{value}</div>
      </div>
    </Card>
  )
}

function QuickActionCard({ title, desc, icon, onClick }: any) {
    return (
        <Card 
            className="group border-none shadow-xl shadow-gray-200/50 rounded-3xl p-6 bg-white cursor-pointer hover:bg-primary/5 transition-all duration-300"
            onClick={onClick}
        >
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gray-50 group-hover:bg-white transition-colors shadow-sm">
                    {icon}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground font-medium">{desc}</p>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-primary transition-all group-hover:translate-x-1" size={20} />
            </div>
        </Card>
    )
}
