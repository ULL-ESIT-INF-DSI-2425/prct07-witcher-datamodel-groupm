import { Lugar } from './mercader.js';

/**
 * Tipo Raza = 'Humano' | 'Elfo' | 'Enano' | 'Hechicero'
 */
export type Raza = 'Humano' | 'Elfo' | 'Enano' | 'Hechicero';

/**
 * Clase Cliente
 */
export class Cliente {
  /**
   * Constructor de la clase Cliente
   * @param _id 
   * @param _nombre 
   * @param _raza 
   * @param _lugar 
   */
  constructor(private _id: number, private _nombre: string, private _raza: Raza, private _lugar: Lugar) {
  }

  /**
   * Getter de id
   * @returns
   */
  get id() {
    return this._id;
  }

  /**
   * Setter de id
   * @param - id
   */
  set id(id: number) {
    this._id = id;
  }

  /**
   * Getter de nombre
   * @returns nombre
   */
  get nombre() {
    return this._nombre;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  /**
   * Getter de raza
   * @returns raza
   */
  get raza() {
    return this._raza;
  }

  /**
   * Setter de raza
   * @param - raza
   */
  set raza(raza: Raza) {
    this._raza = raza;
  }

  /**
   * Getter de lugar
   * @returns lugar
   */
  get lugar() {
    return this._lugar;
  }

  /**
   * Setter de lugar
   * @param - lugar
   */
  set lugar(lugar: Lugar) {
    this._lugar = lugar;
  }

  /**
   * Método para imprimir la información del cliente
   */
  print(): void {
    console.log(`ID: ${this._id} - Nombre: ${this._nombre}`);
  }
};

