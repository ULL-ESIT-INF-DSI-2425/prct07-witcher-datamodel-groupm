import { Identificable } from '../interfaces/objetos.js';

/**
 * Tipo Material = 'Acero de Mahakam' | 'cuero endurecido' | 'esencia mágica' | 'mutágenos de bestias antiguas'
 */
export type Material = 'Acero de Mahakam' | 'Cuero endurecido' | 'Esencia magica' | 'Mutagenos de bestias antiguas';

/**
 * Clase Bien
 */
export class Bien implements Identificable {
  accessor id: number
  accessor nombre: string
  accessor descripcion: string
  accessor material: Material
  accessor peso: number
  accessor valor: number
  
  /**
   * Constructor de la clase Bien
   * @param id - Identificador único del bien
   * @param nombre - Nombre del bien
   * @param descripcion - Descripción del bien
   * @param material - Material del bien
   * @param peso - Peso del bien
   * @param valor - Valor del bien
   */
  constructor(id: number, nombre: string, descripcion: string, material: Material, peso: number, valor: number) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.material = material;
    this.peso = peso;
    this.valor = valor;
  }

  /**
   * Método para imprimir la información del bien
   */
  print(): void {
    console.log(
      `ID: ${this.id}\nNombre: ${this.nombre}\nValor: ${this.valor}\nMaterial: ${this.material}\nPeso: ${this.peso}`
    );
  }
};


