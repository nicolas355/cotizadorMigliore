import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface EnviosProps {
  envioTipo1: number;
  setEnvioTipo1: (value: number) => void;
  envioTipo2: number;
  setEnvioTipo2: (value: number) => void;
  tipoEnvioSeleccionado: 'tipo1' | 'tipo2';
  setTipoEnvioSeleccionado: (value: 'tipo1' | 'tipo2') => void;
  razonabilidad: boolean;
  setRazonabilidad: (value: boolean) => void;
}

export function Envios({ 
  envioTipo1, 
  setEnvioTipo1, 
  envioTipo2, 
  setEnvioTipo2, 
  tipoEnvioSeleccionado,
  setTipoEnvioSeleccionado,
  razonabilidad, 
  setRazonabilidad 
}: EnviosProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tipo-envio">Tipo de Envío</Label>
          <Select 
            value={tipoEnvioSeleccionado} 
            onValueChange={(value: 'tipo1' | 'tipo2') => setTipoEnvioSeleccionado(value)}
          >
            <SelectTrigger id="tipo-envio">
              <SelectValue placeholder="Seleccione tipo de envío" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tipo1">Envío Tipo 1</SelectItem>
              <SelectItem value="tipo2">Envío Tipo 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="envio-tipo-1">Envío tipo 1</Label>
          <Input
            id="envio-tipo-1"
            type="number"
            value={envioTipo1}
            onChange={(e) => setEnvioTipo1(Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="envio-tipo-2">Envío tipo 2</Label>
          <Select value={envioTipo2.toString()} onValueChange={(value) => setEnvioTipo2(Number(value))}>
            <SelectTrigger id="envio-tipo-2">
              <SelectValue placeholder="Seleccione tipo de envío" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5802.5">De 1 a 2 Kg: $5.802,50</SelectItem>
              <SelectItem value="7717.5">De 2 a 5 Kg: $7.717,50</SelectItem>
              <SelectItem value="9166">De 5 a 10 Kg: $9.166,00</SelectItem>
              <SelectItem value="10607">De 10 a 15 Kg: $10.607,00</SelectItem>
              <SelectItem value="12441.5">De 15 a 20 Kg: $12.441,50</SelectItem>
              <SelectItem value="14844">De 20 a 25 KG: $14.844,00</SelectItem>
              <SelectItem value="20374">De 25 a 30 KG: $20.374,00</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch
          id="razonabilidad"
          checked={razonabilidad}
          onCheckedChange={setRazonabilidad}
        />
        <Label htmlFor="razonabilidad">Aplicar razonabilidad (70% del costo más alto)</Label>
      </div>
    </div>
  )
}

