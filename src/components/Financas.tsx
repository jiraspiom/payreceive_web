'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { Input } from './ui/input'
import { format } from 'date-fns'
import type React from 'react'
import { useState } from 'react'

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from './ui/drawer'
import { cn } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from '@radix-ui/react-toast'

import { DatePickerWithRange } from './datapick'
import { truncateText } from '@/lib/truncateText'
import type { PayRecItem } from '@/app/types/RetornoFetch'
import AddPayRec from './add-pay-rec'

interface FinancasProps {
  dados: PayRecItem[]
  totalPay: number
  totalRec: number
  onDateChange: (ano: number, mes: number) => void
  onAddPayRec: (formData: FormData, acao: string) => void
  onDelPayRec: (id: string, tipo: string) => Promise<void>
  isLoading: boolean
}

export default function Financas({
  dados,
  totalPay,
  totalRec,
  onDateChange,
  onAddPayRec,
  onDelPayRec,
  isLoading,
}: FinancasProps) {
  const { toast } = useToast()

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<PayRecItem | null>(null)

  // abrir drawer
  const handleRowClick = async (transacao: PayRecItem) => {
    await setSelected(transacao)
    await setIsOpen(true)
  }

  const handleDelete = async (id: string, tipo: string) => {
    try {
      await onDelPayRec(id, tipo)

      toast({
        title: 'Deleted',
        description: 'Transaction deleted successfully',
        variant: 'secondary',
        action: (
          <ToastAction
            onClick={() => console.log('deletando')}
            altText="Desfazer delete"
          >
            Undo
          </ToastAction>
        ),
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Erro',
          description: `Erro ao deletar ${tipo} ${error.message}`,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Erro',
          description: `Erro ao deletar ${tipo}`,
          variant: 'destructive',
        })
      }
    }
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
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="w-10">date</TableHead> */}
              <TableHead className="w-3/3" />
              {/* <TableHead className="w-1/3 text-center">$</TableHead> */}
            </TableRow>
          </TableHeader>
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

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          {selected && (
            <>
              <DrawerHeader>
                <DrawerTitle>Details of {selected?.tipo}</DrawerTitle>
                <DrawerDescription>
                  Edit or Delete your {selected?.tipo}.
                </DrawerDescription>
              </DrawerHeader>

              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <strong>Data:</strong>
                  {format(selected.date, 'dd/MM/yyyy').toString()}
                  <DrawerClose asChild>
                    <Button
                      onClick={() => handleDelete(selected.id, selected.tipo)}
                      variant={'destructive'}
                    >
                      <Trash />
                    </Button>
                  </DrawerClose>
                </div>
                <p>
                  <strong>des:</strong> {selected.text}
                </p>
                <div className="flex justify-between">
                  <div>
                    <strong>value: </strong> {selected.value}
                  </div>
                  {/* <Button
                    onClick={() => DeletePayRec(selected.id, selected.tipo)}
                    variant={'secondary'}
                  >
                    <Pencil />
                  </Button> */}
                </div>
              </div>
            </>
          )}
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Fechar</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
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
