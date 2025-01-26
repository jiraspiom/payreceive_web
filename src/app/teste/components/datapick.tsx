'use client'

import * as React from 'react'
import { format, addMonths, subMonths } from 'date-fns'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onDateChange: (year: number, month: number) => void
}

export function DatePickerWithRange({
  className,
  onDateChange,
}: DatePickerWithRangeProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const handlePreviousMonth = () => {
    const newDate = subMonths(currentMonth, 1)
    setCurrentMonth(newDate)
    onDateChange(newDate.getFullYear(), newDate.getMonth() + 1)
  }

  const handleNextMonth = () => {
    const newDate = addMonths(currentMonth, 1)
    setCurrentMonth(newDate)
    onDateChange(newDate.getFullYear(), newDate.getMonth() + 1)
  }

  React.useEffect(() => {
    onDateChange(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
  }, [currentMonth]) // Added currentMonth to dependencies

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn('w-[200px] justify-center text-center font-normal')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(currentMonth, 'yyyy / MMM').toUpperCase()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="center">
          <div className="font-semibold text-center">
            {format(currentMonth, 'yyyy / MMM').toUpperCase()}
          </div>
        </PopoverContent>
      </Popover>
      <Button variant="outline" size="icon" onClick={handleNextMonth}>
        <ChevronRightIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}
