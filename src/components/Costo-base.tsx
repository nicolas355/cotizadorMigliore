import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CostoBaseProps {
  costoBase: number;
  setCostoBase: (value: number) => void;
  iva: number;
  setIva: (value: number) => void;
}

export function CostoBase({ costoBase, setCostoBase, iva, setIva }: CostoBaseProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="costo-base">Costo del producto sin IVA</Label>
        <Input
          id="costo-base"
          type="number"
          value={costoBase}
          onChange={(e) => setCostoBase(Number(e.target.value))}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="iva">IVA a aplicar</Label>
        <Select value={iva.toString()} onValueChange={(value) => setIva(Number(value))}>
          <SelectTrigger id="iva">
            <SelectValue placeholder="Seleccione IVA" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0.105">10.5%</SelectItem>
            <SelectItem value="0.21">21%</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

