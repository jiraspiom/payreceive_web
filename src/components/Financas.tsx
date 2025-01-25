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
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

type dr = {
  id: number
  desc: string
  value: number
  date: Date
}

const despesas: dr[] = [
  {
    id: 1,
    desc: 'primeiro carinha aqui que nao sei o que e',
    value: 55,
    date: new Date('2023-02-01T00:00:00.000Z'),
  },
  {
    id: 2,
    desc: 'segundo',
    value: 11,
    date: new Date('2020-01-01T00:00:00.000Z'),
  },
  {
    id: 3,
    desc: 'terce',
    value: 1,
    date: new Date('2020-01-03T00:00:00.000Z'),
  },
  {
    id: 4,
    desc: 'terce',
    value: 31,
    date: new Date('2020-01-06T00:00:00.000Z'),
  },
  {
    id: 5,
    desc: 'salario',
    value: 500,
    date: new Date('2020-06-11T00:00:00.000Z'),
  },
  {
    id: 6,
    desc: 'terce',
    value: 31,
    date: new Date('2020-01-06T00:00:00.000Z'),
  },
  {
    id: 7,
    desc: 'salario',
    value: 500,
    date: new Date('2020-01-11T00:00:00.000Z'),
  },
  {
    id: 8,
    desc: 'terce',
    value: 31,
    date: new Date('2020-01-06T00:00:00.000Z'),
  },
  {
    id: 9,
    desc: 'salario',
    value: 500,
    date: new Date('2020-01-11T00:00:00.000Z'),
  },
  {
    id: 10,
    desc: 'terce',
    value: 31,
    date: new Date('2020-01-06T00:00:00.000Z'),
  },
  {
    id: 11,
    desc: 'salario',
    value: 500,
    date: new Date('2020-01-11T00:00:00.000Z'),
  },
  {
    id: 12,
    desc: 'terce',
    value: 31,
    date: new Date('2020-01-06T00:00:00.000Z'),
  },
  {
    id: 13,
    desc: 'salario',
    value: 500,
    date: new Date('2022-01-11T00:00:00.000Z'),
  },
]

const receitas: dr[] = [
  {
    id: 1,
    desc: 'salario',
    value: 5000,
    date: new Date('2020-01-01T00:00:00.000Z'),
  },
  {
    id: 2,
    desc: 'decimo 3',
    value: 1100,
    date: new Date('2023-01-15T00:00:00.000Z'),
  },
]

type TransationProps = {
  id: number
  desc: string
  value: number
  date: Date
  tipo: string
}

export default function Financas() {
  const [mesBusca, setMesBusca] = useState(0)

  const cDate = new Date()
  const mesuai = navigationMes(cDate.getMonth(), cDate.getFullYear(), mesBusca)

  const next = () => {
    setMesBusca(mesBusca + 1)
  }

  const prev = () => {
    setMesBusca(mesBusca - 1)
  }

  const transacoes = [
    ...despesas.map(despesa => ({
      id: despesa.id,
      desc: despesa.desc,
      value: despesa.value,
      date: despesa.date,
      tipo: 'despesa',
    })),
    ...receitas.map(receita => ({
      id: receita.id,
      desc: receita.desc,
      value: receita.value,
      date: receita.date,
      tipo: 'receita',
    })),
  ]

  const transacoesby = transacoes.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<TransationProps | null>(null)

  const handleRowClick = (transacao: TransationProps) => {
    setSelected(transacao)
    setIsOpen(true)
  }

  return (
    <div>
      <form className="space-y-4 mb-6">
        <div className="flex justify-between mt-2 gap-4">
          <div className="flex items-center w-full ">
            <Button type="button" variant={'destructive'} className="w-full">
              <Label>PAY 500,00</Label>
            </Button>
          </div>
          <div className="flex items-center w-full ">
            <Button type="button" className="w-full">
              <Label>REC 5000,00</Label>
            </Button>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-8/12">
            <Input required placeholder="Description" />
          </div>
          <div className="w-4/12">
            <Input required placeholder="value" />
          </div>
        </div>
      </form>
      <hr className="bg-white" />
      <div className="flex justify-between">
        <Button onClick={() => prev()}>
          <ChevronLeft />
        </Button>
        <div
          className="flex text-center items-center"
          onClick={() => setMesBusca(0)}
          onKeyDown={() => {}}
        >
          {mesuai.name} / {mesuai.year}
        </div>
        <Button onClick={() => next()}>
          <ChevronRight />
        </Button>
      </div>
      <hr className="bg-white" />
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead className="w-10">date</TableHead> */}
            <TableHead>desciption</TableHead>
            <TableHead>$</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transacoesby.map((tra, index) => (
            <TableRow
              key={Number(index)}
              onClick={() => handleRowClick(tra)}
              className={cn([
                'transition-transform duration-3001 cursor-pointer hover:bg-muted/50',
              ])}
            >
              {/* <TableCell>{format(tra.date, 'dd/mm/yyyy')}</TableCell> */}
              <TableCell>
                <div className="text-xs">{format(tra.date, 'dd/MM/yyyy')}</div>
                <div className="text-xl">{truncateText(tra.desc, 30)}</div>
              </TableCell>
              <TableCell
                className={cn([
                  'text-end',
                  tra.tipo === 'receita' ? 'text-purple-500' : 'text-red-600',
                ])}
              >
                {tra.tipo === 'receita' ? tra.value : `- ${tra.value}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Details of {selected?.tipo}</DrawerTitle>
            <DrawerDescription>Information of pay and rec.</DrawerDescription>
          </DrawerHeader>

          {selected && (
            <div className="p-4 space-y-4">
              <p>
                <strong>ID:</strong> {selected.id}
              </p>
              <p>
                <strong>des:</strong> {selected.desc}
              </p>
              <p>
                <strong>value:</strong> {selected.value}
              </p>
            </div>
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

const monthNames = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
]

export const navigationMes = (
  currentMonthIndex: number,
  currentYear: number,
  direction: number
) => {
  const newMonthIndex =
    (currentMonthIndex + direction + monthNames.length) % monthNames.length

  const newYear =
    currentYear +
    Math.floor((currentMonthIndex + direction) / monthNames.length)

  return {
    index: newMonthIndex + 1,
    name: monthNames[newMonthIndex],
    year: newYear,
  }
}

function truncateText(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)} ...`
  }
  return text
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
