'use server'
import httpClientFetch from '@/http/client-fetch'
import { FinancasWrapper } from './components/financas-wrapper'
import type { RetornoFetch } from '../types/RetornoFetch'

export default async function Page() {
  const dataAtual = new Date()
  const dadosIniciais = await getDados(
    dataAtual.getFullYear(),
    dataAtual.getMonth() + 1
  )

  console.log()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Finanças</h1>
      <FinancasWrapper getDados={getDados} dadosIniciais={dadosIniciais} />
    </div>
  )
}

export async function getDados(
  ano: number,
  mes: number
): Promise<RetornoFetch[] | undefined> {
  const responsepay = await httpClientFetch<
    { data: RetornoFetch[] },
    { message: string }
  >({
    method: 'GET',
    baseURL: 'https://payrec.vercel.app',
    url: `/api/pay/payments?ano=${Number(ano)}&mes=${Number(mes)}`,
  })

  const [errorPay, dataPay] = responsepay

  console.log('erro', errorPay)

  return dataPay?.data
}

// export async function getDados2(ano: number, mes: number) {
//   // Simula uma chamada de API com filtro
//   await new Promise(resolve => setTimeout(resolve, 100))
//   const todosOsDados = [
//     { id: 1, descricao: 'Salário', valor: 5000, data: '2024-11-10' },
//     { id: 2, descricao: 'Aluguel', valor: -1000, data: '2024-11-05' },
//     { id: 3, descricao: 'Supermercado', valor: -500, data: '2024-11-10' },
//     { id: 4, descricao: 'Freelance', valor: 1000, data: '2024-12-03' },
//     { id: 5, descricao: 'Conta de luz', valor: -150, data: '2025-01-20' },
//   ]

//   return todosOsDados.filter(item => {
//     const data = new Date(item.data)
//     return data.getFullYear() === ano && data.getMonth() + 1 === mes
//   })
// }
