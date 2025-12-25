import { DataTable } from "@/components/common/DataTable"
import { columns, type Transaction } from "../components/transactions/columns"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { downloadCSV } from "@/lib/export"
import { DateRangePicker } from "@/components/common/DateRangePicker"
import { useDateFilter } from "@/contexts/DateFilterContext"
import { useMemo } from "react"
import { format, subDays, subHours, isWithinInterval, parse } from "date-fns"

const today = new Date();
const dateStr = (days: number, hours: number) => format(subHours(subDays(today, days), hours), "yyyy-MM-dd HH:mm");

const allData: Transaction[] = [
  { id: "1", plateNumber: "B 1234 ABC", vehicleType: "Car", entryTime: dateStr(0, 5), exitTime: dateStr(0, 3), status: "Paid", amount: 15000 },
  { id: "2", plateNumber: "B 5678 DEF", vehicleType: "Motorcycle", entryTime: dateStr(0, 4), exitTime: dateStr(0, 3), status: "Paid", amount: 2000 },
  { id: "3", plateNumber: "B 9012 GHI", vehicleType: "Car", entryTime: dateStr(0, 4), exitTime: "", status: "Unpaid", amount: 0 },
  { id: "4", plateNumber: "B 3456 JKL", vehicleType: "Motorcycle", entryTime: dateStr(1, 4), exitTime: dateStr(1, 1), status: "Paid", amount: 5000 },
  { id: "5", plateNumber: "B 7890 MNO", vehicleType: "Bicycle", entryTime: dateStr(1, 3), exitTime: dateStr(1, 2), status: "Paid", amount: 1000 },
  { id: "6", plateNumber: "D 1234 PQR", vehicleType: "Car", entryTime: dateStr(2, 6), exitTime: "", status: "Unpaid", amount: 0 },
  { id: "7", plateNumber: "B 5678 STU", vehicleType: "Motorcycle", entryTime: dateStr(2, 5), exitTime: dateStr(2, 3), status: "Paid", amount: 3000 },
  { id: "8", plateNumber: "AB 9012 VWX", vehicleType: "Car", entryTime: dateStr(3, 8), exitTime: dateStr(3, 4), status: "Paid", amount: 35000 },
  { id: "9", plateNumber: "B 3456 YZ", vehicleType: "Motorcycle", entryTime: dateStr(3, 7), exitTime: "", status: "Unpaid", amount: 0 },
  { id: "10", plateNumber: "B 1111 AA", vehicleType: "Car", entryTime: dateStr(4, 2), exitTime: dateStr(4, 1), status: "Paid", amount: 15000 },
  { id: "11", plateNumber: "B 2222 BB", vehicleType: "Motorcycle", entryTime: dateStr(5, 5), exitTime: dateStr(5, 4), status: "Paid", amount: 2000 },
]

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

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
           <h2 className="text-3xl font-bold tracking-tight text-primary">Transaction History</h2>
           <p className="text-muted-foreground">Monitor real-time parking transactions.</p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center w-full sm:w-auto">
            <DateRangePicker className="w-full sm:w-[280px]" />
            <Button 
                onClick={handleExport} 
                className="gap-2 bg-primary text-white hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 h-12 rounded-2xl px-6 w-full sm:w-auto font-semibold"
            >
               <Download size={18} />
               Export to Excel
            </Button>
        </div>
      </div>

      <DataTable columns={columns} data={filteredData} searchKey="plateNumber" />
    </div>
  )
}
