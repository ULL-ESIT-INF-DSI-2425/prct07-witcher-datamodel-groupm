import { Bien } from './bien.js';
import { ColeccionBienes, JsonColeccionBienes } from './coleccionBienes.js';
import { Cliente } from './cliente.js';
import { ColeccionClientes, JsonColeccionClientes } from './coleccionClientes.js';
import { Mercader } from './mercader.js'
import { ColeccionMercaderes, JsonColeccionMercaderes } from './coleccionMercaderes.js';
import { Transaccion } from './transaccion.js';
import { ColeccionTransacciones, JsonColeccionTransacciones } from './coleccionTransacciones.js';

/**
 * Clase Inventario
 */
export class Inventario {
  accessor bienes: JsonColeccionBienes;
  accessor mercaderes: JsonColeccionMercaderes;
  accessor clientes: JsonColeccionClientes;
  accessor transacciones: JsonColeccionTransacciones;

  /**
   * Constructor de la clase Inventario
   * @param bienes - Array de bienes
   * @param mercaderes - Array de mercaderes
   * @param clientes - Array de clientes
   * @param transacciones - Array de transacciones
   */
  constructor(bienes: JsonColeccionBienes, mercaderes: JsonColeccionMercaderes, clientes: JsonColeccionClientes, transacciones: JsonColeccionTransacciones = new JsonColeccionTransacciones()) {
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