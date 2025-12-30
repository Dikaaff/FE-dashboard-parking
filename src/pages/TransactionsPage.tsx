import { DataTable } from "@/components/common/DataTable"
import { columns, type Transaction } from "../components/transactions/columns"
import { Button } from "@/components/ui/button"
import { Download, Car, Bike, Clock } from "lucide-react"
import { downloadCSV } from "@/lib/export"
import { DateRangePicker } from "@/components/common/DateRangePicker"
import { useDateFilter } from "@/contexts/DateFilterContext"
import { useMemo } from "react"
import { format, subDays, subHours, subMinutes, isWithinInterval, parse } from "date-fns"
import { Badge } from "@/components/ui/badge"
import type { Row } from "@tanstack/react-table"

const today = new Date();
const dateStr = (days: number, hours: number, minutes: number = 0) =>
  format(subMinutes(subHours(subDays(today, days), hours), minutes), "yyyy-MM-dd HH:mm");

// Hardcoded dummy data for testing
const allData: Transaction[] = [
  {
    id: "1",
    plateNumber: "B 1234 CD",
    vehicleType: "Car",
    entryTime: dateStr(0, 2, 0), // Today, 2 hours ago
    exitTime: dateStr(0, 1, 0), // Today, 1 hour ago
    status: "Paid",
    amount: 15000
  },
  {
    id: "2",
    plateNumber: "D 5678 EF",
    vehicleType: "Motorcycle",
    entryTime: dateStr(0, 4, 30), // Today, 4.5 hours ago
    exitTime: "", // Still parked
    status: "Unpaid",
    amount: 0
  },
  {
    id: "3",
    plateNumber: "AD 9012 GH",
    vehicleType: "Bicycle",
    entryTime: dateStr(0, 1, 15), // Today, 1.25 hours ago
    exitTime: dateStr(0, 0, 15), // Today, 15 mins ago
    status: "Paid",
    amount: 2000
  }
];

export default function TransactionsPage() {
  const { date } = useDateFilter()

  const filteredData = useMemo(() => {
    if (!date?.from || !date?.to) return allData;

    return allData.filter((item) => {
      try {
        const itemDate = parse(item.entryTime, "yyyy-MM-dd HH:mm", new Date());
        return isWithinInterval(itemDate, { start: date.from!, end: date.to! });
      } catch (e) {
        return true;
      }
    });
  }, [date]);

  const handleExport = () => {
    downloadCSV(filteredData, "transactions-" + new Date().toISOString().split('T')[0]);
  };

  const renderMobileCard = (row: Row<Transaction>) => {
    const t = row.original;
    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(t.amount);

    return (
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div className="flex items-start justify-between border-b border-dashed border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${t.vehicleType === 'Car' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
              {t.vehicleType === 'Car' ? <Car size={20} /> : <Bike size={20} />}
            </div>
            <div>
              <div className="font-black text-lg text-slate-900 tracking-tight">{t.plateNumber}</div>
              <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                {t.vehicleType}
              </div>
            </div>
          </div>
          <Badge variant={t.status === "Paid" ? "default" : "destructive"} className={`rounded-lg px-2.5 py-1 ${t.status === "Paid" ? "bg-emerald-500 hover:bg-emerald-600" : ""}`}>
            {t.status}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={12} /> Entry Time
            </div>
            <div className="font-bold text-slate-700 text-sm">{t.entryTime}</div>
          </div>
          <div className="space-y-1 text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1.5">
              <Clock size={12} /> Exit Time
            </div>
            <div className="font-bold text-slate-700 text-sm">{t.exitTime || "-"}</div>
          </div>
        </div>

        <div className="pt-3 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-medium">Total Amount</div>
          <div className="text-xl font-black text-slate-900">{formattedAmount}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500 pb-20">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Transaction History</h2>
          <p className="text-muted-foreground mt-1">Monitor real-time parking transactions and revenue.</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full sm:w-auto">
          <DateRangePicker className="w-full sm:w-[280px]" />
          <Button
            onClick={handleExport}
            className="gap-2 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 h-12 rounded-xl px-6 w-full sm:w-auto font-bold"
          >
            <Download size={18} />
            Export
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        searchKey="plateNumber"
        renderMobileCard={renderMobileCard}
      />
    </div>
  )
}
