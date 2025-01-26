'use server'

import { getDados } from '@/lib/getDados'
import { FinancasWrapper2 } from './components/financas-wrapper2'

export default async function Page() {
  const dataAtual = new Date()
  const dadosIniciais = await getDados(
    dataAtual.getFullYear(),
    dataAtual.getMonth() + 1
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finanças</h1>
      <FinancasWrapper2 getDados={getDados} dadosIniciais={dadosIniciais} />
    </div>
  )
}
