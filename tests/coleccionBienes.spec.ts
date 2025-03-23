import { test, expect, describe, vi } from 'vitest'
import { Bien, Material } from '../src/module/bien.js'
import { ColeccionBienes } from '../src/coleccion/coleccionBienes.js'

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


  test("Lanza una excepción al intentar añadir un bien con un ID ya existente", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    expect(() => coleccion.añadir(bien)).toThrowError('Bien con ID 1 ya existe.')
  })

  test("Lanza una excepción al intentar eliminar un bien que no existe", () => {
    const coleccion = new ColeccionBienes()
    expect(() => coleccion.eliminar(1)).toThrowError('Bien con ID 1 no existe.')
  })

  test("Modifica el nombre de un bien de la colección", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    coleccion.modificar(1, 'nombre', 'Espada mágica')
    expect(coleccion.bienes[0].nombre).toBe('Espada mágica')
  })

  test("Modifica el material de un bien de la colección", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    coleccion.modificar(1, 'material', 'Acero de Hattori')
    expect(coleccion.bienes[0].material).toBe('Acero de Hattori')
  })

  test("Modifica el valor de un bien de la colección", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    coleccion.modificar(1, 'valor', '20')
    expect(coleccion.bienes[0].valor).toBe(20)
  })

  test("Modifica el peso de un bien de la colección", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    coleccion.modificar(1, 'peso', '5')
    expect(coleccion.bienes[0].peso).toBe(5)
  })

  test("Modifica la descripción de un bien de la colección", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    coleccion.modificar(1, 'descripcion', 'Espada de acero forjada por enanos')
    expect(coleccion.bienes[0].descripcion).toBe('Espada de acero forjada por enanos')
  })

  test("Lanza una excepción al intentar modificar un campo que no existe", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    expect(() => coleccion.modificar(1, 'aura', '5')).toThrowError('Campo aura no existe en Bien.')
  })


  test("Lanza una excepción al intentar modificar un bien que no existe", () => {
    const coleccion = new ColeccionBienes()
    expect(() => coleccion.modificar(1, 'nombre', 'Espada mágica')).toThrowError('Bien con ID 1 no existe.')
  })

  test("Busca un bien en la colección por ID", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    const resultado = coleccion.buscar('ID', '1')
    expect(resultado.bienes.length).toBe(1)
    expect(resultado.bienes[0]).toBe(bien)
  })

  test("Busca un bien en la colección por nombre", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    const resultado = coleccion.buscar('nombre', 'Espada')
    expect(resultado.bienes.length).toBe(1)
    expect(resultado.bienes[0]).toBe(bien)
  })

  test("Busca un bien en la colección por descripción", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    const resultado = coleccion.buscar('descripcion', 'acero')
    expect(resultado.bienes.length).toBe(1)
    expect(resultado.bienes[0]).toBe(bien)
  })

  test("Busca un bien en la colección por material", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    const resultado = coleccion.buscar('material', 'Acero de Mahakam')
    expect(resultado.bienes.length).toBe(1)
    expect(resultado.bienes[0]).toBe(bien)
  })

  test("Busca un bien en la colección por peso", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    const resultado = coleccion.buscar('peso', '2')
    expect(resultado.bienes.length).toBe(1)
    expect(resultado.bienes[0]).toBe(bien)
  })

  test("Busca un bien en la colección por valor", () => {
    const bien = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const coleccion = new ColeccionBienes([bien])
    const resultado = coleccion.buscar('valor', '10')
    expect(resultado.bienes.length).toBe(1)
    expect(resultado.bienes[0]).toBe(bien)
  })

  test("Lanza una excepción al intentar buscar por un criterio que no existe", () => {
    const coleccion = new ColeccionBienes()
    expect(() => coleccion.buscar('aura', '5')).toThrowError('Criterio aura no es válido.')
  })

  test("Ordena los bienes por nombre ascendente", () => {
    const bien1 = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const bien2 = new Bien(2, "Arco", "Arco de madera", "Cuero endurecido" as Material, 1, 15)
    const coleccion = new ColeccionBienes([bien1, bien2])
    const resultado = coleccion.ordenarPorNombre(coleccion)
    expect(resultado.bienes[0].nombre).toBe("Arco")
    expect(resultado.bienes[1].nombre).toBe("Espada")
  })

  test("Ordena los bienes por nombre ascendente", () => {
    const bien1 = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const bien2 = new Bien(2, "Arco", "Arco de madera", "Cuero endurecido" as Material, 1, 15)
    const coleccion = new ColeccionBienes([bien2, bien1])
    const resultado = coleccion.ordenarPorNombre(coleccion)
    expect(resultado.bienes[0].nombre).toBe("Arco")
    expect(resultado.bienes[1].nombre).toBe("Espada")
  })

  test("Ordena los bienes por nombre de forma descendente", () => {
    const bien1 = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const bien2 = new Bien(2, "Arco", "Arco de madera", "Cuero endurecido" as Material, 1, 15)
    const coleccion = new ColeccionBienes([bien1, bien2])
    const resultado = coleccion.ordenarPorNombre(coleccion, false)
    expect(resultado.bienes[0].nombre).toBe("Espada")
    expect(resultado.bienes[1].nombre).toBe("Arco")
  })

  test("Ordena los bienes por nombre de forma descendente", () => {
    const bien1 = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const bien2 = new Bien(2, "Arco", "Arco de madera", "Cuero endurecido" as Material, 1, 15)
    const coleccion = new ColeccionBienes([bien2, bien1])
    const resultado = coleccion.ordenarPorNombre(coleccion, false)
    expect(resultado.bienes[0].nombre).toBe("Espada")
    expect(resultado.bienes[1].nombre).toBe("Arco")
  })

  test("Ordena los bienes por valor ascendente", () => {
    const bien1 = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const bien2 = new Bien(2, "Arco", "Arco de madera", "Cuero endurecido" as Material, 1, 15)
    const coleccion = new ColeccionBienes([bien1, bien2])
    const resultado = coleccion.ordenarPorValor(coleccion)
    expect(resultado.bienes[0].valor).toBe(10)
    expect(resultado.bienes[1].valor).toBe(15)
  })

  test("Ordena los bienes por valor descendente", () => {
    const bien1 = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const bien2 = new Bien(2, "Arco", "Arco de madera", "Cuero endurecido" as Material, 1, 15)
    const coleccion = new ColeccionBienes([bien1, bien2])
    const resultado = coleccion.ordenarPorValor(coleccion, false)
    expect(resultado.bienes[0].valor).toBe(15)
    expect(resultado.bienes[1].valor).toBe(10)
  })

  test("Muestra la información de los bienes con metodo print", () => {
    const bien1 = new Bien(1, "Espada", "Espada de acero", "Acero de Mahakam" as Material, 2, 10)
    const bien2 = new Bien(2, "Arco", "Arco de madera", "Cuero endurecido" as Material, 1, 15)
    const coleccion = new ColeccionBienes([bien1, bien2])
    // Espía en console.log
  const spyLog = vi.spyOn(console, 'table');
  // Llama al método print
  coleccion.print();
  // Verifica que console.log haya sido llamado con los argumentos esperados
  expect(spyLog).toHaveBeenCalledWith(
    [
      { ID: 1, Nombre: 'Espada', Descripción: 'Espada de acero', Material: 'Acero de Mahakam', Peso: 2, Valor: 10 },
      { ID: 2, Nombre: 'Arco', Descripción: 'Arco de madera', Material: 'Cuero endurecido', Peso: 1, Valor: 15 }
    ]
  );
  // Restaura el espía
  spyLog.mockRestore();
  })

})
