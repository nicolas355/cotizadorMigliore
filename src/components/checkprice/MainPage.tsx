"use client";

import { useState } from "react";

export default function MainPageCheckPrice() {
  const [price, setPrice] = useState<number>(0);
  const [cuotas, setCuotas] = useState<string>("SIN CUOTAS");
  const [envioTipo, setEnvioTipo] = useState<string>("1");
  const [peso, setPeso] = useState<string>("De 1 a 2 Kg");
  const [envioTipo1, setEnvioTipo1] = useState<number>(7000); // Editable valor para Envío Tipo 1

  const calcularResultado = () => {
    // Comisiones y ajustes
    const comision = price * 0.14;
    let cuotaComision = 0;

    // Cuotas
    if (cuotas === "3 cuotas al mismo precio") cuotaComision = price * 0.085;
    else if (cuotas === "6 cuotas al mismo precio") cuotaComision = price * 0.14;
    else if (cuotas === "3 cuotas (CUOTA SIMPLE)") cuotaComision = price * 0.0643;
    else if (cuotas === "6 cuotas (CUOTA SIMPLE)") cuotaComision = price * 0.1227;

    // Envíos
    const envioTipo2Costos: Record<string, number> = {
      "De 1 a 2 Kg": 5802.5,
      "De 2 a 5 Kg": 7717.5,
      "De 5 a 10 Kg": 9166,
      "De 10 a 15 Kg": 10607,
      "De 15 a 20 Kg": 12441.5,
      "De 20 a 25 Kg": 14844,
      "De 25 a 30 Kg": 20374,
    };

    const envio = envioTipo === "1" ? envioTipo1 : envioTipo2Costos[peso];

    // Total final
    return price - comision - envio - cuotaComision;
  };

  const resultado = calcularResultado();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Revisar Precios Competencia</h1>

      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 space-y-4">
        <div>
          <label htmlFor="price" className="block font-medium">
            Precio de Venta Producto
          </label>
          <input
            type="number"
            id="price"
            className="w-full mt-1 p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block font-medium">Cuotas</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={cuotas}
            onChange={(e) => setCuotas(e.target.value)}
          >
            <option value="SIN CUOTAS">SIN CUOTAS (0%)</option>
            <option value="3 cuotas al mismo precio">3 cuotas al mismo precio (8.50%)</option>
            <option value="6 cuotas al mismo precio">6 cuotas al mismo precio (14%)</option>
            <option value="3 cuotas (CUOTA SIMPLE)">3 cuotas (CUOTA SIMPLE) (6.43%)</option>
            <option value="6 cuotas (CUOTA SIMPLE)">6 cuotas (CUOTA SIMPLE) (12.27%)</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Tipo de Envío</label>
          <select
            className="w-full mt-1 p-2 border rounded"
            value={envioTipo}
            onChange={(e) => setEnvioTipo(e.target.value)}
          >
            <option value="1">Envío Tipo 1 (editable)</option>
            <option value="2">Envío Tipo 2 (Según peso)</option>
          </select>
        </div>

        {envioTipo === "1" && (
          <div>
            <label htmlFor="envioTipo1" className="block font-medium">
              Costo de Envío Tipo 1
            </label>
            <input
              type="number"
              id="envioTipo1"
              className="w-full mt-1 p-2 border rounded"
              value={envioTipo1}
              onChange={(e) => setEnvioTipo1(parseFloat(e.target.value))}
            />
          </div>
        )}

        {envioTipo === "2" && (
          <div>
            <label className="block font-medium">Peso del Envío</label>
            <select
              className="w-full mt-1 p-2 border rounded"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
            >
              <option value="De 1 a 2 Kg">De 1 a 2 Kg ($5.802,50)</option>
              <option value="De 2 a 5 Kg">De 2 a 5 Kg ($7.717,50)</option>
              <option value="De 5 a 10 Kg">De 5 a 10 Kg ($9.166,00)</option>
              <option value="De 10 a 15 Kg">De 10 a 15 Kg ($10.607,00)</option>
              <option value="De 15 a 20 Kg">De 15 a 20 Kg ($12.441,50)</option>
              <option value="De 20 a 25 Kg">De 20 a 25 Kg ($14.844,00)</option>
              <option value="De 25 a 30 Kg">De 25 a 30 Kg ($20.374,00)</option>
            </select>
          </div>
        )}

        <div className="mt-4 p-4 bg-gray-200 rounded">
          <p className="text-lg font-bold">
            Resultado: ${resultado.toFixed(2)}
          </p>
        </div>
      </div>
    </main>
  );
}