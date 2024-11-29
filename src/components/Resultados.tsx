import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Resultados {
  precioPublicar: number;
  margenGanancia: number;
  cobroRecibir: number;
  indicadorRentabilidad: 'verde' | 'amarillo' | 'rojo';
  mensajeAdvertencia: string;
}

interface ResultadosProps {
  resultados: Resultados;
  precioCompe1: number;
  precioCompe2: number;
}

export function Resultados({ resultados, precioCompe1, precioCompe2 }: ResultadosProps) {
  const { precioPublicar, margenGanancia, cobroRecibir, indicadorRentabilidad, mensajeAdvertencia } = resultados

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(value)
  }

  const formatPercentage = (value: number): string => {
    return new Intl.NumberFormat('es-AR', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)
  }

  const getComparisonText = (precioCompe: number): string => {
    if (!precioCompe) return '';
    const diff = (precioCompe - precioPublicar) / precioPublicar;
    return `${formatPercentage(Math.abs(diff))} ${diff > 0 ? 'más caro' : 'más barato'}`;
};

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Precio a Publicar</h3>
            <p className="text-2xl font-bold">{formatCurrency(precioPublicar)}</p>
          </div>
          <div>
            <h3 className="font-semibold">Margen de Ganancia</h3>
            {margenGanancia > 0 ? (
              <p className={`text-2xl font-bold text-${indicadorRentabilidad}-500`}>
                {formatPercentage(margenGanancia)} ({formatCurrency(margenGanancia * precioPublicar)})
              </p>
            ) : (
              <p className="text-2xl font-bold text-red-500">No hay margen de ganancia</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="font-semibold">Cobro a Recibir</h3>
          <p className="text-xl">{formatCurrency(cobroRecibir)}</p>
        </div>
        {mensajeAdvertencia && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Advertencia:</strong>
            <span className="block sm:inline"> {mensajeAdvertencia}</span>
          </div>
        )}
        {(precioCompe1 > 0 || precioCompe2 > 0) && (
          <div>
            <h3 className="font-semibold">Comparación con la Competencia</h3>
            {precioCompe1 > 0 && (
              <p>Competencia 1: {formatCurrency(precioCompe1)} ({getComparisonText(precioCompe1)})</p>
            )}
            {precioCompe2 > 0 && (
              <p>Competencia 2: {formatCurrency(precioCompe2)} ({getComparisonText(precioCompe2)})</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

