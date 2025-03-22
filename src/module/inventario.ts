import { Bien } from './bien.js';
import { JsonColeccionBienes } from '../db/jsonColeccionBienes.js';
import { JsonColeccionClientes } from '../db/jsonColeccionClientes.js';
import { JsonColeccionMercaderes } from '../db/jsonColeccionMercaderes.js';
import { JsonColeccionTransacciones } from '../db/jsonColeccionTransacciones.js';

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
  constructor() {
    this.bienes = new JsonColeccionBienes();
    this.mercaderes = new JsonColeccionMercaderes();
    this.clientes = new JsonColeccionClientes();
    this.transacciones = new JsonColeccionTransacciones();
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