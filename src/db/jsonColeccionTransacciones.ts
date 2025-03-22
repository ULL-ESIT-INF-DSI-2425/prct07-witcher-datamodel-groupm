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