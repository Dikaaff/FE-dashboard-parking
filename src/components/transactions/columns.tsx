import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type Transaction = {
  id: string
  plateNumber: string
  vehicleType: "Motorcycle" | "Car" | "Bicycle"
  entryTime: string
  exitTime: string
  status: "Paid" | "Unpaid"
  amount: number
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "plateNumber",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="pl-0 hover:bg-transparent"
          >
            Plate Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => <div className="font-mono font-medium">{row.getValue("plateNumber")}</div>,
  },
  {
    accessorKey: "vehicleType",
    header: "Vehicle Type",
  },
  {
    accessorKey: "entryTime",
    header: "Entry Time",
  },
  {
    accessorKey: "exitTime",
    header: "Exit Time",
    cell: ({ row }) => {
       const val = row.getValue("exitTime") as string;
       return val || "-"
    }
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge variant={status === "Paid" ? "default" : "destructive"} className={status === "Paid" ? "bg-green-600 hover:bg-green-700 text-white" : ""}>
            {status}
        </Badge>
      )
    }
  },
]
