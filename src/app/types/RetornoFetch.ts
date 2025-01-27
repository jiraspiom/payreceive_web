export type PayRecItem = {
  id: string
  text: string
  value: number
  date: Date
  tipo: string
}

export type DadosFinanceiros = {
  totalPay: number
  totalRec: number
  payRecItems: PayRecItem[]
}
