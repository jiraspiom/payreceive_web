'use client'

import React, { useState } from 'react'
import type { DadosFinanceiros } from '@/app/types/RetornoFetch'
import Financas from './Financas'

interface FinancasWrapperProps {
  getDados: (ano: number, mes: number) => Promise<DadosFinanceiros>
  dadosIniciais: DadosFinanceiros
}

export function FinancasWrapper({
  getDados,
  dadosIniciais,
}: FinancasWrapperProps) {
  const [dados, setDados] = useState(dadosIniciais)
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <div>
      <Financas
        dados={dados.payRecItems}
        totalPay={dados.totalPay}
        totalRec={dados.totalRec}
        onDateChange={atualizarDados}
        isLoading={isLoading}
      />
    </div>
  )
}
