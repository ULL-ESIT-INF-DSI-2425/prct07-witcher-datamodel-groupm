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
  constructor(mercaderes: Mercader[]) {
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

  constructor(mercaderes: Mercader[]) {
    super(mercaderes);
    const adapter = new JSONFile<JsonMercader>('mercaderes.json');
    this.mercaderesDatabase = new Low(adapter);
    this.initialize(mercaderes);
  }

  private async initialize(mercaderes: Mercader[]) {

    await this.mercaderesDatabase.read();
    
    // Validar si los datos son válidos
    if (!this.mercaderesDatabase.data) {
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
      // A diferencia de los bienes que se le puede pasar al constructor una lista de bienes vacía, en este caso no se puede
      throw new Error("No hay mercaderes en la base de datos.");
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