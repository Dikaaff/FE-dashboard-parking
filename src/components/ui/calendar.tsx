import * as React from "react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 bg-white rounded-xl shadow-lg border border-border", className)} // Refined Container
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4", // Removed w-full, reduced spacing
        
        caption: "flex justify-center pt-1 relative items-center mb-4", // Reduced margin
        caption_label: "text-sm font-semibold text-foreground", // Smaller, cleaner font
        
        nav: "space-x-1 flex items-center", // Simple flex
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100" // Smaller, subtler nav buttons
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        
        table: "w-full border-collapse space-y-1",
        head_row: "grid grid-cols-7 mb-1", 
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] flex items-center justify-center",
        
        row: "grid grid-cols-7 mt-2 w-full",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 flex items-center justify-center",
        
        day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground transition-all duration-200 ease-in-out"
        ),
        day_range_end: "day-range-end",
        
        day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", // Standard Primary
            
        day_today: "bg-accent text-accent-foreground",
        
        day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
            
        day_hidden: "invisible",
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
