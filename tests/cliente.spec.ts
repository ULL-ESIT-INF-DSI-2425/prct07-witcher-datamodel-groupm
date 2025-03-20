import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Cliente, ColeccionClientes, Raza } from '../src/cliente';
import { Lugar } from '../src/mercader';

describe('Cliente', () => {
  let cliente: Cliente;

  beforeEach(() => {
    cliente = new Cliente(1, 'John Doe', 'Humano', 'Gondor' as Lugar);
  });

  it('debería crear una instancia de Cliente', () => {
    expect(cliente).toBeInstanceOf(Cliente);
    expect(cliente.id).toBe(1);
    expect(cliente.nombre).toBe('John Doe');
    expect(cliente.raza).toBe('Humano');
    expect(cliente.lugar).toBe('Gondor');
  });

  it('debería imprimir la información del cliente', () => {
    console.log = vi.fn();
    cliente.print();
    expect(console.log).toHaveBeenCalledWith(
      `ID: 1\nNombre: John Doe\nRaza: Humano\nLugar: Gondor`
    );
  });
});

describe('ColeccionClientes', () => {
  let coleccion: ColeccionClientes;
  let cliente1: Cliente;
  let cliente2: Cliente;

  beforeEach(() => {
    cliente1 = new Cliente(1, 'John Doe', 'Humano', 'Gondor' as Lugar);
    cliente2 = new Cliente(2, 'Jane Doe', 'Elfo', 'Rivendell' as Lugar);
    coleccion = new ColeccionClientes([cliente1]);
  });

  it('debería crear una instancia de ColeccionClientes', () => {
    expect(coleccion).toBeInstanceOf(ColeccionClientes);
    expect(coleccion.clientes.length).toBe(1);
  });

  it('debería añadir un cliente a la colección', () => {
    coleccion.añadir(cliente2);
    expect(coleccion.clientes.length).toBe(2);
  });

  it('debería lanzar un error al añadir un cliente con un ID existente', () => {
    expect(() => coleccion.añadir(cliente1)).toThrowError('Cliente con ID 1 ya existe.');
  });

  it('debería eliminar un cliente de la colección', () => {
    coleccion.eliminar(1);
    expect(coleccion.clientes.length).toBe(0);
  });

  it('debería lanzar un error al eliminar un cliente no existente', () => {
    expect(() => coleccion.eliminar(3)).toThrowError('Cliente con ID 3 no existe.');
  });

  it('debería modificar el nombre de un cliente', () => {
    coleccion.modificar(1, 'nombre', 'John Smith');
    expect(coleccion.clientes[0].nombre).toBe('John Smith');
  });

  it('debería lanzar un error al modificar un cliente no existente', () => {
    expect(() => coleccion.modificar(3, 'nombre', 'John Smith')).toThrowError('Cliente con ID 3 no existe.');
  });

  it('debería buscar clientes por nombre', () => {
    const result = coleccion.buscar('Nombre', 'John');
    expect(result.clientes.length).toBe(1);
    expect(result.clientes[0].nombre).toBe('John Doe');
  });

  it('debería buscar clientes por raza', () => {
    const result = coleccion.buscar('Raza', 'Humano');
    expect(result.clientes.length).toBe(1);
    expect(result.clientes[0].raza).toBe('Humano');
  });

  it('debería buscar clientes por lugar', () => {
    const result = coleccion.buscar('Lugar', 'Gondor');
    expect(result.clientes.length).toBe(1);
    expect(result.clientes[0].lugar).toBe('Gondor');
  });

  it('debería imprimir la información de todos los clientes', () => {
    console.log = vi.fn();
    coleccion.print();
    expect(console.log).toHaveBeenCalledTimes(1);
  });
});