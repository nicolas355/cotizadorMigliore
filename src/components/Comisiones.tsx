import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ComisionesProps {
  comisionFija: number;
  setComisionFija: (value: number) => void;
  comisionCuotas: number;
  setComisionCuotas: (value: number) => void;
}

export function Comisiones({ comisionFija, setComisionFija, comisionCuotas, setComisionCuotas }: ComisionesProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="comision-fija">Comisión fija</Label>
        <Input
          id="comision-fija"
          type="number"
          value={comisionFija}
          onChange={(e) => setComisionFija(Number(e.target.value))}
          disabled
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="comision-cuotas">Comisión cuotas</Label>
        <Select value={comisionCuotas.toString()} onValueChange={(value) => setComisionCuotas(Number(value))}>
          <SelectTrigger id="comision-cuotas">
            <SelectValue placeholder="Seleccione comisión por cuotas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Sin cuotas (0%)</SelectItem>
            <SelectItem value="0.085">3 cuotas al mismo precio (8.50%)</SelectItem>
            <SelectItem value="0.14">6 cuotas al mismo precio (14%)</SelectItem>
            <SelectItem value="0.0643">3 cuotas (cuota simple) (6.43%)</SelectItem>
            <SelectItem value="0.1227">6 cuotas (cuotas simple) (12.27%)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

