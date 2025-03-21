import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Cliente, Raza } from '../src/cliente';
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

