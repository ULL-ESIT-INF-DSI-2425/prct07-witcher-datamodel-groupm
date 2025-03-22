import { Cliente } from "./cliente.js";
import { Mercader } from "./mercader.js";
import { Bien } from "./bien.js";

/**
 * Clase Transaccion  
 */
export class Transaccion {
  accessor id: number;
  accessor fecha: Date;
  accessor tipo: 'compra' | 'venta' | 'devolucion';
  accessor bienes: Bien[];
  accessor cliente: Cliente;
  accessor mercader: Mercader; 
  accessor monto: number;

  /**
   * Constructor de la clase Transaccion
   * @param id - Identificador único de la transacción
   * @param tipo - Tipo de transacción
   * @param bienes - Bienes involucrados en la transacción
   * @param monto - Monto de la transacción
   * @param cliente - Cliente
   * @param mercader - Mercader
   */
  constructor(id: number, tipo: 'compra' | 'venta' | 'devolucion', bienes: Bien[], monto: number, cliente: Cliente, mercader: Mercader) {
    this.id = id;
    this.fecha = new Date(); // Fecha actual
    this.tipo = tipo;
    this.bienes = bienes;
    this.monto = monto;
    this.cliente = cliente;
    this.mercader = mercader;
  }

  /**
   * Método para imprimir la información de la transacción
   */
  print(): void {
    console.log( 
      `Transacción ID: ${this.id}
      Tipo: ${this.tipo}
      Fecha: ${this.fecha.toLocaleDateString()}
      Bienes: ${this.bienes.map(item => item.nombre).join(', ')}
      Monto: ${this.monto} coronas
      Cliente: ${this.cliente.nombre}'}
      Mercader: ${this.mercader.nombre}'}`
    );
  }
}