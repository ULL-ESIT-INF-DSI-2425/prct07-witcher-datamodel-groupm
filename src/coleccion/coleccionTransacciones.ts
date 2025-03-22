import { Transaccion } from '../module/transaccion.js';
import { Bien } from '../module/bien.js';
import { Cliente } from '../module/cliente.js';
import { Mercader } from '../module/mercader.js';
import { JsonColeccionTransacciones } from '../db/jsonColeccionTransacciones.js';
import { JSONFile, Low } from 'lowdb';

/**
 * Clase que representa una coleccion de Transacciones
 */
export class ColeccionTransacciones {
  accessor transacciones: Transaccion[];

  /**
   * Constructor de la clase ColeccionTransacciones
   * @param transacciones - objeto de tipo Transaccion
   */
  constructor(transacciones: Transaccion[] = []) {
    this.transacciones = transacciones;
  }

  /**
   * Método para añadir una transacción a la colección
   * @param transaccion - objeto de tipo Transaccion
   */
  añadir(transaccion: Transaccion): void {
    const id = this.transacciones.findIndex(t => t.id === transaccion.id);
    if (id !== -1) {
      throw new Error(`Transacción con ID ${transaccion.id} ya existe.`);
    }
    this.transacciones.push(transaccion);
  }

  /**
   * Método para registrar una nueva transacción
   * @param id - Identificador único de la transacción
   * @param tipo - Tipo de transacción
   * @param bienes - Bienes involucrados en la transacción
   * @param monto - Monto de la transacción
   * @param cliente - Cliente
   * @param mercader - Mercader
   */
  registrar(id: number, tipo: 'compra' | 'venta' | 'devolucion', bienes: Bien[], monto: number, cliente: Cliente, mercader: Mercader): void {
    const transaccion = new Transaccion(id, tipo, bienes, monto, cliente, mercader);
    this.añadir(transaccion);
  }

  /**
   * Método para buscar una transacción por su ID
   * @param id - Identificador único de la transacción
   * @returns objeto de tipo Transaccion
   */
  buscarPorPersonaID(id: number): JsonColeccionTransacciones {
    if (!this.transacciones.some(t => t.cliente.id === id || t.mercader.id === id)) {
      throw new Error(`Transacción con ID ${id} no existe.`);
    }
    return new JsonColeccionTransacciones(this.transacciones.filter(t => t.cliente.id === id || t.mercader.id === id));
  }

  /**
   * Método para mostrar los bienes más demandados
   * @returns map con los bienes más demandados
   */
  bienesDemandados(): Map<string, number> {
    // Crear un mapa para contar las ocurrencias de cada bien en transacciones de tipo 'venta'
    const contador = new Map<string, number>();
  
    this.transacciones
      .filter(t => t.tipo === 'venta') // Filtrar solo las transacciones de tipo 'venta'
      .forEach(t => {
        t.bienes.forEach(b => {
          contador.set(b.nombre, (contador.get(b.nombre) || 0) + 1);
        });
      });
  
    // Ordenar el mapa por la cantidad de ocurrencias (de mayor a menor)
    const contadorOrdenado = new Map(
      Array.from(contador.entries()).sort((a, b) => b[1] - a[1]) // Ordenar por valor (cantidad)
    );
  
    return contadorOrdenado;
  }

  /**
    * Método para imprimir la información de las transacciones
    */
  print() {
    console.table(this.transacciones.map(t => ({
      ID: t.id,
      Fecha: t.fecha.toLocaleDateString(),
      Tipo: t.tipo,
      Bienes: t.bienes.map(b => b.nombre).join(', '),
      Monto: t.monto,
      Cliente: t.cliente.nombre,
      Mercader: t.mercader.nombre
    })));
  }
}

