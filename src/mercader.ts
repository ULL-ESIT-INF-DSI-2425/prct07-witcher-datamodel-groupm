/**
 * type profesion = 'Herrero' | 'Alquimista' | 'Mercader general';
 */
export type Profesion = 'Herrero' | 'Alquimista' | 'Mercader general';

/**
 * type lugar = 'Novigrado' | 'Velen' | 'Kaer Trolde';
 */
export type Lugar = 'Novigrado' | 'Velen' | 'Kaer Trolde';

/**
 * Clase Mercader
 */
export class Mercader {
  /**
   * Constructor de la clase Mercader
   * @param _id 
   * @param _nombre 
   * @param _profesion 
   * @param _lugar 
   */
  constructor(private _id: number, private _nombre: string, private _profesion: Profesion, private _lugar: Lugar) {
  }

  /**
   * Getter de id
   * @returns id
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
   * Getter de profesion
   * @returns profesion
   */
  get profesion() {
    return this._profesion;
  }

  /**
   * Setter de profesion
   * @param - profesion
   */
  set profesion(profesion: Profesion) {
    this._profesion = profesion;
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

  print(): void {
    console.log(`ID: ${this.id} - Nombre: ${this.nombre}`);
  }
}