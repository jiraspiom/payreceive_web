'use server'

import httpClientFetch from '@/http/client-fetch'
import { revalidatePath } from 'next/cache'

export async function DeletePayRec(id: string, tipo: string) {
  const acao =
    tipo === 'pay' ? `/api/pay/payments/${id}` : `/api/rec/receives/${id}`

  console.log('ok acai', acao, id)

  const [err, data] = await httpClientFetch({
    baseURL: 'https://payrec.vercel.app',
    url: acao,
    method: 'DELETE',
  })

  if (err) {
    console.log('Erro ao deletar payrec')
  } else {
    console.log('payrec deletado com sucesso')
  }
  revalidatePath('/')
}
