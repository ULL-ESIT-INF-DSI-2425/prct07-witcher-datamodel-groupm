import { Transaccion } from './transaccion.js';
import { Bien } from './bien.js';
import { Cliente } from './cliente.js';
import { Mercader } from './mercader.js';
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

type JsonTransacciones = {
  transaccion: {
    id: number,
    fecha: Date,
    tipo: 'compra' | 'venta' | 'devolucion',
    bienes: Bien[],
    cliente: Cliente,
    mercader: Mercader,
    monto: number
  }[];
}

export class JsonColeccionTransacciones extends ColeccionTransacciones {
  
  private transaccionesDatebase: Low<JsonTransacciones>;
  /**
   * Constructor de la clase JsonColeccionTransacciones
   * @param transacciones - objeto de tipo JsonTransacciones
   */
  constructor(transacciones: Transaccion[] = []) {
    super();
    const adapter = new JSONFile<JsonTransacciones>('data/transacciones.json');
    this.transaccionesDatebase = new Low(adapter);
    this.initialize();
  }

  private async initialize(transacciones: Transaccion[] = []) {
    try {
      // Intentar leer la base de datos
      await this.transaccionesDatebase.read();

      // Si la base de datos está vacía o no tiene datos válidos, inicializarla. Es decir, cuando en el fichero aparezca { transaccion: [] }
      if (!this.transaccionesDatebase.data || !Array.isArray(this.transaccionesDatebase.data.transaccion)) {
        this.transaccionesDatebase.data = { transaccion: transacciones };
        await this.transaccionesDatebase.write();
      } else {

        // Validar cada objeto en la base de datos
        this.transaccionesDatebase.data.transaccion.forEach((transaccion) => {
          if (transaccion.id && transaccion.fecha && transaccion.tipo && transaccion.bienes && transaccion.cliente && transaccion.mercader) {
            this.transacciones.push(
              new Transaccion(transaccion.id, transaccion.tipo, transaccion.bienes, transaccion.monto, transaccion.cliente, transaccion.mercader)
            );
          }
        });
      }

      // Si no hay transacciones válidas, inicializar con las proporcionadas
      if (transacciones.length == 0) {
        this.transacciones = transacciones;
        this.actualizarBase();
      }
    } catch (error) {
      // Manejar el caso en que el fichero esté completamente vacío o no exista
      this.transaccionesDatebase.data = { transaccion: transacciones };
      await this.transaccionesDatebase.write();
      this.transacciones = transacciones;
      this.actualizarBase();
    }
  }

  añadir(transaccion: Transaccion) {
    super.añadir(transaccion);
    this.actualizarBase();
  }

  registrar(id: number, tipo: 'compra' | 'venta' | 'devolucion', bienes: Bien[], monto: number, cliente: Cliente, mercader: Mercader) {
    super.registrar(id, tipo, bienes, monto, cliente, mercader);
    this.actualizarBase();
  }

  private actualizarBase() {
    this.transaccionesDatebase.data!.transaccion = this.transacciones.map(transaccion => ({
      id: transaccion.id,
      fecha: transaccion.fecha,
      tipo: transaccion.tipo,
      bienes: transaccion.bienes,
      cliente: transaccion.cliente,
      mercader: transaccion.mercader,
      monto: transaccion.monto
    }));
    this.transaccionesDatebase.write();
  }
}