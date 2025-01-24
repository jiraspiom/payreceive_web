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
import { useState } from 'react'

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
    date: new Date('01/01/2020'),
  },
  { id: 2, desc: 'segundo', value: 11, date: new Date('2020-01-01') },
  { id: 3, desc: 'terce', value: 1, date: new Date('2020-01-03') },
  { id: 4, desc: 'terce', value: 31, date: new Date('2020-01-06') },
  { id: 5, desc: 'salario', value: 500, date: new Date('2020-01-11') },
]

const receitas: dr[] = [
  {
    id: 1,
    desc: 'salario',
    value: 5000,
    date: new Date('2020-01-01'),
  },
  { id: 2, desc: 'decimo 3', value: 11, date: new Date('2020-01-15') },
]

export default function Financas() {
  const [mesBusca, setMesBusca] = useState(0)
  const currentDate = new Date()

  const mes = navigationMes(
    currentDate.getMonth(),
    currentDate.getFullYear(),
    mesBusca
  )
  console.log('mes:', mes)

  const next = () => {
    setMesBusca(mesBusca + 1)
  }

  const prev = () => {
    console.log('cliecdo')
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

  const transacoesby = transacoes.sort(
    (a, b) => new Date(a.date).getTime() + new Date(b.date).getTime()
  )

  return (
    <div>
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
            onKeyDown={() => console.log('down')}
          >
            {mes.name} / {mes.year}
          </div>
          <Button onClick={() => next()}>
            <ChevronRight />
          </Button>
        </div>
        <hr className="bg-white" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">date</TableHead>
              <TableHead>desc</TableHead>
              <TableHead>value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacoesby.map((tra, index) => (
              <TableRow key={Number(index)}>
                <TableCell>{format(tra.date, 'dd/mm/yyyy')}</TableCell>
                <TableCell>{tra.desc}</TableCell>
                <TableCell className="text-end">{tra.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
  // return newIndex
}
