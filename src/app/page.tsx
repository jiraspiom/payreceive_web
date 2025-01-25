import Financas from '@/components/Financas'
import httpClientFetch from '@/http/client-fetch'
import { navigationMes } from '@/lib/navigationMes'
import { Pragati_Narrow } from 'next/font/google'

type RetornoFetch = {
  id: string
  text: string
  value: number
  date: Date
}

interface SearchParamsProps {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const search = await searchParams
  const query = search?.query ?? ''

  const parametros = query.split('-')

  console.log('parametros', Number(parametros[0]), Number(parametros[1]))

  const responsepay = await httpClientFetch<
    { data: RetornoFetch[] },
    { message: string }
  >({
    method: 'GET',
    baseURL: 'https://payrec.vercel.app',
    url: `/api/pay/payments?ano=${Number(parametros[0])}&mes=${Number(parametros[1])}`,
  })

  const [errorPay, dataPay] = responsepay

  // if (errorPay) {
  //   console.error('erro', errorPay.message)
  // } else {
  //   console.log('data', dataPay?.data)
  // }

  const responserec = await httpClientFetch<
    { data: RetornoFetch[] },
    { message: string }
  >({
    method: 'GET',
    baseURL: 'https://payrec.vercel.app',
    url: `/api/rec/receives?ano=${Number(parametros[0])}&mes=${Number(parametros[1])}`,
  })

  const [errorRec, dataRec] = responserec

  // if (errorRec) {
  //   console.error('erro', errorRec.message)
  // } else {
  //   console.log('data', dataRec?.data)
  // }

  return (
    <main className="container mx-auto p-2 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-2">PAY-REC</h1>
        <h1 className="text-2xl font-bold mb-2">beta25.1.24</h1>
      </div>
      <Financas dadosPay={dataPay?.data} dadosRec={dataRec?.data} />
    </main>
  )
}
