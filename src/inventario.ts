import { Bien } from './bien.js';
import { ColeccionBienes, JsonColeccionBienes } from './coleccionBienes.js';
import { Cliente } from './cliente.js';
import { ColeccionClientes } from './coleccionClientes.js';
import { Mercader } from './mercader.js'
import { ColeccionMercaderes } from './coleccionMercaderes.js';
import { Transaccion } from './transaccion.js';
import { ColeccionTransacciones } from './coleccionTransacciones.js';

/**
 * Clase Inventario
 */
export class Inventario {
  accessor bienes: JsonColeccionBienes;
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
  constructor(bienes: JsonColeccionBienes, mercaderes: ColeccionMercaderes, clientes: ColeccionClientes, transacciones: ColeccionTransacciones = new ColeccionTransacciones()) {
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