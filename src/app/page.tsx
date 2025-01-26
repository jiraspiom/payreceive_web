'use server'

import { FinancasWrapper } from '@/components/financas-wrapper'
import { getDados } from '@/lib/getDados'

export default async function Home() {
  const dataAtual = new Date()
  const dadosIniciais = await getDados(
    dataAtual.getFullYear(),
    dataAtual.getMonth() + 1
  )

  return (
    <main className="container mx-auto p-2  ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-2">PAY-REC</h1>
        <h1 className="text-2xl font-bold mb-2">beta25.1.24</h1>
      </div>
      <FinancasWrapper getDados={getDados} dadosIniciais={dadosIniciais} />
    </main>
  )
}
