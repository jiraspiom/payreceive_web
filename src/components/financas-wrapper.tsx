'use client'

import React, { useState } from 'react'
import type { RetornoGetDados } from '@/app/types/RetornoFetch'
import Financas from './Financas'
import { getDados } from '@/lib/getDados'
import { revalidatePath } from 'next/cache'

interface FinancasWrapperProps {
  getDados: (ano: number, mes: number) => Promise<RetornoGetDados>
  dadosIniciais: RetornoGetDados
}

interface FinancasWrapperProps2 {
  dadosIniciais: RetornoGetDados
}

export function FinancasWrapper({ dadosIniciais }: FinancasWrapperProps2) {
  console.log('verificando', dadosIniciais.totalPay)
  const [dados, setDados] = useState(dadosIniciais)
  const [isLoading, setIsLoading] = useState(false)

  const atualizarDados = async (ano: number, mes: number) => {
    setIsLoading(true)
    try {
      const novosDados = await getDados(ano, mes)

      setDados(novosDados)
      revalidatePath('/')
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    } finally {
      setIsLoading(false)
    }
  }

  console.log('dadoooooo', dados.totalPay)

  return (
    <div>
      <Financas
        dados={dados}
        onDateChange={atualizarDados}
        isLoading={isLoading}
      />
    </div>
  )
}
