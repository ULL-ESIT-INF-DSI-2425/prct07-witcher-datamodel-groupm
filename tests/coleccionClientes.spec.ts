import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Cliente, Raza } from '../src/module/cliente.js';
import { Lugar } from '../src/module/mercader.js';
import { ColeccionClientes } from '../src/coleccion/coleccionClientes.js';

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

    it('debería modificar la raza de un cliente', () => {
      coleccion.modificar(1, 'raza', 'Elfo');
      expect(coleccion.clientes[0].raza).toBe('Elfo');
    });

    it('debería modificar el lugar de un cliente', () => {
      coleccion.modificar(1, 'lugar', 'Rivendell');
      expect(coleccion.clientes[0].lugar).toBe('Rivendell');
    });

    it('debería lanzar un error al modificar un campo no existente', () => {
      expect(() => coleccion.modificar(1, 'aura', 'Elfo')).toThrowError('Campo aura no existe en Cliente.');
    });
  
    it('debería lanzar un error al modificar un cliente no existente', () => {
      expect(() => coleccion.modificar(3, 'nombre', 'John Smith')).toThrowError('Cliente con ID 3 no existe.');
    });
  
    it('debería buscar clientes por ID', () => {
      const result = coleccion.buscar('ID', '1');
      expect(result.clientes.length).toBe(1);
      expect(result.clientes[0].id).toBe(1);
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

    it('debería lanzar un error al buscar por un campo no existente', () => {
      expect(() => coleccion.buscar('Aura', 'Gondor')).toThrowError('Ha ocurrido un error a la hora de hacer la busqueda de un cliente');
    });
  
    it('debería imprimir la información de todos los clientes', () => {
      console.log = vi.fn();
      coleccion.print();
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });