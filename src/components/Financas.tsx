import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { PlusCircle } from 'lucide-react'
import { Input } from './ui/input'

const transacoes = [
  {
    id: 1,
    desc: 'primeiro carinha aqui que nao sei o que e',
    value: 55,
    date: '01/01/2020',
  },
  { id: 2, desc: 'segundo', value: 11, date: '02/01/2020' },
  { id: 3, desc: 'terce', value: 1, date: '02/01/2020' },
  { id: 4, desc: 'terce', value: 31, date: '05/01/2020' },
  { id: 5, desc: 'salario', value: '500.000,00', date: '01/01/2020' },
]

export default function Financas() {
  return (
    <div>
      <div>
        <form className="space-y-4 mb-6">
          <div className="flex justify-between mt-2 gap-4">
            <div className="flex items-center w-full ">
              <Button type="button" variant={'destructive'} className="w-full">
                <Label>PAY - 500,00</Label>
              </Button>
            </div>
            <div className="flex items-center w-full ">
              <Button type="button" className="w-full">
                <Label>REC - 5000,00</Label>
              </Button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8/12">
              <Input required placeholder="Description" />
            </div>
            <div className="w-4/12">
              <Input required placeholder="value" />
            </div>
          </div>
        </form>

        <hr className="bg-red-800" />
        <Table className=" ">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">date</TableHead>
              <TableHead>desc</TableHead>
              <TableHead>value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transacoes.map((tra, index) => (
              <TableRow key={tra.id}>
                <TableCell>{tra.date}</TableCell>
                <TableCell>{tra.desc}</TableCell>
                <TableCell className="text-end">{tra.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
