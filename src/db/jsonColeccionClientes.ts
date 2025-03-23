import { Cliente } from '../module/cliente.js';
import { ColeccionClientes } from '../coleccion/coleccionClientes.js';
import { JSONFile, Low } from 'lowdb';
import { Raza } from '../module/cliente.js';
import { Lugar } from '../module/mercader.js';
import { Database } from '../interfaces/database.js';

/**
 * Tipo de datos para la colección de clientes en formato JSON
 */
type JSONClientes = {
  cliente: {
    id: number,
    nombre: string,
    raza: Raza,
    lugar: Lugar
  }[];
};

/**
 * Clase para gestionar una colección de clientes en formato JSON
 */
export class JsonColeccionClientes extends ColeccionClientes implements Database<Cliente> {

  private clientesDatabase: Low<JSONClientes>

  /**
   * Constructor de la clase
   * @param clientes - Lista de clientes
   */
  constructor(clientes: Cliente[] = []) {
    super();
    const adapter = new JSONFile<JSONClientes>('src/db/data/clientes.json');
    this.clientesDatabase = new Low(adapter);
    this.initialize(clientes);
  }

  /**
   * Función para inicializar la base de datos de clientes
   * @param clientes - Lista de clientes
   */
  public async initialize(clientes: Cliente[] = []) {
    try {
      await this.clientesDatabase.read();

      // Si la base de datos está vacía o no tiene datos válidos, inicializarla. Es decir, cuando en el fichero aparezca { cliente: [] }
      if (!this.clientesDatabase.data || !Array.isArray(this.clientesDatabase.data.cliente)) {
        this.clientesDatabase.data = { cliente: clientes };
        await this.clientesDatabase.write();

      } else {
        // Validar cada objeto en la base de datos
        this.clientesDatabase.data.cliente.forEach((cliente) => {
          if (cliente.id && cliente.nombre && cliente.raza && cliente.lugar) {
            this.clientes.push(
              new Cliente(cliente.id, cliente.nombre, cliente.raza, cliente.lugar)
            );
          }
        });
      }

      // Si no hay bienes válidos, inicializar con los bienes proporcionados
      if (this.clientes.length === 0) {
        this.clientes = clientes;
        this.actualizarBase();
      }

    // Manejar el caso en que el fichero esté completamente vacío o no exista
    } catch (error) {
      this.clientesDatabase.data = { cliente: clientes };
      await this.clientesDatabase.write();
      this.clientes = clientes;
      this.actualizarBase();
    }
  }

  /**
   * Función para añadir un cliente a la colección
   * @param cliente - Cliente a añadir
   */
  añadir(cliente: Cliente) {
    super.añadir(cliente);
    this.actualizarBase();
  }

  /**
   * Función para eliminar un cliente según el ID
   * @param id - ID del cliente a eliminar
   */
  eliminar(id: number) {
    super.eliminar(id);
    this.actualizarBase();
  }

  /**
   * Función para modificar un cliente según el ID, modificar el valor del campo seleccionado
   * @param id - ID del cliente a modificar
   * @param campo - Campo a modificar
   * @param valor - Nuevo valor
   */
  modificar(id: number, campo: string, valor: string) {
    super.modificar(id, campo, valor);
    this.actualizarBase();
  }

  /**
   * Función para actualizar la base de datos con los cambios realizados
   */
  public actualizarBase(): void {
    this.clientesDatabase.data!.cliente = this.clientes.map(cliente => ({
      id: cliente.id,
      nombre: cliente.nombre,
      raza: cliente.raza,
      lugar: cliente.lugar
    }));
    this.clientesDatabase.write();
  }
}
