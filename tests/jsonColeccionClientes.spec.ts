import { describe,test, expect, beforeEach, vi } from 'vitest';
import inquirer from 'inquirer';
import { JsonColeccionBienes } from '../src/db/jsonColeccionBienes';
import { Bien } from '../src/module/bien';
import { ColeccionBienes } from '../src/coleccion/coleccionBienes';

describe('JsonColeccionBienes', () => {
  let jsonColeccionBienes: JsonColeccionBienes;
  beforeEach(() => {
    jsonColeccionBienes = new JsonColeccionBienes();
    jsonColeccionBienes['clientesDatabase'] = { data: { bien: [] }, read: vi.fn(), write: vi.fn() };
  });

  test('constructor', () => {
    expect(jsonColeccionBienes).toBeDefined();
  });

  test('initialize', () => {
    expect(jsonColeccionBienes.bienes).toHaveLength(0);
  });

  test('actualizarBase', () => {
    const bienes: Bien[] = [
      new Bien(1, 'Bicicleta', 'Una bicicleta de montaña', 'Acero de Mahakam', 15, 200),
      new Bien(2, 'Mesa', 'Una mesa de madera para el hogar', 'Cuero endurecido', 30, 50),
    ];
    jsonColeccionBienes.bienes = bienes;
    expect(jsonColeccionBienes.bienes).toEqual(bienes);
  });

  // test('añadir', () => {
  //   const bien = new Bien(1, 'Bicicleta', 'Una bicicleta de montaña', 'Acero de Mahakam', 15, 200);
  //   jsonColeccionBienes.añadir(bien);
  //   expect(jsonColeccionBienes.bienes).toHaveLength(1);
  //   expect(jsonColeccionBienes.bienes[0]).toEqual(bien);
  // });

  // test('eliminar', () => {
  //   const bienes = [
  //     new Bien(1, 'Bicicleta', 'Una bicicleta de montaña', 'Acero de Mahakam', 15, 200),
  //     new Bien(2, 'Mesa', 'Una mesa de madera para el hogar', 'Cuero endurecido', 30, 50),
  //   ];
  //   jsonColeccionBienes.bienes = bienes;
  //   jsonColeccionBienes.eliminar(1);
  //   expect(jsonColeccionBienes.bienes).toHaveLength(1);
  //   expect(jsonColeccionBienes.bienes[0]).toEqual(bienes[1]);
  // });
});
