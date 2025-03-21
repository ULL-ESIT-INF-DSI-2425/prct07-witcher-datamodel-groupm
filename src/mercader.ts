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
  accessor id: number;
  accessor nombre: string;
  accessor profesion: Profesion;
  accessor lugar: Lugar;

  /**
   * Constructor de la clase Mercader
   * @param id - Identificador único del mercader
   * @param nombre - Nombre del mercader
   * @param profesion - Profesión del mercader
   * @param lugar - Lugar de origen del mercader
   */
  constructor(id: number, nombre: string, profesion: Profesion, lugar: Lugar) {
    this.id = id;
    this.nombre = nombre;
    this.profesion = profesion;
    this.lugar = lugar;
  }

  /**
   * Método para imprimir la información del mercader
   */
  print(): void {
    console.log(
      `ID: ${this.id}
      Nombre: ${this.nombre}
      Profesión: ${this.profesion}
      Lugar: ${this.lugar}`
    );
  }
}


