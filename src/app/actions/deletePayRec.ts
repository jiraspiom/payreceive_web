'use server'

import httpClientFetch from '@/http/client-fetch'
import { revalidatePath } from 'next/cache'

export async function DeletePayRec(id: string, tipo: string) {
  const endpoints: Record<string, string> = {
    pay: `/api/pay/payments/${id}`,
    rec: `/api/rec/receives/${id}`,
  }

  const endpoint = endpoints[tipo]

  console.log('endpoint', endpoint)

  if (!endpoint) {
    console.error(`Açao ${tipo} não é válida`)
    throw new Error(`Ação ${tipo} inválida.`)
    // return
  }

  const [err] = await httpClientFetch({
    baseURL: 'https://payrec.vercel.app',
    url: endpoint,
    method: 'DELETE',
  })

  if (err) {
    console.error('Erro ao deletar payrec:', err)
    throw new Error(`Erro ao deletar ${tipo}.`)
  }

  console.log(
    `${tipo === 'pay' ? 'Pagamento' : 'Recebimento'} deletado com sucesso!`
  )

  revalidatePath('/')
  revalidatePath('/teste')
  console.log('revalidado ou deu erro?')
}
