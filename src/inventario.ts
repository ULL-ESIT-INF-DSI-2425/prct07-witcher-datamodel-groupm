import { ColeccionBienes, Bien } from './bien.js';
import { ColeccionClientes, Cliente } from './cliente.js';
import { ColeccionMercaderes, Mercader } from './mercader.js'
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
   * Método que devuelve el número de bienes en el inventario según un criterio de búsqueda
   * 
   * @param criterio - Criterio de búsqueda
   * @param valor - Valor a buscar
   * @returns Numero de bienes encontrados segun el criterio de búsqueda
   */
  stock(criterio: 'nombre' | 'descripcion' | 'material', valor: string): number {
    return this.bienes.buscar(criterio, valor).bienes.length;
  }

  /**
   * Método que registra una transaccion en el inventario
   * 
   * @param transaccion - Transacción a registrar
   */
  registrarTransaccion(transaccion: Transaccion): void {
    this.transacciones.añadir(transaccion);
  }

  /**
   * Método para imprimir la información de los bienes
   */
  printBienes() {
    console.log('Bienes:');
    console.table(this.bienes.bienes.map(b => ({
      ID: b.id,
      Nombre: b.nombre,
      Descripción: b.descripcion,
      Material: b.material,
      Peso: b.peso,
      Valor: b.valor
    })));
  }

  /**
   * Método para imprimir la información de los mercaderes
   */
  printMercaderes() {
    console.log('Mercaderes:');
    console.table(this.mercaderes.mercaderes.map(m => ({
      ID: m.id,
      Nombre: m.nombre,
      Profesion: m.profesion,
      Lugar: m.lugar
    })));
  }

  /**
   * Método para imprimir la información de los clientes
   */
  printClientes() {
    console.log('Clientes:');
    console.table(this.clientes.clientes.map(c => ({
      ID: c.id,
      Nombre: c.nombre,
      Raza: c.raza,
      Lugar: c.lugar
    })));
  }

  /**
   * Método para imprimir la información de las transacciones
   */
  printTransacciones() {
    console.log('Transacciones:');
    console.table(this.transacciones.transacciones.map(t => ({
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