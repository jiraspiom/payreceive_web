'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DatePickerWithRange } from './datapick'

interface FinancaItem {
  id: number
  descricao: string
  valor: number
  data: string
}

interface FinancasProps {
  dados: FinancaItem[]
  onDateChange: (ano: number, mes: number) => void
  isLoading: boolean
}

export function Financas({ dados, onDateChange, isLoading }: FinancasProps) {
  return (
    <div className="space-y-4">
      <DatePickerWithRange onDateChange={onDateChange} />
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dados.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.descricao}</TableCell>
                <TableCell>{item.valor.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(item.data).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
