import { Bienes, Material } from './bienes.js';
import { Cliente, Raza } from './cliente.js';
import { Mercader, Profesion, Lugar } from './mercader.js';
import { Transaccion } from './transaccion.js';



export class Inventario {
  private _bienes: Bienes[]
  private _mercaderes: Mercader[]
  private _clientes: Cliente[]
  private _transacciones: Transaccion[]

  constructor(bienes: Bienes[], mercaderes: Mercader[], clientes: Cliente[], transacciones: Transaccion[] = []) {
    this._bienes = bienes;
    this._mercaderes = mercaderes;
    this._clientes = clientes;
    this._transacciones = transacciones;
  }

  get bienes() {
    return this._bienes;
  }

  get mercaderes() {
    return this._mercaderes;
  }

  get clientes() {
    return this._clientes;
  }

  get transacciones() {
    return this._transacciones;
  }

  set bienes(bienes: Bienes[]) {
    this._bienes = bienes;
  }

  set mercaderes(mercaderes: Mercader[]) {
    this._mercaderes = mercaderes;
  }

  set clientes(clientes: Cliente[]) {
    this._clientes = clientes;
  }

  set transacciones(transacciones: Transaccion[]) {
    this._transacciones = transacciones;
  }

  // Funciones para agregar

  addBien(bien: string) {
    const [id, nombre, descripcion, material, peso, valor] = bien.split("-");
    if (this._bienes.some(b => b.id === Number(id))) {
      throw new Error(`Bien con ID ${id} ya existe.`);
    }
    this._bienes.push(new Bienes(Number(id), nombre, descripcion, material as Material, Number(peso), Number(valor)));
  }

  addMercader(mercader: string) {
    const [id, nombre, profesion, lugar] = mercader.split("-");
    if (this._mercaderes.some(m => m.id === Number(id))) {
      throw new Error(`Mercader con ID ${id} ya existe.`);
    }
    this._mercaderes.push(new Mercader(Number(id), nombre, profesion as Profesion, lugar as Lugar));
  }

  addCliente(cliente: string) {
    const [id, nombre, raza, lugar] = cliente.split("-");
    if (this._clientes.some(c => c.id === Number(id))) {
      throw new Error(`Cliente con ID ${id} ya existe.`);
    }
    this._clientes.push(new Cliente(Number(id), nombre, raza as Raza, lugar as Lugar));
  }

  // Funciones para remover

  removeBien(id: number) {
    const bienIndex = this._bienes.findIndex(b => b.id === id);
    if (bienIndex === -1) {
      throw new Error(`Bien con ID ${id} no existe.`);
    }
    this._bienes.splice(bienIndex, 1);
  }

  removeMercader(id: number) {
    const mercaderIndex = this._mercaderes.findIndex(m => m.id === id);
    if (mercaderIndex === -1) {
      throw new Error(`Mercader con ID ${id} no existe.`);
    }
    this._mercaderes.splice(mercaderIndex, 1);
  }

  removeCliente(id: number) {
    const clienteIndex = this._clientes.findIndex(c => c.id === id);
    if (clienteIndex === -1) {
      throw new Error(`Cliente con ID ${id} no existe.`);
    }
    this._clientes.splice(clienteIndex, 1);
  }

  // Funciones para modificar
  modifyBien(id: number, campo: string, valor: string) {
    const bien = this._bienes.find(b => b.id === id);
    if (!bien) {
      throw new Error(`Bien con ID ${id} no existe.`);
    }
    switch (campo) {
      case 'nombre':
        bien.nombre = valor;
        break;
      case 'descripcion':
        bien.descripcion = valor;
        break;
      case 'material':
        bien.material = valor as Material;
        break;
      case 'peso':
        bien.peso = Number(valor);
        break;
      case 'valor':
        bien.valor = Number(valor);
        break;
      default:
        throw new Error(`Campo ${campo} no existe en Bien.`);
    }
  }

  modifyCliente(id: number, campo: string, valor: string) {
    const cliente = this._clientes.find(c => c.id === id);
    if (!cliente) {
      throw new Error(`Cliente con ID ${id} no existe.`);
    }
    switch (campo) {
      case 'nombre':
        cliente.nombre = valor;
        break;
      case 'raza':
        cliente.raza = valor as Raza;
        break;
      case 'lugar':
        cliente.lugar = valor as Lugar;
        break;
      default:
        throw new Error(`Campo ${campo} no existe en Cliente.`);
    }
  }

  modifyMercader(id: number, campo: string, valor: string) {
    const mercader = this._mercaderes.find(m => m.id === id);
    if (!mercader) {
      throw new Error(`Mercader con ID ${id} no existe.`);
    }
    switch (campo) {
      case 'nombre':
        mercader.nombre = valor;
        break;
      case 'profesion':
        mercader.profesion = valor as Profesion;
        break;
      case 'lugar':
        mercader.lugar = valor as Lugar;
        break;
      default:
        throw new Error(`Campo ${campo} no existe en Mercader.`);
    }
  }

  // Metodos de busqueda

  buscarBienes(criterio: 'nombre' | 'descripcion' | 'material', valor: string) {
    switch (criterio) {
      case 'nombre':
        return this._bienes.filter(b => b.nombre.includes(valor));
      case 'descripcion':
        return this._bienes.filter(b => b.descripcion.includes(valor));
      case 'material':
        return this._bienes.filter(b => b.material === valor as Material);
      default:
        throw new Error(`Criterio ${criterio} no es válido.`);
    }
  }

  ordenarBienesPorNombre(bienes: Bienes[], ascendente: boolean = true) {
    return bienes.sort((a, b) => {
      if (ascendente) {
        return a.nombre > b.nombre ? 1 : -1;
      } else {
        return a.nombre < b.nombre ? 1 : -1;
      }
    });
  }

  ordenarBienesPorValor(bienes: Bienes[], ascendente: boolean = true) {
    return bienes.sort((a, b) => ascendente ? a.valor - b.valor : b.valor - a.valor);
  }

  mostrar() {
    console.log('Bienes:');
    console.table(this._bienes.map(b => ({
      ID: b.id,
      Nombre: b.nombre,
      Descripción: b.descripcion,
      Material: b.material,
      Peso: b.peso,
      Valor: b.valor
    })));

    console.log('Mercaderes:');
    console.table(this._mercaderes.map(m => ({
      ID: m.id,
      Nombre: m.nombre,
      Profesion: m.profesion,
      Lugar: m.lugar
    })));

    console.log('Clientes:');
    console.table(this._clientes.map(c => ({
      ID: c.id,
      Nombre: c.nombre,
      Raza: c.raza,
      Lugar: c.lugar
    })));
  }
}