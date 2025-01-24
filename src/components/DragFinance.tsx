'use client'

import { format } from 'date-fns'
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './ui/drawer'
import { TableCell, TableRow } from './ui/table'

type transa = {
  id: number
  desc: string
  value: number
  date: Date
  tipo: string
}

export default function DragFinance({
  key,
  transa,
}: { key: number; transa: transa }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <TableCell>
          <TableRow
            key={Number(key)}
            className={'transition-transform duration-3001'}
          >
            <TableCell>{format(transa.date, 'dd/mm/yyyy')}</TableCell>
            <TableCell>{transa.desc}</TableCell>
            <TableCell className="text-end">{transa.value}</TableCell>
          </TableRow>
        </TableCell>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div>uai</div>
          <DrawerClose>
            <div>oi</div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
