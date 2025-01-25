import Financas from '@/components/Financas'
import httpClientFetch from '@/http/client-fetch'

type RetornoFetch = {
  id: string
  text: string
  value: number
  date: Date
}

export default async function Home() {
  const responsepay = await httpClientFetch<
    { data: RetornoFetch[] },
    { message: string }
  >({
    method: 'GET',
    baseURL: 'https://payrec.vercel.app',
    url: '/api/pay/payments',
  })

  const [errorPay, dataPay] = responsepay

  if (errorPay) {
    console.error('erro', errorPay.message)
  } else {
    console.log('data', dataPay?.data)
  }

  const responserec = await httpClientFetch<
    { data: RetornoFetch[] },
    { message: string }
  >({
    method: 'GET',
    baseURL: 'https://payrec.vercel.app',
    url: '/api/rec/receives',
  })

  const [errorRec, dataRec] = responserec

  if (errorRec) {
    console.error('erro', errorRec.message)
  } else {
    console.log('data', dataRec?.data)
  }

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
