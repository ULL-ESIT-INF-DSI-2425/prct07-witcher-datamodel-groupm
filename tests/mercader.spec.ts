import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Mercader, Profesion, Lugar } from '../src/mercader';

describe('Mercader', () => {
    let mercader: Mercader;

    beforeEach(() => {
        mercader = new Mercader(1, 'Geralt', 'Herrero', 'Novigrado');
    });

    it('debería crear un mercader con las propiedades correctas', () => {
        expect(mercader.id).toBe(1);
        expect(mercader.nombre).toBe('Geralt');
        expect(mercader.profesion).toBe('Herrero');
        expect(mercader.lugar).toBe('Novigrado');
    });

    it('debería imprimir la información del mercader', () => {
        console.log = vi.fn();
        mercader.print();
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('ID: 1'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Nombre: Geralt'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Profesión: Herrero'));
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('Lugar: Novigrado'));
    });
});

