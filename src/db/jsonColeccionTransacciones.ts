import { ColeccionTransacciones } from '../coleccion/coleccionTransacciones.js';
import { Transaccion } from '../module/transaccion.js';
import { Bien } from '../module/bien.js';
import { Cliente } from '../module/cliente.js';
import { Mercader } from '../module/mercader.js';
import { JSONFile, Low } from 'lowdb';

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

/**
 * Clase para gestionar una colección de transacciones en formato JSON
 */
export class JsonColeccionTransacciones extends ColeccionTransacciones {
  
  private transaccionesDatebase: Low<JsonTransacciones>;
  /**
   * Constructor de la clase JsonColeccionTransacciones
   * @param transacciones - objeto de tipo JsonTransacciones
   */
  constructor(transacciones: Transaccion[] = []) {
    super();
    const adapter = new JSONFile<JsonTransacciones>('src/db/data/transacciones.json');
    this.transaccionesDatebase = new Low(adapter);
    this.initialize(transacciones);
  }

  /**
   * Función para inicializar la base de datos de transacciones
   * @param transacciones - Lista de transacciones
   */
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

  /**
   * Función para añadir una transacción a la base de datos
   * @param transaccion - objeto de tipo Transaccion
   */
  añadir(transaccion: Transaccion) {
    super.añadir(transaccion);
    this.actualizarBase();
  }

  /**
   * Función para registrar una transacción
   * @param id - id de la transacción
   * @param tipo - tipo de transacción
   * @param bienes - lista de bienes
   * @param monto - monto de la transacción
   * @param cliente - objeto de tipo Cliente
   * @param mercader - objeto de tipo Mercader
   */
  registrar(id: number, tipo: 'compra' | 'venta' | 'devolucion', bienes: Bien[], monto: number, cliente: Cliente, mercader: Mercader) {
    super.registrar(id, tipo, bienes, monto, cliente, mercader);
    this.actualizarBase();
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
   * Función para actualizar la base de datos con los cambios realizados
   */
  private actualizarBase() {
    // if (!this.transaccionesDatebase.data) {
    //   this.transaccionesDatebase.data = { transaccion: [] };
    // }
    this.transaccionesDatebase.data!.transaccion = this.transacciones.map(transaccion => ({
      id: transaccion.id,
      fecha: transaccion.fecha,
      tipo: transaccion.tipo,
      bienes: transaccion.bienes.map(b => ({
        id: b.id,
        nombre: b.nombre,
        descripcion: b.descripcion,
        material: b.material,
        peso: b.peso,
        valor: b.valor
      })) as Bien[],
      cliente: {
        id: transaccion.cliente.id,
        nombre: transaccion.cliente.nombre,
        raza: transaccion.cliente.raza,
        lugar: transaccion.cliente.lugar
      } as Cliente,
      mercader: {
        id: transaccion.mercader.id,
        nombre: transaccion.mercader.nombre,
        profesion: transaccion.mercader.profesion,
        lugar: transaccion.mercader.lugar
      } as Mercader,
      monto: transaccion.monto
    }));
    this.transaccionesDatebase.write();
  }
}