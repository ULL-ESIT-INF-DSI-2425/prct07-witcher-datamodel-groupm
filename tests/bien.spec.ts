import { test, expect, describe, vi } from 'vitest'
import { Bien, Material } from '../src/bien'

describe("Prueba de la clase que representa un Bien", () => {
  test("Crea un bien", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero" as Material, 2, 10)
    expect(bien.id).toBe(1)
    expect(bien.nombre).toBe("Espada")
    expect(bien.descripcion).toBe("Espada de acero")
    expect(bien.material).toBe("Acero")
    expect(bien.peso).toBe(2)
    expect(bien.valor).toBe(10)
  })
  
  test("Imprime un bien", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero" as Material, 2, 10)
    const spy = vi.spyOn(console, 'log')
    bien.print()
    expect(spy).toHaveBeenCalledWith(
      `ID: 1\nNombre: Espada\nValor: 10\nMaterial: Acero\nPeso: 2`
    )
  })
})

describe("Prueba de la clase que representa un Bien", () => {
  test("Crea un bien", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    expect(bien.id).toBe(1)
    expect(bien.nombre).toBe("Espada")
    expect(bien.descripcion).toBe("Espada de acero")
    expect(bien.material).toBe("Acero de Mahakam")
    expect(bien.peso).toBe(2)
    expect(bien.valor).toBe(10)
  })
  
  test("Imprime un bien", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const spy = vi.spyOn(console, 'log')
    bien.print()
    expect(spy).toHaveBeenCalledWith(
      `ID: 1\nNombre: Espada\nValor: 10\nMaterial: Acero de Mahakam\nPeso: 2`
    )
  })
})