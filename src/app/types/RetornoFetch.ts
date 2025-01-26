export type RetornoFetch = {
  id: string
  text: string
  value: number
  date: Date
  tipo: string
}

export type RetornoGetDados = {
  retornoFetch: RetornoFetch[]
  totalPay: number
  totalRec: number
}
