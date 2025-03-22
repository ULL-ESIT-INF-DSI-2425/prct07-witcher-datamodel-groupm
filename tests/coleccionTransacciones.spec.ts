import { describe, it ,test, expect, beforeEach, vi } from 'vitest';
import { Transaccion } from '../src/module/transaccion.js';
import { Bien, Material } from '../src/module/bien.js';
import { Cliente, Raza } from '../src/module/cliente.js';
import { Mercader, Profesion, Lugar } from '../src/module/mercader.js';
import { ColeccionTransacciones} from '../src/coleccion/coleccionTransacciones.js';

describe("Colección Transacciones", () => {
  let coleccion: ColeccionTransacciones;
  let transaccion1: Transaccion;
  let transaccion2: Transaccion;

  beforeEach(() => {
    transaccion1 = new Transaccion(1, "venta",[new Bien(1, "Espada", "Espada de acero", "Acero" as Material, 2, 10)], 1, new Cliente(1, 'John Doe', 'Humano', 'Gondor' as Lugar), new Mercader(1, 'Geralt', 'Herrero', 'Novigrado'));
    transaccion2 = new Transaccion(2, "compra",[new Bien(1, "Arco", "Arco de madera", "Madera" as Material, 2, 10), new Bien(2, "Escudo", "Escudo de madera", "Madera" as Material, 1, 5)], 15, new Cliente(2, 'Jane Doe', 'Elfo', 'Rivendell' as Lugar), new Mercader(2, 'Yennefer', 'Alquimista', 'Velen'));
    coleccion = new ColeccionTransacciones([transaccion1]);
  });

  it('debería crear una instancia de ColeccionTransacciones', () => {
    expect(coleccion).toBeInstanceOf(ColeccionTransacciones);
    expect(coleccion.transacciones.length).toBe(1);
  });

  it('debería añadir una transacción a la colección', () => {
    coleccion.añadir(transaccion2);
    expect(coleccion.transacciones.length).toBe(2);
  });

  it('debería lanzar un error al añadir una transacción con un ID existente', () => {
    expect(() => coleccion.añadir(transaccion1)).toThrowError('Transacción con ID 1 ya existe.');
  });
  
  it('debería registrar una nueva transacción', () => {
    coleccion.registrar(2, "compra",[new Bien(1, "Armadura", "Armadura de acero", "Acero" as Material, 2, 10), new Bien(2, "Escudo", "Escudo de madera", "Madera" as Material, 1, 5)], 15, new Cliente(2, 'Jane Doe', 'Elfo', 'Rivendell' as Lugar), new Mercader(2, 'Yennefer', 'Alquimista', 'Velen'));
    expect(coleccion.transacciones.length).toBe(2);
  });

  it('debería buscar transacciones por ID de cliente o mercader', () => {
    const result = coleccion.buscarPorPersonaID(1);
    expect(result.transacciones.length).toBe(1);
  });

  it('debería mostrar los bienes más demandados', () => {
    const result = coleccion.bienesDemandados();
    expect(result).toBeInstanceOf(Map);
  });

  it('debería lanzar un error al buscar una transacción no existente', () => {
    expect(() => coleccion.buscarPorPersonaID(3)).toThrowError('Transacción con ID 3 no existe.');
  });

  it('debería imprimir la información de todas las transacciones en la colección en formato de tabla', () => {
    const spy = vi.spyOn(console, 'table');
    coleccion.añadir(transaccion2);
    coleccion.print();
    expect(spy).toHaveBeenCalledWith([
      {
        ID: 1,
        Tipo: "venta",
        Fecha: transaccion1.fecha.toLocaleDateString(),
        Bienes: "Espada",
        Monto: 1,
        Cliente: "John Doe",
        Mercader: "Geralt"
      },
      {
        ID: 2,
        Tipo: "compra",
        Fecha: transaccion2.fecha.toLocaleDateString(),
        Bienes: "Arco, Escudo",
        Monto: 15,
        Cliente: "Jane Doe",
        Mercader: "Yennefer"
      }
    ]);
  });

});