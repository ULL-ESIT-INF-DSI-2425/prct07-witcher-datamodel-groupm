import { test, expect, describe, vi } from 'vitest'
import { Bien, Material } from '../src/bien'
import { ColeccionBienes } from '../src/coleccionBienes'

describe("Prueba de la clase ColeccionBienes", () => {
  test("Añade un bien a la colección", () => {
    const coleccion = new ColeccionBienes()
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    coleccion.añadir(bien)
    expect(coleccion.bienes.length).toBe(1)
    expect(coleccion.bienes[0]).toBe(bien)
  })

  test("Elimina un bien de la colección", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    coleccion.eliminar(1)
    expect(coleccion.bienes.length).toBe(0)
  })

  test("Modifica un bien de la colección", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    coleccion.modificar(1, 'nombre', 'Espada mágica')
    expect(coleccion.bienes[0].nombre).toBe('Espada mágica')
  })

  test("Busca un bien en la colección por nombre", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    const resultado = coleccion.buscar('nombre', 'Espada')
    expect(resultado.bienes.length).toBe(1)
    expect(resultado.bienes[0]).toBe(bien)
  })

  test("Ordena los bienes por nombre", () => {
    const bien1 = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const bien2 = new Bien(2, "Arco", "Arco de madera", "Cuero endurecido" as Material, 1, 15)
    const coleccion = new ColeccionBienes([bien1, bien2])
    const resultado = coleccion.ordenarPorNombre(coleccion)
    expect(resultado.bienes[0].nombre).toBe("Arco")
    expect(resultado.bienes[1].nombre).toBe("Espada")
  })

  test("Ordena los bienes por valor", () => {
    const bien1 = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const bien2 = new Bien(2, "Arco", "Arco de madera", "Cuero endurecido" as Material, 1, 15)
    const coleccion = new ColeccionBienes([bien1, bien2])
    const resultado = coleccion.ordenarPorValor(coleccion)
    expect(resultado.bienes[0].valor).toBe(10)
    expect(resultado.bienes[1].valor).toBe(15)
  })
})
