import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useDateFilter } from "@/contexts/DateFilterContext"

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { date, setDate } = useDateFilter()
  const [tempDate, setTempDate] = React.useState<DateRange | undefined>(date)
  const [isOpen, setIsOpen] = React.useState(false)

  // Reset tempDate when popover opens
  React.useEffect(() => {
    if (isOpen) {
        setTempDate(date)
    }
  }, [isOpen, date])

  const handleCreate = () => {
    setDate(tempDate)
    setIsOpen(false)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={tempDate?.from}
            selected={tempDate}
            onSelect={setTempDate}
            numberOfMonths={2}
          />
          <div className="flex items-center justify-end gap-2 p-3 border-t bg-slate-50/50">
             <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                Cancel
             </Button>
             <Button size="sm" onClick={handleCreate} className="bg-primary text-primary-foreground hover:bg-primary/90">
                Apply
             </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
