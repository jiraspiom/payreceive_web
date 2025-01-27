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

import type { DadosFinanceiros } from '@/app/types/RetornoFetch'
import { DatePickerWithRange2 } from './datapick2'

interface FinancasProps {
  dados: DadosFinanceiros
  onDateChange: (ano: number, mes: number) => void
  isLoading: boolean
}

export function Financas2({ dados, onDateChange, isLoading }: FinancasProps) {
  return (
    <div className="space-y-4">
      <DatePickerWithRange2 onDateChange={onDateChange} />
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
            {dados.payRecItems?.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.text}</TableCell>
                <TableCell>{item.value.toFixed(2)}</TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
