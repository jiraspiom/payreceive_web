'use client'

import React, { useState } from 'react'
import { Financas } from './Financas'
import type { RetornoFetch } from '@/app/types/RetornoFetch'

interface FinancasWrapperProps {
  getDados: (ano: number, mes: number) => Promise<RetornoFetch[] | undefined>
  dadosIniciais: RetornoFetch[] | undefined
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
    <Financas
      dados={dados}
      onDateChange={atualizarDados}
      isLoading={isLoading}
    />
  )
}
