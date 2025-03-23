import { describe, it ,test, expect, beforeEach, vi } from 'vitest';
import { Inventario } from '../src/module/inventario.js';

describe('Inventario', () => {
  let inventario: Inventario;

  beforeEach(() => {
    inventario = new Inventario();
  });

  test('Inventario', () => {
    expect(inventario).toBeDefined();
  });

  test('Inventario.bienes', () => {
    expect(inventario.bienes).toBeDefined();
  });

  test('Inventario.mercaderes', () => {
    expect(inventario.mercaderes).toBeDefined();
  });

  test('Inventario.clientes', () => {
    expect(inventario.clientes).toBeDefined();
  });

  test('Inventario.print', () => {
    expect(inventario.print).toBeDefined();
  });

});