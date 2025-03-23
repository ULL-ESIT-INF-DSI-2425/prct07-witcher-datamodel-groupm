import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Mercader } from '../src/module/mercader.js';
import { ColeccionMercaderes } from '../src/coleccion/coleccionMercaderes.js';

describe('ColeccionMercaderes', () => {
  let coleccion: ColeccionMercaderes;
  let mercader1: Mercader;
  let mercader2: Mercader;

  beforeEach(() => {
    mercader1 = new Mercader(1, 'Geralt', 'Herrero', 'Novigrado');
    mercader2 = new Mercader(2, 'Yennefer', 'Alquimista', 'Velen');
    coleccion = new ColeccionMercaderes([mercader1]);
  });

  it('debería añadir un mercader a la colección', () => {
    coleccion.añadir(mercader2);
    expect(coleccion.mercaderes.length).toBe(2);
  });

  it('debería lanzar un error al añadir un mercader con un ID existente', () => {
    expect(() => coleccion.añadir(mercader1)).toThrow('Mercader con ID 1 ya existe.');
  });

  it('debería eliminar un mercader de la colección', () => {
    coleccion.eliminar(1);
    expect(coleccion.mercaderes.length).toBe(0);
  });

  it('debería lanzar un error al eliminar un mercader no existente', () => {
    expect(() => coleccion.eliminar(3)).toThrow('Mercader con ID 3 no existe.');
  });

  it('debería modificar el nombre de un mercader', () => {
    coleccion.modificar(1, 'nombre', 'Lambert');
    expect(mercader1.nombre).toBe('Lambert');
  });

  it('debería modificar la profesión de un mercader', () => {
    coleccion.modificar(1, 'profesion', 'Alquimista');
    expect(mercader1.profesion).toBe('Alquimista');
  });

  it('debería modificar el lugar de un mercader', () => {
    coleccion.modificar(1, 'lugar', 'Velen');
    expect(mercader1.lugar).toBe('Velen');
  });

  it('debería lanzar un error al modificar un mercader no existente', () => {
    expect(() => coleccion.modificar(3, 'nombre', 'Lambert')).toThrow('Mercader con ID 3 no existe.');
  });

  it('debería lanzar un error al modificar un campo no existente', () => {
    expect(() => coleccion.modificar(1, 'edad', '30')).toThrow('Campo edad no existe en Mercader.');
  });

  it('debería buscar mercaderes por ID', () => {
    const result = coleccion.buscar('ID', '1');
    expect(result.mercaderes.length).toBe(1);
    expect(result.mercaderes[0].nombre).toBe('Geralt');
  });

  it('debería buscar mercaderes por nombre', () => {
    const result = coleccion.buscar('Nombre', 'Geralt');
    expect(result.mercaderes.length).toBe(1);
    expect(result.mercaderes[0].nombre).toBe('Geralt');
  });

  it('debería buscar mercaderes por profesión', () => {
    const result = coleccion.buscar('Profesion', 'Herrero');
    expect(result.mercaderes.length).toBe(1);
    expect(result.mercaderes[0].profesion).toBe('Herrero');
  });

  it('debería buscar mercaderes por lugar', () => {
    const result = coleccion.buscar('Lugar', 'Novigrado');
    expect(result.mercaderes.length).toBe(1);
    expect(result.mercaderes[0].lugar).toBe('Novigrado');
  });

  it('debería lanzar un error al buscar por un campo no existente', () => {
    expect(() => coleccion.buscar('Edad', '30')).toThrow('Ha ocurrido un error a la hora de hacer la busqueda de un cliente');
  });

  it('debería imprimir todos los mercaderes en la colección', () => {
    console.table = vi.fn();
    coleccion.print();
    expect(console.table).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ ID: 1, Nombre: 'Geralt', Profesion: 'Herrero', Lugar: 'Novigrado' })
    ]));
  });
});