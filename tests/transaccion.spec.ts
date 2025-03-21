import { describe, test, expect, vi } from 'vitest';
import { Transaccion } from '../src/transaccion';
import { Bien, Material } from '../src/bien';
import { Cliente, Raza } from '../src/cliente';
import { Mercader, Profesion, Lugar } from '../src/mercader';

describe("Prueba de la clase que representa una Transaccion", () => {
  test("Crea una transaccion", () => {
    const transaccion = new Transaccion(1, "venta",[new Bien(1, "Espada", "Espada de acero", "Acero" as Material, 2, 10)], 1, new Cliente(1, 'John Doe', 'Humano', 'Gondor' as Lugar), new Mercader(1, 'Geralt', 'Herrero', 'Novigrado'))
    expect(transaccion.id).toBe(1)
    expect(transaccion.tipo).toBe("venta")
    expect(transaccion.bienes).toEqual([new Bien(1, "Espada", "Espada de acero", "Acero" as Material, 2, 10)])
    expect(transaccion.monto).toBe(1)
    expect(transaccion.cliente).toEqual(new Cliente(1, 'John Doe', 'Humano', 'Gondor' as Lugar))
    expect(transaccion.mercader).toEqual(new Mercader(1, 'Geralt', 'Herrero', 'Novigrado'))
  });

  test("Imprime una transaccion", () => {
    const transaccion = new Transaccion(1, "venta",[new Bien(1, "Espada", "Espada de acero", "Acero" as Material, 2, 10)], 1, new Cliente(1, 'John Doe', 'Humano', 'Gondor' as Lugar), new Mercader(1, 'Geralt', 'Herrero', 'Novigrado'))
    const spy = vi.spyOn(console, 'log')
    transaccion.print()
    expect(spy).toHaveBeenCalledWith(
      `Transacción ID: 1
      Tipo: venta
      Fecha: ${transaccion.fecha.toLocaleDateString()}
      Bienes: Espada
      Monto: 1 coronas
      Cliente: John Doe'}
      Mercader: Geralt'}`
    )
  });

  test("Imprime una transaccion con múltiples bienes", () => {
    const bienes = [
      new Bien(1, "Espada", "Espada de acero", "Acero" as Material, 2, 10),
      new Bien(2, "Escudo", "Escudo de madera", "Madera" as Material, 1, 5)
    ];
    const transaccion = new Transaccion(2, "compra", bienes, 15, new Cliente(2, 'Jane Doe', 'Elfo', 'Rivendell' as Lugar), new Mercader(2, 'Yennefer', 'Alquimista', 'Velen'));
    const spy = vi.spyOn(console, 'log');
    transaccion.print();
    expect(spy).toHaveBeenCalledWith(
      `Transacción ID: 2
      Tipo: compra
      Fecha: ${transaccion.fecha.toLocaleDateString()}
      Bienes: Espada, Escudo
      Monto: 15 coronas
      Cliente: Jane Doe'}
      Mercader: Yennefer'}`
    );
  });
});