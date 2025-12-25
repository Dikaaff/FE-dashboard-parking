import * as React from "react"
import { MapPin, Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const locations = [
  "Yogyakarta",
  "Bandung",
  "Jakarta Selatan",
  "Surakarta"
]

export function LocationSelector() {
  const [selectedLocation, setSelectedLocation] = React.useState(locations[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-medium border-border/40 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 h-12 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/30 px-3 md:min-w-[160px] w-auto"
          )}
        >
          <div className="bg-primary/10 p-1 rounded-md md:mr-2">
            <MapPin className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="hidden md:block flex-1 truncate text-sm font-semibold text-foreground tracking-tight">
            {selectedLocation}
          </span>
          <span className="block md:hidden text-xs font-semibold text-foreground truncate max-w-[80px]">
            {selectedLocation.split(' ')[0]}
          </span>
          <ChevronDown className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground/60 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] border-none bg-white/95 backdrop-blur-sm p-2 z-[100]">
        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Select Location
        </div>
        {locations.map((location) => (
          <DropdownMenuItem
            key={location}
            onClick={() => setSelectedLocation(location)}
            className={cn(
              "flex items-center justify-between cursor-pointer rounded-lg px-3 py-2 focus:bg-primary/10 focus:text-primary transition-colors mb-0.5 last:mb-0",
              selectedLocation === location ? "bg-primary/5 text-primary font-medium" : "text-foreground"
            )}
          >
            <span className="text-sm">{location}</span>
            {selectedLocation === location && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
