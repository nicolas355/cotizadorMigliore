import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface CamposOpcionalesProps {
  precioCompe1: number;
  setPrecioCompe1: (value: number) => void;
  precioCompe2: number;
  setPrecioCompe2: (value: number) => void;
  margenMinimo: number;
  setMargenMinimo: (value: number) => void;
  gananciaDeseada: number;
  setGananciaDeseada: (value: number) => void;
}

export function CamposOpcionales({ 
  precioCompe1, setPrecioCompe1, 
  precioCompe2, setPrecioCompe2, 
  margenMinimo, setMargenMinimo, 
  gananciaDeseada, setGananciaDeseada 
}: CamposOpcionalesProps) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="opcionales">
        <AccordionTrigger>Campos Opcionales</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="precio-compe-1">Precio Competencia 1</Label>
              <Input
                id="precio-compe-1"
                type="number"
                value={precioCompe1}
                onChange={(e) => setPrecioCompe1(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="precio-compe-2">Precio Competencia 2</Label>
              <Input
                id="precio-compe-2"
                type="number"
                value={precioCompe2}
                onChange={(e) => setPrecioCompe2(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="margen-minimo">Margen mínimo deseado (%)</Label>
              <Input
                id="margen-minimo"
                type="number"
                value={margenMinimo * 100}
                onChange={(e) => setMargenMinimo(Number(e.target.value) / 100)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ganancia-deseada">Ganancia deseada ($)</Label>
              <Input
                id="ganancia-deseada"
                type="number"
                value={gananciaDeseada}
                onChange={(e) => setGananciaDeseada(Number(e.target.value))}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

