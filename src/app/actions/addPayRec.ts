'use server'

import httpClientFetch from '@/http/client-fetch'
import { revalidatePath } from 'next/cache'

export async function addPayRec(formData: FormData, acao: string) {
  const text = formData.get('text')
  const value = formData.get('value')

  if (!text || !value || Number.isNaN(Number(value))) {
    console.error('Erro ao salvar o pay/rec')
    throw new Error('Dados inválidos fornecidos.')
    // return
  }

  const endpoints: Record<string, string> = {
    pay: '/api/pay/payments',
    rec: '/api/rec/receives',
  }

  const endpoint = endpoints[acao]
  if (!endpoint) {
    console.error(`Açao ${acao} não é válida`)
    throw new Error(`Ação ${acao} inválida.`)
    // return
  }

  // try {
  const [err] = await httpClientFetch({
    baseURL: 'https://payrec.vercel.app',
    url: endpoint,
    method: 'POST',
    data: { text: text, value: Number(value) },
  })

  if (err) {
    console.error(`Erro ao criar o ${acao}:`, err)
    throw new Error(`Erro ao criar ${acao}`)
  }

  await revalidatePath('/')
  console.log('revalidado ou deu erro?')
}
