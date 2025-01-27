import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from '@/hooks/use-toast'
import { useState } from 'react'

interface AddPayRecProps {
  totalPay: number
  totalRec: number
  onAddPayRec: (formdata: FormData, tipo: string) => void
}

export default function AddPayRec({
  onAddPayRec,
  totalPay,
  totalRec,
}: AddPayRecProps) {
  const [tipo, setTipo] = useState('')
  const handleSubmit = async (formData: FormData) => {
    try {
      await onAddPayRec(formData, tipo)

      toast({
        title: 'Success',
        description: 'Transaction saved successfully',
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Erro',
          description: `Erro ao salvar ${tipo} ${error.message}`,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Erro',
          description: `Erro ao salvar ${tipo}`,
          variant: 'destructive',
        })
      }
    }
  }
  return (
    <form action={handleSubmit} className="space-y-4 mb-6">
      <div className="flex justify-between mt-2 gap-4">
        <div className="flex items-center w-full ">
          <Button
            type="submit"
            value="pay"
            onClick={() => setTipo('pay')}
            variant={'destructive'}
            className="w-full"
          >
            <Label>PAY ${totalPay && totalPay}</Label>
          </Button>
        </div>
        <div className="flex items-center w-full ">
          <Button
            type="submit"
            value="rec"
            onClick={() => setTipo('rec')}
            className="w-full"
          >
            <Label>REC ${totalRec && totalRec}</Label>
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-8/12">
          <Input
            name="text"
            type="text"
            maxLength={50}
            required
            placeholder="Description"
          />
        </div>
        <div className="w-4/12">
          <Input
            name="value"
            type="number"
            maxLength={12}
            required
            placeholder="$$$"
          />
        </div>
        {/* <div>
          <Input id="data" type="date" required />
        </div> */}
      </div>
    </form>
  )
}
