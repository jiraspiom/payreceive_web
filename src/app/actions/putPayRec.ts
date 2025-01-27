'use server'

import httpClientFetch from '@/http/client-fetch'
import { revalidatePath } from 'next/cache'

export async function putPayRec(
  id: string,
  formData: FormData,
  tipo: string,
  date: Date
) {
  const text = formData.get('text')
  const value = formData.get('value')

  if (!text || !value || Number.isNaN(Number(value))) {
    console.error('Erro ao salvar o pay/rec')
    throw new Error('Dados inválidos fornecidos.')
    // return
  }

  const endpoints: Record<string, string> = {
    pay: `/api/pay/payments/${id}`,
    rec: `/api/rec/receives/${id}`,
  }

  const endpoint = endpoints[tipo]
  if (!endpoint) {
    console.error(`Açao ${tipo} não é válida`)
    throw new Error(`Ação ${tipo} inválida.`)
    // return
  }

  // try {
  const [err] = await httpClientFetch({
    baseURL: 'https://payrec.vercel.app',
    url: endpoint,
    method: 'PUT',
    data: { text: text, value: Number(value), date },
  })

  if (err) {
    console.error(`Erro ao editar o ${tipo}:`, err)
    throw new Error(`Erro ao editar ${tipo}`)
  }

  await revalidatePath('/')
}
