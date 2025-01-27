'use client'

import { Table, TableBody, TableCell, TableRow } from './ui/table'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { DatePickerWithRange } from './datapick'
import { truncateText } from '@/lib/truncateText'
import AddPayRec from './add-pay-rec'
import EditarPayRecDrawer from './editar-pay-rec-drawer'
import type { PayRecItem } from '@/app/types/RetornoFetch'
import type React from 'react'
import { useState } from 'react'

interface FinancasProps {
  dados: PayRecItem[]
  totalPay: number
  totalRec: number
  onDateChange: (ano: number, mes: number) => void
  onAddPayRec: (formData: FormData, tipo: string) => void
  onDelPayRec: (id: string, tipo: string) => Promise<void>
  onPutPayRec: (
    id: string,
    formData: FormData,
    tipo: string,
    date: Date
  ) => Promise<void>
  isLoading: boolean
}

export default function Financas({
  dados,
  totalPay,
  totalRec,
  onDateChange,
  onAddPayRec,
  onDelPayRec,
  onPutPayRec,
  isLoading,
}: FinancasProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [registroSelecionado, setRegistroSelecionado] =
    useState<PayRecItem | null>(null)

  // abrir drawer
  const handleRowClick = async (registro: PayRecItem) => {
    await setRegistroSelecionado(registro)
    await setIsDrawerOpen(true)
  }

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
    setRegistroSelecionado(null)
  }

  return (
    <div>
      <AddPayRec
        onAddPayRec={onAddPayRec}
        totalPay={totalPay}
        totalRec={totalRec}
      />

      <hr className="bg-white" />
      <DatePickerWithRange onDateChange={onDateChange} />
      <hr className="bg-white" />

      {isLoading ? (
        <div className="flex justify-center items-center text-center animate-ping">
          ...
        </div>
      ) : (
        <Table className="mt-4">
          <TableBody>
            {dados.map((item, index) => (
              <TableRow
                key={Number(index)}
                onClick={() => handleRowClick(item)}
                className={cn([
                  'transition-transform duration-3001 cursor-pointer hover:bg-muted/50',
                ])}
              >
                {/* <TableCell>{format(tra.date, 'dd/mm/yyyy')}</TableCell> */}
                <TableCell className=" w-2/3">
                  <div className="text-xs">
                    {format(item.date, 'dd/MM/yyyy')}
                  </div>
                  <div className="text-xl">{truncateText(item.text, 30)}</div>
                </TableCell>
                <TableCell
                  className={cn([
                    'text-end',
                    item.tipo === 'rec' ? 'text-purple-500' : 'text-red-600',
                    'w-1/3 ',
                  ])}
                >
                  {item.tipo === 'rec'
                    ? item.value.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : `- ${item.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <EditarPayRecDrawer
        registro={registroSelecionado}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onPutPayRec={onPutPayRec}
        onDelPayRec={onDelPayRec}
      />
    </div>
  )
}

// draggable
// onTouchStart={e => handleTouchStart(e, String(index))}
// onTouchMove={handleTouchMove}
// onTouchEnd={e => handleTouchEnd(e)}
// onDragStart={handleDragStart}
// onDragEnd={e => handleDragEnd(e, String(index))}

// const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>, id: string) => {
//   if (translateX === null) return

//   const dragDistance = e.clientX - translateX
//   if (dragDistance > 50) {
//     console.log('arrantou para direita', id)
//     seResultado(`Editar ${id}`)
//   }
//   if (dragDistance < -50) {
//     console.log('arrastou para esquerda', id)
//     seResultado(`Deletar ${id}`)
//   }
//   setTranslateX(null)
// }

// const handleTouchEnd = (e: React.TouchEvent<HTMLTableRowElement>) => {
//   if (translateX === null) return

//   if (translateX > 50) {
//     console.log('foi para direita')
//   }
//   if (translateX < -50) {
//     console.log('foi para esquerda')
//   }

//   setDraggingRow(null)
//   setTranslateX(null)
// }

// const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>) => {
//   setTranslateX(e.clientX)
// }

// const handleTouchStart = (
//   e: React.TouchEvent<HTMLTableRowElement>,
//   id: string
// ) => {
//   setDraggingRow(id)
//   setTranslateX(e.touches[0].clientX)
// }

// const handleTouchMove = (e: React.TouchEvent<HTMLTableRowElement>) => {
//   if (!draggingRow) return
//   const touch = e.touches[0]
//   setTranslateX(
//     touch.clientX - (e.target as HTMLElement).getBoundingClientRect().left
//   )
// }
