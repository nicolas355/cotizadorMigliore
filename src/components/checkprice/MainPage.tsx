"use client"

import { useState, useEffect } from "react"

export default function MainPageCheckPrice() {
  const [price, setPrice] = useState<number>(0)
  const [cuotas, setCuotas] = useState<string>("Cuota promocionada")
  const [envioTipo, setEnvioTipo] = useState<string>("1")
  const [peso, setPeso] = useState<string>("De 1 a 2 Kg")
  const [envioTipo1, setEnvioTipo1] = useState<number>(7000)
  const [showEdit, setShowEdit] = useState<boolean>(false)

  // Estado para almacenar los porcentajes de comisiones en forma decimal.
  const [cuotasPorcentajes, setCuotasPorcentajes] = useState<
    Record<string, number>
  >({
    "Cuota promocionada": 0.04,
    "3 cuotas": 0.074,
    "6 cuotas": 0.119,
    "9 cuotas": 0.165,
    "12 cuotas": 0.21,
    "3 cuotas SIMPLE": 0.0655,
    "6 cuotas SIMPLE": 0.1284,
  })

  // Al montar el componente, se intenta cargar la configuración guardada en localStorage.
  useEffect(() => {
    const savedData = localStorage.getItem("cuotasPorcentajes")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setCuotasPorcentajes(parsed)
      } catch (error) {
        console.error("Error al parsear los porcentajes guardados:", error)
      }
    }
  }, [])

  const handlePercentageChange = (key: string, value: number) => {
    setCuotasPorcentajes((prev) => ({ ...prev, [key]: value }))
  }

  const guardarCambios = () => {
    localStorage.setItem("cuotasPorcentajes", JSON.stringify(cuotasPorcentajes))
    alert("Los cambios se han guardado permanentemente.")
  }

  const calcularResultado = () => {
    // Se utiliza el porcentaje editado o por defecto según la opción de cuotas.
    const cuotaComision = price * (cuotasPorcentajes[cuotas] || 0)

    // Envíos
    const envioTipo2Costos: Record<string, number> = {
      "De 1 a 2 Kg": 5802.5,
      "De 2 a 5 Kg": 7717.5,
      "De 5 a 10 Kg": 9166,
      "De 10 a 15 Kg": 10607,
      "De 15 a 20 Kg": 12441.5,
      "De 20 a 25 Kg": 14844,
      "De 25 a 30 Kg": 20374,
    }

    const envio = envioTipo === "1" ? envioTipo1 : envioTipo2Costos[peso]

    // Total final
    return price - envio - cuotaComision
  }

  const resultado = calcularResultado()

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

        {/* Agrupamos el select de cuotas y el botón a la derecha en una fila */}
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <label className="block font-medium">Cuotas</label>
            <select
              className="w-full mt-1 p-2 border rounded"
              value={cuotas}
              onChange={(e) => setCuotas(e.target.value)}
            >
              <option value="Cuota promocionada">
                Cuota promocionada | Pagás{" "}
                {(cuotasPorcentajes["Cuota promocionada"] * 100).toFixed(2)}%
              </option>
              <option value="3 cuotas">
                3 cuotas | Pagás{" "}
                {(cuotasPorcentajes["3 cuotas"] * 100).toFixed(2)}%
              </option>
              <option value="6 cuotas">
                6 cuotas | Pagás{" "}
                {(cuotasPorcentajes["6 cuotas"] * 100).toFixed(2)}%
              </option>
              <option value="9 cuotas">
                9 cuotas | Pagás{" "}
                {(cuotasPorcentajes["9 cuotas"] * 100).toFixed(2)}%
              </option>
              <option value="12 cuotas">
                12 cuotas | Pagás{" "}
                {(cuotasPorcentajes["12 cuotas"] * 100).toFixed(2)}%
              </option>
              <option value="3 cuotas SIMPLE">
                3 cuotas SIMPLE | Pagás{" "}
                {(cuotasPorcentajes["3 cuotas SIMPLE"] * 100).toFixed(2)}%
              </option>
              <option value="6 cuotas SIMPLE">
                6 cuotas SIMPLE | Pagás{" "}
                {(cuotasPorcentajes["6 cuotas SIMPLE"] * 100).toFixed(2)}%
              </option>
            </select>
          </div>

          <button
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
            onClick={() => setShowEdit(!showEdit)}
          >
            {showEdit ? "Ocultar edición" : "Editar porcentajes de cuotas"}
          </button>
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

        {/* Panel de edición de porcentajes con inputs al 100% */}
        {showEdit && (
          <div className="mt-4 space-y-2 border-t pt-4">
            {Object.keys(cuotasPorcentajes).map((key) => (
              <div key={key} className="flex items-center space-x-2 w-full">
                <label className="w-48 font-medium">{key} (%):</label>
                <input
                  type="number"
                  className="flex-1 p-1 border rounded"
                  value={(cuotasPorcentajes[key] * 100).toFixed(2)}
                  onChange={(e) => {
                    const newVal = parseFloat(e.target.value) / 100
                    if (!isNaN(newVal)) {
                      handlePercentageChange(key, newVal)
                    }
                  }}
                />
              </div>
            ))}
            <button
              className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={guardarCambios}
            >
              Aplicar cambios permanentemente
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
