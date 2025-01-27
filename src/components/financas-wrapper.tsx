'use client'

import React, { useState } from 'react'
import type { DadosFinanceiros } from '@/app/types/RetornoFetch'
import Financas from './Financas'

interface FinancasWrapperProps {
  getDados: (ano: number, mes: number) => Promise<DadosFinanceiros>
  addPayRec: (formData: FormData, acao: string) => Promise<void>
  dadosIniciais: DadosFinanceiros
}

export function FinancasWrapper({
  getDados,
  addPayRec,
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
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddPayRec = async (formData: FormData, acao: string) => {
    try {
      await addPayRec(formData, acao)
      const newData = await getDados(anoAtual, mesAtual)
      setDados(newData)
    } catch (error) {
      console.error('Erro ao adicionar registro:', error)
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
        isLoading={isLoading}
      />
    </div>
  )
}
