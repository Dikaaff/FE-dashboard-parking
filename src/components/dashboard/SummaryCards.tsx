import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Car, CreditCard } from "lucide-react"

interface SummaryCardsProps {
  data: {
    revenue: number
    transactions: number
    occupancy: number
    occupiedSpaces: number
  }
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="bg-card border-none shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Revenue
          </CardTitle>
          <div className="p-2 bg-primary/10 rounded-full">
            <CreditCard className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(data.revenue)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-emerald-500 font-medium">+20.1%</span> from last period
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-none shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Transactions
          </CardTitle>
          <div className="p-2 bg-secondary/10 rounded-full">
            <Activity className="h-5 w-5 text-secondary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatNumber(data.transactions)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-emerald-500 font-medium">+15%</span> from last period
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-none shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Current Occupancy
          </CardTitle>
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Car className="h-5 w-5 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{data.occupancy}%</div>
          <div className="w-full bg-slate-100 h-2 mt-3 rounded-full overflow-hidden">
             <div className="bg-primary h-full rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" style={{ width: `${data.occupancy}%` }} />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {data.occupiedSpaces} / 200 Occupied
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
