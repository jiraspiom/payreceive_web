'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from '@/components/ui/drawer'
import { useToast } from '@/hooks/use-toast'
import { Calendar } from '@/components/ui/calendar'
import { ToastAction } from '@radix-ui/react-toast'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { PayRecItem } from '@/app/types/RetornoFetch'

interface EditarRegistroDrawerProps {
  registro: PayRecItem | null
  isOpen: boolean
  onClose: () => void
  onDelPayRec: (id: string, tipo: string) => Promise<void>
  onPutPayRec: (
    id: string,
    formData: FormData,
    tipo: string,
    date: Date
  ) => Promise<void>
}

export default function EditarPayRecDrawer({
  registro,
  isOpen,
  onClose,
  onDelPayRec,
  onPutPayRec,
}: EditarRegistroDrawerProps) {
  const [text, setText] = useState('')
  const [value, setValue] = useState('')
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { toast } = useToast()

  useEffect(() => {
    if (registro) {
      setText(registro.text)
      setValue(registro.value.toString())
      setDate(registro.date)
    }
  }, [registro])

  const handleSubmit = async (formData: FormData) => {
    try {
      if (registro) {
        onPutPayRec(
          registro.id,
          formData,
          registro.tipo,
          date ? date : new Date()
        )

        toast({
          title: 'Update!',
          description: 'Transaction update successfully',
          variant: 'secondary',
        })

        onClose()
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Erro',
          description: `Erro ao atualizar ${error.message}`,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Erro',
          description: 'Erro ao atualizar',
          variant: 'destructive',
        })
      }
    }
  }

  const handleDelete = async (id: string, tipo: string) => {
    try {
      await onDelPayRec(id, tipo)

      toast({
        title: 'Deleted',
        description: 'Transaction deleted successfully',
        variant: 'secondary',
        action: (
          <ToastAction
            onClick={() => console.log('Deletado')}
            altText="Desfazer delete"
          >
            Undo
          </ToastAction>
        ),
      })

      onClose()
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Erro',
          description: `Erro ao deletar ${tipo} ${error.message}`,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Erro',
          description: `Erro ao deletar ${tipo}`,
          variant: 'destructive',
        })
      }
    }
  }
  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>EDIT or DELETE your {registro?.tipo}.</DrawerTitle>
        </DrawerHeader>
        <form action={handleSubmit}>
          {registro && (
            <>
              <div className="p-4 space-y-4">
                <div className="flex justify-center">
                  <div className="flex justify-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          name="date"
                          variant={'outline'}
                          className={`w-full justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
                        >
                          {date ? (
                            format(date, 'dd/MM/yyyy', { locale: ptBR })
                          ) : (
                            <span>Selecione uma data</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          hideWeekdays
                          selected={date}
                          onSelect={setDate}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8/12">
                    <Input
                      id="edit-text"
                      value={text}
                      name="text"
                      maxLength={50}
                      onChange={e => setText(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-4/12">
                    <div>
                      <Input
                        id="edit-value"
                        type="number"
                        name="value"
                        step="0.01"
                        maxLength={12}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <DrawerFooter className="gap-4">
                <div className="flex justify-between">
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    onClick={() => handleDelete(registro.id, registro?.tipo)}
                    variant={'destructive'}
                  >
                    <Trash />
                  </Button>
                </div>
                <Button variant={'outline'} onClick={onClose}>
                  Close
                </Button>
                {/* <DrawerClose asChild>
            <Button variant="outline">Fechar</Button>
            </DrawerClose> */}
              </DrawerFooter>
            </>
          )}
        </form>
      </DrawerContent>
    </Drawer>
  )
}
