import { Cliente, Raza } from "./cliente.js";
import { Lugar } from './mercader.js';
import { JSONFile, Low } from 'lowdb';

/**
 * Clase que representa una coleccion de Clientes
 */
export class ColeccionClientes {
  accessor clientes: Cliente[]

  /**
   * Constructor de la clase ColeccionClientes
   * @param clientes - Clientes de la coleccion
   */
  constructor(clientes: Cliente[] = []) {
    this.clientes = clientes
  }

  /**
   * Método que añade un cliente a la coleccion
   * @param cliente - Cliente a añadir
   */
  añadir(cliente: Cliente): void {
    if (this.clientes.some(c => c.id === cliente.id)) {
      throw new Error(`Cliente con ID ${cliente.id} ya existe.`);
    }
    this.clientes.push(cliente)
  }

  /**
   * Método que elimina a un cliente de la coleccion
   * @param id - ID del cliente a eliminar
   */
  eliminar(id: number): void {
    const clienteIndex = this.clientes.findIndex(c => c.id === id);
    if (clienteIndex === -1) {
      throw new Error(`Cliente con ID ${id} no existe.`);
    }
    this.clientes.splice(clienteIndex, 1);
  }

  /**
   * Método para modificar un valor de un cliente especificado por el id
   * @param id - ID del cliente a modificar
   * @param campo - Campo a modificar
   * @param valor - Valor a modificar
   */
  modificar(id: number, campo: string, valor: string): void {
    const cliente = this.clientes.find(c => c.id === id);
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

  /**
   * Método que permite buscar un cliente por nombre, raza o tipo
   * @param campo - Campo por el que se va a buscar
   * @param busqueda - Valor a buscar
   * @returns ColeccionClientes
   */
  buscar(campo: "ID" | "Raza" | "Nombre" | "Lugar", busqueda: string): ColeccionClientes {
    switch (campo) {
      case "ID":
        return new ColeccionClientes(this.clientes.filter(c => c.id.toString() === busqueda));
      case "Nombre":
        return new ColeccionClientes(this.clientes.filter(c => c.nombre.includes(busqueda)));
      case "Raza":
        return new ColeccionClientes(this.clientes.filter(c => c.raza === busqueda));
      case "Lugar":
        return new ColeccionClientes(this.clientes.filter(c => c.lugar === busqueda));
      default:
        throw new Error(`Ha ocurrido un error a la hora de hacer la busqueda de un cliente`);
    }
  }

  /**
   * Método para imprimir la información de los clientes
   */
  print() {
    console.table(this.clientes.map(c => ({
      ID: c.id,
      Nombre: c.nombre,
      Raza: c.raza,
      Lugar: c.lugar
    })));
  }
}

type JSONClientes = {
  cliente: {
    id: number,
    nombre: string,
    raza: Raza,
    lugar: Lugar
  }[];
};

export class JsonColeccionClientes extends ColeccionClientes {

  private clientesDatabase: Low<JSONClientes>

  constructor(clientes: Cliente[] = []) {
    super();
    const adapter = new JSONFile<JSONClientes>('data/clientes.json');
    this.clientesDatabase = new Low(adapter);
    this.initialize(clientes);
  }

  private async initialize(clientes: Cliente[] = []) {
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

  añadir(cliente: Cliente) {
    super.añadir(cliente);
    this.actualizarBase();
  }

  eliminar(id: number) {
    super.eliminar(id);
    this.actualizarBase();
  }

  modificar(id: number, campo: string, valor: string) {
    super.modificar(id, campo, valor);
    this.actualizarBase();
  }

  private actualizarBase() {
    this.clientesDatabase.data!.cliente = this.clientes.map(cliente => ({
      id: cliente.id,
      nombre: cliente.nombre,
      raza: cliente.raza,
      lugar: cliente.lugar
    }));
    this.clientesDatabase.write();
  }
}
