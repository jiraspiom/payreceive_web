'use server'
import type { RetornoFetch, RetornoGetDados } from '@/app/types/RetornoFetch'
import httpClientFetch from '@/http/client-fetch'

export async function getDados(
  ano: number,
  mes: number
): Promise<RetornoGetDados> {
  const baseUrl = 'https://payrec.vercel.app'

  // Fetch pagamentos e recebimentos com tipagem explícita
  const payResult = await fetchData<RetornoFetch[]>(
    baseUrl,
    '/api/pay/payments',
    ano,
    mes
  )

  const recResult = await fetchData<RetornoFetch[]>(
    baseUrl,
    '/api/rec/receives',
    ano,
    mes
  )

  // Calcula totais
  const totalPay = payResult.data?.reduce((acc, pay) => acc + pay.value, 0) ?? 0
  const totalRec = recResult.data?.reduce((acc, rec) => acc + rec.value, 0) ?? 0

  // Junta e transforma as transações
  const transacoes = [
    ...(payResult.data ?? []).map(pay => ({ ...pay, tipo: 'pay' as const })),
    ...(recResult.data ?? []).map(rec => ({ ...rec, tipo: 'rec' as const })),
  ]

  // Ordena as transações por data (descendente)
  const transacoesOrdenadas = transacoes.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  console.log('Busca concluída com sucesso.', totalPay)

  return { retornoFetch: transacoesOrdenadas, totalPay, totalRec }

  // const responsepay = await httpClientFetch<
  //   { data: RetornoFetch[] },
  //   { message: string }
  // >({
  //   method: 'GET',
  //   baseURL: 'https://payrec.vercel.app',
  //   url: `/api/pay/payments?ano=${Number(ano)}&mes=${Number(mes)}`,
  // })

  // const [errorPay, dataPay] = responsepay

  // const responserec = await httpClientFetch<
  //   { data: RetornoFetch[] },
  //   { message: string }
  // >({
  //   method: 'GET',
  //   baseURL: 'https://payrec.vercel.app',
  //   url: `/api/rec/receives?ano=${ano}&mes=${mes}`,
  // })

  // const [errorRec, dataRec] = responserec

  // const totalPay = dataPay?.data.reduce((acc, pay) => acc + pay.value, 0) ?? 0
  // const totalRec = dataRec?.data.reduce((acc, rec) => acc + rec.value, 0) ?? 0

  // const transacoes = [
  //   ...(dataPay?.data ?? []).map(pay => ({
  //     id: pay.id,
  //     text: pay.text,
  //     value: pay.value,
  //     date: pay.date,
  //     tipo: 'pay',
  //   })),
  //   ...(dataRec?.data ?? []).map(rec => ({
  //     id: rec.id,
  //     text: rec.text,
  //     value: rec.value,
  //     date: rec.date,
  //     tipo: 'rec',
  //   })),
  // ]

  // const transacoesby = transacoes.sort((a, b) => {
  //   return new Date(b.date).getTime() - new Date(a.date).getTime()
  // })

  // console.log('passou na busca buscada...')

  // return { retornoFetch: transacoesby, totalPay, totalRec }
}

// Função para buscar dados genéricos com tipagem explícita
async function fetchData<T>(
  baseUrl: string,
  endpoint: string,
  ano: number,
  mes: number
): Promise<{ error: Error | null; data: T | null }> {
  // busca o fetch customisado
  const [error, responseData] = await httpClientFetch<
    { data: T },
    { message: string }
  >({
    method: 'GET',
    baseURL: baseUrl,
    url: `${endpoint}?ano=${ano}&mes=${mes}`,
  })

  if (error) {
    return { error: new Error(error.message), data: null }
  }

  return { error: null, data: responseData?.data || null }
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
