import { Cliente } from "./cliente.js";
import { Mercader } from "./mercader.js";
import { Bienes } from "./bienes.js";

export class Transaccion {
  private _id: string;
  private _fecha: Date;
  private _tipo: 'compra' | 'venta' | 'devolucion';
  private _bienes: Bienes[];
  private _cliente?: Cliente; // Cliente involucrado (si es una venta o devolución)
  private _mercader?: Mercader; // Mercader involucrado (si es una compra)
  private _monto: number;

  constructor(id: string, tipo: 'compra' | 'venta' | 'devolucion', bienes: Bienes[], monto: number, cliente?: Cliente, mercader?: Mercader) {
    this._id = id;
    this._fecha = new Date(); // Fecha actual
    this._tipo = tipo;
    this._bienes = bienes;
    this._monto = monto;
    this._cliente = cliente;
    this._mercader = mercader;

    // Validación básica
    if (tipo === 'venta' && !cliente) {
      throw new Error('Una venta debe tener un cliente asociado.');
    }
    if (tipo === 'compra' && !mercader) {
      throw new Error('Una compra debe tener un mercader asociado.');
    }
  }

  // Getters y Setters
  get id(): string {
    return this._id;
  }

  get fecha(): Date {
    return this._fecha;
  }

  get tipo(): 'compra' | 'venta' | 'devolucion' {
    return this._tipo;
  }

  get bienes(): Bienes[] {
    return this._bienes;
  }

  get cliente(): Cliente | undefined {
    return this._cliente;
  }

  get mercader(): Mercader | undefined {
    return this._mercader;
  }

  get monto(): number {
    return this._monto;
  }

  set id(value: string) {
    this._id = value;
  }

  set fecha(value: Date) {
    this._fecha = value;
  }

  set tipo(value: 'compra' | 'venta' | 'devolucion') {
    this._tipo = value;
  }

  set bienes(value: Bienes[]) {
    this._bienes = value;
  }

  set cliente(value: Cliente | undefined) {
    this._cliente = value;
  }

  set mercader(value: Mercader | undefined) {
    this._mercader = value;
  }

  set monto(value: number) {
    this._monto = value;
  }

  // Método para obtener detalles de la transacción
  print(): void {
    console.log( 
      `
      Transacción ID: ${this.id}
      Tipo: ${this.tipo}
      Fecha: ${this.fecha.toLocaleDateString()}
      Bienes: ${this.bienes.map(item => item.nombre).join(', ')}
      Monto: ${this.monto} coronas
      Cliente: ${this.cliente ? this.cliente.nombre : 'N/A'}
      Mercader: ${this.mercader ? this.mercader.nombre : 'N/A'}
    `);
  }
}