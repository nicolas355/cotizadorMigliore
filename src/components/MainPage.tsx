'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CostoBase } from './Costo-base'
import { Comisiones } from './Comisiones'
import { Envios } from './Envios'
import { CamposOpcionales } from './Campos-Opcionales'
import { Resultados } from './Resultados'

interface Resultados {
  precioPublicar: number;
  margenGanancia: number;
  cobroRecibir: number;
  indicadorRentabilidad: 'verde' | 'amarillo' | 'rojo';
  mensajeAdvertencia: string;
}

export default function PrecioCalculator() {
  const [costoBase, setCostoBase] = useState<number>(0)
  const [iva, setIva] = useState<number>(0.105)
  const [comisionFija, setComisionFija] = useState<number>(0.14)
  const [comisionCuotas, setComisionCuotas] = useState<number>(0)
  const [envioTipo1, setEnvioTipo1] = useState<number>(0)
  const [envioTipo2, setEnvioTipo2] = useState<number>(5802.5)
  const [tipoEnvioSeleccionado, setTipoEnvioSeleccionado] = useState<'tipo1' | 'tipo2'>('tipo1')
  const [razonabilidad, setRazonabilidad] = useState<boolean>(false)
  const [precioCompe1, setPrecioCompe1] = useState<number>(0)
  const [precioCompe2, setPrecioCompe2] = useState<number>(0)
  const [margenMinimo, setMargenMinimo] = useState<number>(0.075)
  const [gananciaDeseada, setGananciaDeseada] = useState<number>(0)
  const [resultados, setResultados] = useState<Resultados>({
    precioPublicar: 0,
    margenGanancia: 0,
    cobroRecibir: 0,
    indicadorRentabilidad: 'verde',
    mensajeAdvertencia: '',
  })

  useEffect(() => {
    calcularResultados()
  }, [costoBase, iva, comisionFija, comisionCuotas, envioTipo1, envioTipo2, tipoEnvioSeleccionado, razonabilidad, precioCompe1, precioCompe2, margenMinimo, gananciaDeseada])

  const calcularResultados = () => {
    const costoTotal = costoBase * (1 + iva) * (1 + comisionFija + comisionCuotas)
    const costoEnvio = tipoEnvioSeleccionado === 'tipo1' ? envioTipo1 : envioTipo2
    const envioFinal = razonabilidad ? Math.max(costoEnvio, costoTotal * 0.3) : costoEnvio
    const precioMinimo = costoTotal + envioFinal + gananciaDeseada
    const precioPublicar = Math.max(precioMinimo, costoTotal / (1 - margenMinimo))
    
    const margenGanancia = (precioPublicar - costoTotal - envioFinal) / precioPublicar
    const cobroRecibir = precioPublicar * 0.982 // Restando 0.6% tres veces

    let indicadorRentabilidad: 'verde' | 'amarillo' | 'rojo' = 'verde'
    if (margenGanancia < margenMinimo) {
      indicadorRentabilidad = margenGanancia < margenMinimo / 2 ? 'rojo' : 'amarillo'
    }

    let mensajeAdvertencia = ''
    if (precioPublicar < costoTotal) {
      mensajeAdvertencia = "El precio a publicar no cubre los costos básicos."
    }

    setResultados({
      precioPublicar,
      margenGanancia,
      cobroRecibir,
      indicadorRentabilidad,
      mensajeAdvertencia,
    })
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Calculadora de Precios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CostoBase costoBase={costoBase} setCostoBase={setCostoBase} iva={iva} setIva={setIva} />
          <Comisiones 
            comisionFija={comisionFija} 
            setComisionFija={setComisionFija} 
            comisionCuotas={comisionCuotas} 
            setComisionCuotas={setComisionCuotas} 
          />
          <Envios 
            envioTipo1={envioTipo1} 
            setEnvioTipo1={setEnvioTipo1} 
            envioTipo2={envioTipo2} 
            setEnvioTipo2={setEnvioTipo2} 
            tipoEnvioSeleccionado={tipoEnvioSeleccionado}
            setTipoEnvioSeleccionado={setTipoEnvioSeleccionado}
            razonabilidad={razonabilidad} 
            setRazonabilidad={setRazonabilidad} 
          />
          <CamposOpcionales 
            precioCompe1={precioCompe1}
            setPrecioCompe1={setPrecioCompe1}
            precioCompe2={precioCompe2}
            setPrecioCompe2={setPrecioCompe2}
            margenMinimo={margenMinimo}
            setMargenMinimo={setMargenMinimo}
            gananciaDeseada={gananciaDeseada}
            setGananciaDeseada={setGananciaDeseada}
          />
          <Resultados resultados={resultados} precioCompe1={precioCompe1} precioCompe2={precioCompe2} />
        </CardContent>
      </Card>
    </div>
  )
}

