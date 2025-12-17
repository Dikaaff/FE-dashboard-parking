import React, { createContext, useContext, useState } from "react"
import type { DateRange } from "react-day-picker"
import { addDays } from "date-fns"

interface DateFilterContextType {
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

const DateFilterContext = createContext<DateFilterContextType | undefined>(undefined)

export function DateFilterProvider({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <DateFilterContext.Provider value={{ date, setDate }}>
      {children}
    </DateFilterContext.Provider>
  )
}

export function useDateFilter() {
  const context = useContext(DateFilterContext)
  if (context === undefined) {
    throw new Error("useDateFilter must be used within a DateFilterProvider")
  }
  return context
}
