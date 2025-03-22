import { Mercader, Profesion, Lugar } from "./mercader.js";
import { JSONFile, Low } from 'lowdb';

/**
 * Clase que representa una coleccion de Mercaderes
 */
export class ColeccionMercaderes {
  accessor mercaderes: Mercader[];

  /**
   * Constructor de la clase ColeccionMercaderes
   * @param mercaderes - Mercaderes de la coleccion
   */
  constructor(mercaderes: Mercader[] = []) {
    this.mercaderes = mercaderes;
  }

  /**
   * Método que añade un mercader a la coleccion
   * @param mercader - Mercader a añadir
   */
  añadir(mercader: Mercader): void {
    if (this.mercaderes.find(m => m.id === mercader.id)) {
      throw new Error(`Mercader con ID ${mercader.id} ya existe.`);
    }
    this.mercaderes.push(mercader);
  }

  /**
   * Método que elimina un mercader de la coleccion
   * @param id - ID del mercader a eliminar
   */
  eliminar(id: number): void {
    const mercaderIndex = this.mercaderes.findIndex(m => m.id === id);
    if (mercaderIndex === -1) {
      throw new Error(`Mercader con ID ${id} no existe.`);
    }
    this.mercaderes.splice(mercaderIndex, 1);
  }

  /**
   * Método que modifica un campo de un mercader
   * @param id - ID del mercader a modificar
   * @param campo - Campo a modificar
   * @param valor - Valor a asign
   */
  modificar(id: number, campo: string, valor: string): void {
    const mercader = this.mercaderes.find(m => m.id === id);
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

  /**
   * Método que permite buscar un cliente por nombre, Profesion o tipo
   * @param campo - Campo por el que se va a buscar
   * @param busqueda - Valor a buscar
   * @returns ColeccionMercaderes
   */
  buscar(campo: "ID" | "Profesion" | "Nombre" | "Lugar", busqueda: string): ColeccionMercaderes {
    switch (campo) {
      case "ID":
        return new ColeccionMercaderes(this.mercaderes.filter(c => c.id.toString().includes(busqueda)));
      case "Nombre":
        return new ColeccionMercaderes(this.mercaderes.filter(c => c.nombre.includes(busqueda)));
      case "Profesion":
        return new ColeccionMercaderes(this.mercaderes.filter(c => c.profesion.includes(busqueda)));
      case "Lugar":
        return new ColeccionMercaderes(this.mercaderes.filter(c => c.lugar.includes(busqueda)));
      default:
        throw new Error(`Ha ocurrido un error a la hora de hacer la busqueda de un cliente`);
    }
  }

  /**
   * Método para imprimir la información de los mercaderes
   */
  print() {
    console.table(this.mercaderes.map(m => ({
      ID: m.id,
      Nombre: m.nombre,
      Profesion: m.profesion,
      Lugar: m.lugar
    })));
  }
}

type JsonMercader = {
  mercader: {
    id: number;
    nombre: string;
    profesion: Profesion;
    lugar: Lugar;
  }[];
};

export class JsonColeccionMercaderes extends ColeccionMercaderes {
  private mercaderesDatabase: Low<JsonMercader>;

  constructor(mercaderes: Mercader[] = []) {
    super();
    const adapter = new JSONFile<JsonMercader>('data/mercaderes.json');
    this.mercaderesDatabase = new Low(adapter);
    this.initialize(mercaderes);
  }

  private async initialize(mercaderes: Mercader[] = []) {

    try {
      // Intentar leer la base de datos
      await this.mercaderesDatabase.read();
      
      // Si la base de datos está vacía o no tiene datos válidos, inicializarla. Es decir, cuando en el fichero aparezca { mercader: [] }
      if (!this.mercaderesDatabase.data || !Array.isArray(this.mercaderesDatabase.data.mercader)) {
        this.mercaderesDatabase.data = { mercader: mercaderes };
        await this.mercaderesDatabase.write();
      }
      else {
        // Validar cada objeto en la base de datos
        this.mercaderesDatabase.data.mercader.forEach((mercader) => {
          if (mercader.id && mercader.nombre && mercader.profesion && mercader.lugar) {
            this.mercaderes.push(
              new Mercader(mercader.id, mercader.nombre, mercader.profesion, mercader.lugar)
            );
          }
        });
      }
      if (this.mercaderes.length === 0) {
        this.mercaderes = mercaderes;
        this.actualizarBase();
      }
    } catch (error) {
      // Manejar el caso en que el fichero esté completamente vacío o no exista
      this.mercaderesDatabase.data = { mercader: mercaderes };
      await this.mercaderesDatabase.write();
      this.mercaderes = mercaderes;
      this.actualizarBase();
    }
  }

  añadir(mercader: Mercader) {
    super.añadir(mercader);
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
    this.mercaderesDatabase.data!.mercader = this.mercaderes.map(mercader => ({
      id: mercader.id,
      nombre: mercader.nombre,
      profesion: mercader.profesion,
      lugar: mercader.lugar
    }));
    this.mercaderesDatabase.write();
  }
}