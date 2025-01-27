'use client'

import React, { useState } from 'react'
import type { DadosFinanceiros } from '@/app/types/RetornoFetch'
import Financas from './Financas'

interface FinancasWrapperProps {
  getDados: (ano: number, mes: number) => Promise<DadosFinanceiros>
  addPayRec: (formData: FormData, tipo: string) => Promise<void>
  delPayRec: (id: string, tipo: string) => Promise<void>
  putPayRec: (
    id: string,
    formData: FormData,
    acao: string,
    date: Date
  ) => Promise<void>
  dadosIniciais: DadosFinanceiros
}

export function FinancasWrapper({
  getDados,
  addPayRec,
  delPayRec,
  putPayRec,
  dadosIniciais,
}: FinancasWrapperProps) {
  const [dados, setDados] = useState(dadosIniciais)
  const [isLoading, setIsLoading] = useState(false)
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear())
  const [mesAtual, setMesAtual] = useState(new Date().getMonth() + 1)

  const atualizarDados = async (ano: number, mes: number) => {
    setIsLoading(true)
    try {
      const novosDados = await getDados(ano, mes)
      setDados(novosDados)
      setAnoAtual(ano)
      setMesAtual(mes)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPayRec = async (formData: FormData, tipo: string) => {
    try {
      await addPayRec(formData, tipo)
      await atualizarDados(anoAtual, mesAtual)
    } catch (error) {
      console.error('Erro ao adicionar registro:', error)
    }
  }

  const handleDelPayRec = async (id: string, tipo: string) => {
    try {
      await delPayRec(id, tipo)
      await atualizarDados(anoAtual, mesAtual)
    } catch (error) {
      console.error('Erro ao deletar registro:', error)
    }
  }

  const handlePutPayRec = async (
    id: string,
    formData: FormData,
    acao: string,
    date: Date
  ) => {
    try {
      await putPayRec(id, formData, acao, date)
      await atualizarDados(anoAtual, mesAtual)
    } catch (error) {
      console.error('Erro ao atualizar registro:', error)
    }
  }

  return (
    <div>
      <Financas
        dados={dados.payRecItems}
        totalPay={dados.totalPay}
        totalRec={dados.totalRec}
        onDateChange={atualizarDados}
        onAddPayRec={handleAddPayRec}
        onDelPayRec={handleDelPayRec}
        onPutPayRec={handlePutPayRec}
        isLoading={isLoading}
      />
    </div>
  )
}
