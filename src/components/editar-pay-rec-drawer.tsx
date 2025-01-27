'use client'
import { Divide, Trash } from 'lucide-react'
import { format, parse } from 'date-fns'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from '@/components/ui/drawer'
import type { PayRecItem } from '@/app/types/RetornoFetch'
import { useToast } from '@/hooks/use-toast'

import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'

import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import { ToastAction } from '@radix-ui/react-toast'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
            onClick={() => console.log('deletando')}
            altText="Desfazer delete"
          >
            Undo
          </ToastAction>
        ),
      })
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
          <DrawerTitle>Details of {registro?.tipo}</DrawerTitle>
          <DrawerDescription>
            Edit or Delete your {registro?.tipo}.
          </DrawerDescription>
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
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div>
                  <Input
                    id="edit-text"
                    value={text}
                    name="text"
                    onChange={e => setText(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <Input
                      id="edit-value"
                      type="number"
                      name="value"
                      step="0.01"
                      value={value}
                      onChange={e => setValue(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <DrawerFooter>
                <div className="flex justify-between">
                  <Button type="submit">Save</Button>
                  <Button
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
