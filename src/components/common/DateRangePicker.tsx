import * as React from "react"
import { addDays, format, startOfMonth, endOfMonth, startOfYear, subMonths, subDays, startOfWeek, endOfWeek, subWeeks } from "date-fns"
import { Calendar as CalendarIcon, Check } from "lucide-react"
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

  const handleCancel = () => {
    setIsOpen(false)
  }
  
  const presets = [
    {
        label: 'Today',
        getValue: () => {
            const today = new Date();
            return { from: today, to: today };
        }
    },
    {
        label: 'Yesterday',
        getValue: () => {
            const today = new Date();
            const yesterday = subDays(today, 1);
            return { from: yesterday, to: yesterday };
        }
    },
    {
        label: 'This Week',
        getValue: () => {
            const today = new Date();
            return { from: startOfWeek(today), to: endOfWeek(today) };
        }
    },
    {
        label: 'Last Week',
        getValue: () => {
            const today = new Date();
            const lastWeek = subWeeks(today, 1);
            return { from: startOfWeek(lastWeek), to: endOfWeek(lastWeek) };
        }
    },
    {
        label: 'This Month',
        getValue: () => {
            const today = new Date();
            return { from: startOfMonth(today), to: endOfMonth(today) };
        }
    },
    {
        label: 'Last Month',
        getValue: () => {
             const today = new Date();
             const lastMonth = subMonths(today, 1);
             return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
        }
    },
    {
        label: 'This Year',
        getValue: () => {
             const today = new Date();
             return { from: startOfYear(today), to: today };
        }
    }
  ];

  const handlePresetSelect = (preset: { getValue: () => DateRange }) => {
      setTempDate(preset.getValue());
  }

  // Check if a preset is selected
  const isPresetSelected = (preset: { getValue: () => DateRange }) => {
      const pVal = preset.getValue();
      if (!tempDate?.from || !tempDate?.to || !pVal.from || !pVal.to) return false;
      
      return tempDate.from.toDateString() === pVal.from.toDateString() && 
             tempDate.to.toDateString() === pVal.to.toDateString();
  }

  return (
    <div className={cn(className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-medium border-border/40 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 h-12 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30",
              !date && "text-muted-foreground"
            )}
          >
            <div className="bg-primary/10 p-1.5 rounded-lg mr-3">
                <CalendarIcon className="h-4 w-4 text-primary" />
            </div>
            {date?.from ? (
              date.to ? (
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-foreground tracking-tight">{format(date.from, "MMM dd, y")}</span>
                  <span className="text-muted-foreground/60 font-light">→</span>
                  <span className="font-semibold text-foreground tracking-tight">{format(date.to, "MMM dd, y")}</span>
                </div>
              ) : (
                format(date.from, "MMM dd, y")
              )
            ) : (
              <span className="text-muted-foreground/80">Pick a date range</span>
            )}

          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white dark:bg-slate-950 border border-border rounded-xl shadow-2xl z-50" align="end">
          <div className="flex flex-col sm:flex-row max-h-[80vh] overflow-auto sm:overflow-visible">
              {/* Presets Sidebar */}
              <div className="flex flex-col gap-1 p-3 border-b sm:border-b-0 sm:border-r border-border/50 bg-slate-50/50 min-w-[160px]">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2 px-2">Presets</h4>
                  {presets.map((preset) => (
                      <Button
                        key={preset.label}
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePresetSelect(preset)}
                        className={cn(
                            "justify-start text-sm font-normal",
                            isPresetSelected(preset) 
                                ? "bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary font-medium" 
                                : "hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}
                      >
                        {isPresetSelected(preset) && <Check className="mr-2 h-3.5 w-3.5" />}
                        {!isPresetSelected(preset) && <div className="w-5.5" />} {/* Spacer to align text if no icon */}
                        {preset.label}
                      </Button>
                  ))}
              </div>

              {/* Calendar Area */}
              <div className="p-0">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={tempDate?.from}
                    selected={tempDate}
                    onSelect={setTempDate}
                    numberOfMonths={2}
                    className="p-3 border-0 shadow-none rounded-none" 
                    classNames={{
                        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/5 rounded-md transition-colors focus:bg-primary/5 focus:text-accent-foreground",
                        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
                        day_today: "bg-accent/50 text-accent-foreground",
                        day_outside: "text-muted-foreground opacity-50",
                        day_range_middle: "aria-selected:bg-primary/10 aria-selected:text-primary rounded-none",
                        day_range_end: "aria-selected:bg-primary aria-selected:text-primary-foreground rounded-r-md rounded-l-none",
                        day_range_start: "aria-selected:bg-primary aria-selected:text-primary-foreground rounded-l-md rounded-r-none", 
                    }}
                />
                
                 {/* Footer Actions */}
                <div className="flex items-center justify-between p-3 border-t border-border/50 bg-white">
                    <p className="text-xs text-muted-foreground">
                        {tempDate?.from ? (
                            <>
                                {format(tempDate.from, "MMM dd, yyyy")} 
                                {tempDate.to && ` - ${format(tempDate.to, "MMM dd, yyyy")}`}
                            </>
                        ) : (
                            "Select a range"
                        )}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={handleCancel} className="h-8">
                            Cancel
                        </Button>
                        <Button size="sm" onClick={handleCreate} className="h-8 bg-primary hover:bg-primary/90">
                            Apply
                        </Button>
                    </div>
                </div>
              </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

