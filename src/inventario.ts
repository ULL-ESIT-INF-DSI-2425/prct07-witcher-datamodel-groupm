import { ColeccionBienes, Bien } from './bien.js';
import { ColeccionClientes, Cliente } from './cliente.js';
import { ColeccionMercaderes, Mercader } from './mercader.js'
import { Transaccion } from './transaccion.js';

/**
 * Clase Inventario
 */
export class Inventario {
  accessor bienes: ColeccionBienes;
  accessor mercaderes: ColeccionMercaderes;
  accessor clientes: ColeccionClientes;
  accessor transacciones: Transaccion[];

  /**
   * Constructor de la clase Inventario
   * @param bienes - Array de bienes
   * @param mercaderes - Array de mercaderes
   * @param clientes - Array de clientes
   * @param transacciones - Array de transacciones
   */
  constructor(bienes: ColeccionBienes, mercaderes: ColeccionMercaderes, clientes: ColeccionClientes, transacciones: Transaccion[] = []) {
    this.bienes = bienes;
    this.mercaderes = mercaderes;
    this.clientes = clientes;
    this.transacciones = transacciones;
  }

  /**
   * Método para imprimir la información del inventario
   */
  print() {
    console.log('Bienes:');
    console.table(this.bienes.bienes.map(b => ({
      ID: b.id,
      Nombre: b.nombre,
      Descripción: b.descripcion,
      Material: b.material,
      Peso: b.peso,
      Valor: b.valor
    })));

    console.log('Mercaderes:');
    console.table(this.mercaderes.mercaderes.map(m => ({
      ID: m.id,
      Nombre: m.nombre,
      Profesion: m.profesion,
      Lugar: m.lugar
    })));

    console.log('Clientes:');
    console.table(this.clientes.clientes.map(c => ({
      ID: c.id,
      Nombre: c.nombre,
      Raza: c.raza,
      Lugar: c.lugar
    })));
  }
}