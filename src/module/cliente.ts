import { Lugar } from './mercader.js';
import { Identificable, Persona } from '../interfaces/objetos.js';

/**
 * Tipo Raza = 'Humano' | 'Elfo' | 'Enano' | 'Hechicero'
 */
export type Raza = 'Humano' | 'Elfo' | 'Enano' | 'Hechicero';

/**
 * Clase Cliente
 */
export class Cliente implements Identificable, Persona {
  accessor id: number;
  accessor nombre: string;
  accessor raza: Raza;
  accessor lugar: Lugar;

  /**
   * Constructor de la clase Cliente
   * @param id - Identificador único del cliente
   * @param nombre - Nombre del cliente
   * @param raza - Raza del cliente
   * @param lugar - Lugar de origen del cliente
   */
  constructor(id: number, nombre: string, raza: Raza, lugar: Lugar) {
    this.id = id;
    this.nombre = nombre;
    this.raza = raza;
    this.lugar = lugar;
  }

  /**
   * Método para imprimir la información del cliente
   */
  print(): void {
    console.log(
      `ID: ${this.id}\nNombre: ${this.nombre}\nRaza: ${this.raza}\nLugar: ${this.lugar}`
    );
  }
};
