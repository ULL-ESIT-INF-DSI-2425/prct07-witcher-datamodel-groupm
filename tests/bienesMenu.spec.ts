import { describe, it ,test, expect, beforeEach, vi } from 'vitest';
import inquirer from 'inquirer';
import { bienesMenu, añadirBien, eliminarBien, modificarBien } from '../src/menu/bienesMenu.js';
import { JsonColeccionBienes } from '../src/db/jsonColeccionBienes.js';
import { Bien, Material } from '../src/module/bien.js';

describe('bienesMenu', () => {
  let bienes: JsonColeccionBienes;

  beforeEach(() => {
    bienes = new JsonColeccionBienes();
  });

  test('debería crear una instancia de bienesMenu', () => {
    expect(bienesMenu).toBeDefined();
  });
});

describe('añadirBien', () => {
  let bienes: JsonColeccionBienes;

  beforeEach(() => {
    bienes = new JsonColeccionBienes();
    bienes['bienesDatabase'] = { data: { bien: [] }, read: vi.fn(), write: vi.fn() }; 
  });

  test('debería añadir un bien a la colección', async () => {
    const spyLog = vi.spyOn(console, 'log');
    const spyPrompt = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ // mockResolvedValue es una función de Jest que permite devolver un valor específico al resolver la promesa
      id: 1,
      nombre: 'Espada',
      descripcion: 'Espada de acero',
      material: 'Acero',
      peso: 2,
      valor: 10,
    });

    await añadirBien(bienes);

    expect(spyLog).toHaveBeenCalledWith('Bien añadido con éxito.\n');
    expect(spyPrompt).toHaveBeenCalled();
    // Restaurar los mocks
    spyLog.mockRestore();
    spyPrompt.mockRestore();
  });
});

// describe('eliminarBien', () => {
//   let bienes: JsonColeccionBienes;

//   beforeEach(() => {
//     bienes = new JsonColeccionBienes();
//     bienes['bienesDatabase'] = { data: { bien: [] }, read: vi.fn(), write: vi.fn() }; 
//   });

//   test('debería eliminar un bien de la colección', async () => {
//     const producto: Bien = {
//       id: 1,
//       nombre: 'Espada',
//       descripcion: 'Espada de acero',
//       material: 'Cuero endurecido',
//       peso: 2,
//       valor: 10,
//     }
//     bienes.añadir(producto);
//     const spyLog = vi.spyOn(console, 'log');
//     const spyPrompt = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ // mockResolvedValue es una función de Jest que permite devolver un valor específico al resolver la promesa
//       id: 1,
//     });

//     await eliminarBien(bienes);

//     expect(spyLog).toHaveBeenCalledWith('Bien eliminado con éxito.\n\n');
//     expect(spyPrompt).toHaveBeenCalled();
//     // Restaurar los mocks
//     spyLog.mockRestore();
//     spyPrompt.mockRestore();
//   });
// });

// describe('modificarBien', () => {
//   let bienes: JsonColeccionBienes;

//   beforeEach(() => {
//     bienes = new JsonColeccionBienes();
//   });

//   test('debería modificar un bien de la colección', async () => {
//     const spyLog = vi.spyOn(console, 'log');
//     const spyPrompt = vi.spyOn(inquirer, 'prompt').mockResolvedValue({ // mockResolvedValue es una función de Jest que permite devolver un valor específico al resolver la promesa
//       id: 1,
//       nombre: 'Espada',
//       descripcion: 'Espada de acero',
//       material: 'Acero',
//       peso: 2,
//       valor: 10,
//     });

//     await modificarBien(bienes);

//     expect(spyLog).toHaveBeenCalledWith('Bien modificado con éxito.\n');
//     expect(spyPrompt).toHaveBeenCalled();
//     // Restaurar los mocks
//     spyLog.mockRestore();
//     spyPrompt.mockRestore();
//   });
// });