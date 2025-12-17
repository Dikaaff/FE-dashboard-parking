import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const formatCurrency = (value: number | undefined) => 
  value === undefined ? "" : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 3 }).format(value)

interface IncomeChartProps {
    data: { name: string; value: number }[]
}

export function IncomeChart({ data }: IncomeChartProps) {
  return (
    <Card className="col-span-1 lg:col-span-2 border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Income Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 14, fill: '#64748B'}} axisLine={false} tickLine={false} />
              <Tooltip 
                formatter={(value: any) => formatCurrency(value)}
                cursor={{fill: 'transparent'}}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
               <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={40}>
                 {data.map((_, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 0 ? 'hsl(var(--primary))' : index === 1 ? 'hsl(var(--secondary))' : 'hsl(var(--primary) / 0.5)'} 
                    />
                 ))}
               </Bar>
         </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
