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
import { ChevronLeft, ChevronRight, Trash } from 'lucide-react'
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
import { salvarPayRec } from '@/app/actions/salvarPayRec'
import { DeletePayRec } from '@/app/actions/deletePayRec'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { navigationMes } from '@/lib/navigationMes'

type TransationProps = {
  id: string
  text: string
  value: number
  date: Date
  tipo: string
}

type RetornoFetch = {
  id: string
  text: string
  value: number
  date: Date
}

export default function Financas({
  dadosPay,
  dadosRec,
}: {
  dadosPay: RetornoFetch[] | undefined
  dadosRec: RetornoFetch[] | undefined
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)
  }, 0)

  const totalPay = dadosPay?.reduce((acc, pay) => acc + pay.value, 0) ?? 0
  const totalRec = dadosRec?.reduce((acc, rec) => acc + rec.value, 0) ?? 0

  // * busca de dados
  const transacoes = [
    ...(dadosPay ?? []).map(pay => ({
      id: pay.id,
      text: pay.text,
      value: pay.value,
      date: pay.date,
      tipo: 'pay',
    })),
    ...(dadosRec ?? []).map(rec => ({
      id: rec.id,
      text: rec.text,
      value: rec.value,
      date: rec.date,
      tipo: 'rec',
    })),
  ]

  const transacoesby = transacoes.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
  // * fin da busca de dados

  const [acao, setAcao] = useState('')

  const [mesBusca, setMesBusca] = useState(0)
  const cDate = new Date()

  const mesAno = navigationMes(cDate.getMonth(), cDate.getFullYear(), mesBusca)

  const next = () => {
    const mesAno = navigationMes(
      cDate.getMonth(),
      cDate.getFullYear(),
      mesBusca
    )

    setMesBusca(mesBusca + 1)
    handleSearch(`${mesAno.year}-${mesAno.index}`)
  }
  const prev = () => {
    const mesAno = navigationMes(
      cDate.getMonth(),
      cDate.getFullYear(),
      mesBusca
    )

    setMesBusca(mesBusca - 1)
    handleSearch(`${mesAno.year}-${mesAno.index}`)
  }

  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<TransationProps | null>(null)

  // abrir drawer
  const handleRowClick = async (transacao: TransationProps) => {
    await setSelected(transacao)
    await setIsOpen(true)
  }

  const enviar = async (formData: FormData) => {
    await salvarPayRec(formData, acao)
  }

  return (
    <div>
      <form action={enviar} className="space-y-4 mb-6">
        <div className="flex justify-between mt-2 gap-4">
          <div className="flex items-center w-full ">
            <Button
              type="submit"
              value="pay"
              onClick={() => setAcao('pay')}
              // onClick={() =>
              //   salvarPayRec(new FormData(document.forms[0]), 'pay')
              // }
              variant={'destructive'}
              className="w-full"
            >
              <Label>PAY {totalPay && totalPay}</Label>
            </Button>
          </div>
          <div className="flex items-center w-full ">
            <Button
              type="submit"
              value="rec"
              onClick={() => setAcao('rec')}
              // onClick={() =>
              //   salvarPayRec(new FormData(document.forms[0]), 'rec')
              // }
              className="w-full"
            >
              <Label>REC {totalRec && totalRec}</Label>
            </Button>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-8/12">
            <Input name="text" required placeholder="Description" />
          </div>
          <div className="w-4/12">
            <Input name="value" required placeholder="value" />
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
          {`${mesAno.name} / ${mesAno.year}`}
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
            <TableHead className="w-2/3">desciption</TableHead>
            <TableHead className="w-1/3 text-center">$</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transacoesby.map((pr, index) => (
            <TableRow
              key={Number(index)}
              onClick={() => handleRowClick(pr)}
              className={cn([
                'transition-transform duration-3001 cursor-pointer hover:bg-muted/50',
              ])}
            >
              {/* <TableCell>{format(tra.date, 'dd/mm/yyyy')}</TableCell> */}
              <TableCell>
                <div className="text-xs">{format(pr.date, 'dd/MM/yyyy')}</div>
                <div className="text-xl">{truncateText(pr.text, 30)}</div>
              </TableCell>
              <TableCell
                className={cn([
                  'text-end',
                  pr.tipo === 'rec' ? 'text-purple-500' : 'text-red-600',
                ])}
              >
                {pr.tipo === 'rec'
                  ? pr.value.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })
                  : `- ${pr.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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
                  <Button
                    onClick={() => DeletePayRec(selected.id, selected.tipo)}
                    variant={'destructive'}
                  >
                    <Trash />
                  </Button>
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
