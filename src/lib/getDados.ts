'use server'
import type { RetornoFetch, RetornoGetDados } from '@/app/types/RetornoFetch'
import httpClientFetch from '@/http/client-fetch'

export async function getDados(
  ano: number,
  mes: number
): Promise<RetornoGetDados> {
  const responsepay = await httpClientFetch<
    { data: RetornoFetch[] },
    { message: string }
  >({
    method: 'GET',
    baseURL: 'https://payrec.vercel.app',
    url: `/api/pay/payments?ano=${Number(ano)}&mes=${Number(mes)}`,
  })

  const [errorPay, dataPay] = responsepay

  const responserec = await httpClientFetch<
    { data: RetornoFetch[] },
    { message: string }
  >({
    method: 'GET',
    baseURL: 'https://payrec.vercel.app',
    url: `/api/rec/receives?ano=${ano}&mes=${mes}`,
  })

  const [errorRec, dataRec] = responserec

  const totalPay = dataPay?.data.reduce((acc, pay) => acc + pay.value, 0) ?? 0
  const totalRec = dataRec?.data.reduce((acc, rec) => acc + rec.value, 0) ?? 0

  const transacoes = [
    ...(dataPay?.data ?? []).map(pay => ({
      id: pay.id,
      text: pay.text,
      value: pay.value,
      date: pay.date,
      tipo: 'pay',
    })),
    ...(dataRec?.data ?? []).map(rec => ({
      id: rec.id,
      text: rec.text,
      value: rec.value,
      date: rec.date,
      tipo: 'rec',
    })),
  ]

  const transacoesby = transacoes.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  console.log('passou na busca buscada...')
  return { retornoFetch: transacoesby, totalPay, totalRec }
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
