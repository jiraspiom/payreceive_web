import httpClientFetch from '@/http/client-fetch'
import { revalidatePath } from 'next/cache'

export async function salvarPayRec(formData: FormData, acao: string) {
  const text = formData.get('text')
  const value = formData.get('value')

  if (acao === 'pay') {
    const [err, data] = await httpClientFetch({
      baseURL: 'https://payrec.vercel.app',
      url: '/api/pay/payments',
      method: 'POST',
      data: { text: text, value: Number(value) },
    })

    if (err) {
      console.log('Erro ao criar o pay')
    } else {
      console.log('pay criado com sucesso')
    }
  }

  if (acao === 'rec') {
    const [err, data] = await httpClientFetch({
      baseURL: 'https://payrec.vercel.app',
      url: '/api/rec/receives',
      method: 'POST',
      data: { text: text, value: Number(value) },
    })

    if (err) {
      console.log('Erro ao criar o rec')
    } else {
      console.log('rec criado com sucesso')
    }
  }
}
