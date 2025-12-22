import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { VehicleChart } from '@/components/dashboard/VehicleChart'
import { UserSegmentationChart } from '@/components/dashboard/UserSegmentationChart'
import { IncomeChart } from '@/components/dashboard/IncomeChart'
import { DurationChart } from '@/components/dashboard/DurationChart'
import { HourlyTrendChart } from '@/components/dashboard/HourlyTrendChart'

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { downloadCSV, generateDashboardReport } from "@/lib/export"

import { useDateFilter } from '@/contexts/DateFilterContext'
import { useMemo } from 'react'

import { DateRangePicker } from "@/components/common/DateRangePicker"

const DashboardPage = () => {
  const { date } = useDateFilter()

  // Simulate data changing based on date range
  const dashboardData = useMemo(() => {
    // Seed or simple randomizer based on date strings to make it consistent for same dates
    const seed = date?.from ? date.from.getDate() + date.from.getMonth() * 100 + date.from.getFullYear() : 1;
    const rangeMultiplier = date && date.to && date.from 
        ? Math.max(1, Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)))
        : 1;


    // Let's make it simple: consistent randomization
    return {
        summary: {
            revenue: 12500000 * rangeMultiplier,
            transactions: 2450 * rangeMultiplier,
            occupancy: Math.min(100, 85 + (seed % 10)),
            occupiedSpaces: Math.min(200, 170 + (seed % 30))
        },
        income: [
            { name: 'Cash', value: 4500000 * rangeMultiplier },
            { name: 'Cashless', value: 8500000 * rangeMultiplier },
            { name: 'QRIS', value: 6200000 * rangeMultiplier },
        ],
        hourly: [
            { time: '06:00', vehicles: 20 + (seed % 10) },
            { time: '08:00', vehicles: 120 + (seed % 20) },
            { time: '10:00', vehicles: 180 + (seed % 30) },
            { time: '12:00', vehicles: 150 + (seed % 20) },
            { time: '14:00', vehicles: 160 + (seed % 25) },
            { time: '16:00', vehicles: 190 + (seed % 10) },
            { time: '18:00', vehicles: 140 + (seed % 15) },
            { time: '20:00', vehicles: 80 + (seed % 10) },
            { time: '22:00', vehicles: 30 + (seed % 5) },
        ],
        vehicle: [
            { name: 'Motorcycles', value: 65, color: 'hsl(var(--primary))' },
            { name: 'Cars', value: 30 + (seed % 5), color: 'hsl(var(--secondary))' },
            { name: 'Bicycles', value: 5 + (seed % 2), color: 'hsl(var(--muted-foreground))' },
        ],
        segmentation: [
             { name: 'Casual Users', value: 45 + (seed % 10), color: 'hsl(var(--secondary))' }, 
             { name: 'Members', value: 55 - (seed % 10), color: 'hsl(var(--primary))' }, 
        ],
        duration: [
            { name: '0-1 Hours', value: 120 * rangeMultiplier },
            { name: '1-3 Hours', value: 85 * rangeMultiplier },
            { name: '3-6 Hours', value: 45 * rangeMultiplier },
            { name: '> 6 Hours', value: 30 * rangeMultiplier },
        ]
    }
  }, [date])


  const handleDownload = () => {
    const data = generateDashboardReport();
    let filename = "parking-report";
    if (date?.from) {
        // Format as YYYY-MM-DD
        const fromStr = date.from.toISOString().split('T')[0];
        filename += `-${fromStr}`;
        if (date.to) {
            const toStr = date.to.toISOString().split('T')[0];
            filename += `-to-${toStr}`;
        }
    } else {
        filename += `-${new Date().toISOString().split('T')[0]}`;
    }
    
    downloadCSV(data, filename);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h2>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-12 w-full sm:w-auto">
            <DateRangePicker className="w-full sm:w-[280px]" />
            <Button onClick={handleDownload} className="bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto h-12 px-10 text-sm font-semibold rounded-2xl">
                <Download className="mr-3 h-5 w-5" />
                Download Report
            </Button>
        </div>
      </div>
      
      <SummaryCards data={dashboardData.summary} />
      
      {/* Overview Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold tracking-tight text-foreground">Overview</h3>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-1 md:col-span-2 lg:col-span-4 h-full">
             <IncomeChart data={dashboardData.income} />
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3 h-full">
             <HourlyTrendChart data={dashboardData.hourly} />
          </div>
        </div>
      </div>

       {/* Details Section */}
       <div className="space-y-4">
         <h3 className="text-xl font-bold tracking-tight text-foreground">Insights & Demographics</h3>
         <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-1 h-full">
             <VehicleChart data={dashboardData.vehicle} />
          </div>
          <div className="col-span-1 h-full">
              <UserSegmentationChart data={dashboardData.segmentation} />
          </div>
          <div className="col-span-1 h-full">
              <DurationChart data={dashboardData.duration} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
