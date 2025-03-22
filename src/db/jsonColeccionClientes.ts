import { Cliente } from '../module/cliente.js';
import { ColeccionClientes } from '../coleccion/coleccionClientes.js';
import { JSONFile, Low } from 'lowdb';
import { Raza } from '../module/cliente.js';
import { Lugar } from '../module/mercader.js';

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
    const adapter = new JSONFile<JSONClientes>('src/db/data/clientes.json');
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
