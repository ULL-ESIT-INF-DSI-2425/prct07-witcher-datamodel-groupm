import { Bien } from './bien.js';
import { ColeccionBienes } from './coleccionBienes.js';
import { Cliente } from './cliente.js';
import { ColeccionClientes } from './coleccionClientes.js';
import { Mercader } from './mercader.js'
import { ColeccionMercaderes } from './coleccionMercaderes.js';
import { ColeccionTransacciones, Transaccion } from './transaccion.js';

/**
 * Clase Inventario
 */
export class Inventario {
  accessor bienes: ColeccionBienes;
  accessor mercaderes: ColeccionMercaderes;
  accessor clientes: ColeccionClientes;
  accessor transacciones: ColeccionTransacciones;

  /**
   * Constructor de la clase Inventario
   * @param bienes - Array de bienes
   * @param mercaderes - Array de mercaderes
   * @param clientes - Array de clientes
   * @param transacciones - Array de transacciones
   */
  constructor(bienes: ColeccionBienes, mercaderes: ColeccionMercaderes, clientes: ColeccionClientes, transacciones: ColeccionTransacciones = new ColeccionTransacciones()) {
    this.bienes = bienes;
    this.mercaderes = mercaderes;
    this.clientes = clientes;
    this.transacciones = transacciones;
  }

  /**
   * Método que imprime la información completa del inventario
   */
  print(): void {
    this.bienes.print();
    this.clientes.print();
    this.mercaderes.print();
    this.transacciones.print();
  }
}