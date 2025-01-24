import Financas from '@/components/Financas'

export default function Home() {
  return (
    <main className="container mx-auto p-2 ">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-2">PAY-REC</h1>
        <h1 className="text-2xl font-bold mb-2">JAN</h1>
      </div>
      <Financas />
    </main>
  )
}
