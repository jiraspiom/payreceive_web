import Financas from '@/components/Financas'
import httpClientFetch from '@/http/client-fetch'

export default async function Home() {
  const response = await httpClientFetch<{ data: string }, { message: string }>(
    {
      method: 'GET',
      baseURL: 'https://payrec.vercel.app',
      url: '/api/pay/payments',
    }
  )

  const [error, data] = response

  if (error) {
    console.error('erro', error.message)
  } else {
    console.log('data', data?.data)
  }
  return (
    <main className="container mx-auto p-2 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-2">PAY-REC</h1>
        <h1 className="text-2xl font-bold mb-2">beta25.1.24</h1>
      </div>
      <Financas />
    </main>
  )
}
