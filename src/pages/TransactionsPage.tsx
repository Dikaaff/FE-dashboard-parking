import { DataTable } from "@/components/common/DataTable"
import { columns, type Transaction } from "../components/transactions/columns"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { downloadCSV } from "@/lib/export"

const data: Transaction[] = [
  { id: "1", plateNumber: "B 1234 ABC", vehicleType: "Car", entryTime: "2023-10-26 08:00", exitTime: "2023-10-26 10:00", status: "Paid", amount: 15000 },
  { id: "2", plateNumber: "B 5678 DEF", vehicleType: "Motorcycle", entryTime: "2023-10-26 08:15", exitTime: "2023-10-26 09:15", status: "Paid", amount: 2000 },
  { id: "3", plateNumber: "B 9012 GHI", vehicleType: "Car", entryTime: "2023-10-26 08:30", exitTime: "", status: "Unpaid", amount: 0 },
  { id: "4", plateNumber: "B 3456 JKL", vehicleType: "Motorcycle", entryTime: "2023-10-26 09:00", exitTime: "2023-10-26 12:00", status: "Paid", amount: 5000 },
  { id: "5", plateNumber: "B 7890 MNO", vehicleType: "Bicycle", entryTime: "2023-10-26 09:10", exitTime: "2023-10-26 09:40", status: "Paid", amount: 1000 },
  { id: "6", plateNumber: "D 1234 PQR", vehicleType: "Car", entryTime: "2023-10-26 09:30", exitTime: "", status: "Unpaid", amount: 0 },
  { id: "7", plateNumber: "B 5678 STU", vehicleType: "Motorcycle", entryTime: "2023-10-26 10:00", exitTime: "2023-10-26 11:30", status: "Paid", amount: 3000 },
  { id: "8", plateNumber: "AB 9012 VWX", vehicleType: "Car", entryTime: "2023-10-26 10:15", exitTime: "2023-10-26 14:15", status: "Paid", amount: 35000 },
  { id: "9", plateNumber: "B 3456 YZ", vehicleType: "Motorcycle", entryTime: "2023-10-26 10:30", exitTime: "", status: "Unpaid", amount: 0 },
  { id: "10", plateNumber: "B 1111 AA", vehicleType: "Car", entryTime: "2023-10-26 11:00", exitTime: "2023-10-26 13:00", status: "Paid", amount: 15000 },
  { id: "11", plateNumber: "B 2222 BB", vehicleType: "Motorcycle", entryTime: "2023-10-26 11:15", exitTime: "2023-10-26 11:45", status: "Paid", amount: 2000 },
]

export default function TransactionsPage() {
  const handleExport = () => {
    downloadCSV(data, "transactions-" + new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-bold tracking-tight text-primary">Transaction History</h2>
           <p className="text-muted-foreground">Monitor real-time parking transactions.</p>
        </div>
        <div className="flex items-center gap-2">
           <Button onClick={handleExport} className="gap-2 bg-primary text-white hover:bg-primary/90 shadow-md">
              <Download size={16} />
              Export to Excel
           </Button>
        </div>
      </div>

      <DataTable columns={columns} data={data} searchKey="plateNumber" />
    </div>
  )
}
