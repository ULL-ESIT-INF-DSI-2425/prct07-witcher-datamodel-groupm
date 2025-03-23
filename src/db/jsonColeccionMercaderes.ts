import { ColeccionMercaderes } from '../coleccion/coleccionMercaderes.js';
import { Mercader, Lugar, Profesion } from '../module/mercader.js';
import { JSONFile, Low } from 'lowdb';
import { Database } from '../interfaces/database.js';

/**
 * Tipo de datos para la colección de mercaderes en formato JSON
 */
type JsonMercader = {
  mercader: {
    id: number;
    nombre: string;
    profesion: Profesion;
    lugar: Lugar;
  }[];
};

/**
 * Clase para gestionar una colección de mercaderes en formato JSON
 */
export class JsonColeccionMercaderes extends ColeccionMercaderes implements Database<Mercader> {
  private mercaderesDatabase: Low<JsonMercader>;

  /**
   * Constructor de la clase
   * @param mercaderes - Lista de mercaderes
   */
  constructor(mercaderes: Mercader[] = []) {
    super();
    const adapter = new JSONFile<JsonMercader>('src/db/data/mercaderes.json');
    this.mercaderesDatabase = new Low(adapter);
    this.initialize(mercaderes);
  }

  /**
   * Función para inicializar la base de datos de mercaderes
   * @param mercaderes - Lista de mercaderes
   */
  public async initialize(mercaderes: Mercader[] = []): Promise<void> {

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

  /**
   * Función para añadir un mercader a la colección
   * @param mercader - Mercader a añadir
   */
  añadir(mercader: Mercader) {
    super.añadir(mercader);
    this.actualizarBase();
  }

  /**
   * Función para eliminar un mercader según el ID
   * @param id - ID del mercader a eliminar
   */
  eliminar(id: number) {
    super.eliminar(id);
    this.actualizarBase();
  }

  /**
   * Función para modificar un mercader de la colección
   * @param id - Identificador del mercader
   * @param campo - Campo a modificar
   * @param valor - Valor nuevo
   */
  modificar(id: number, campo: string, valor: string) {
    super.modificar(id, campo, valor);
    this.actualizarBase();
  }

  /**
   * Función para actualizar la base de datos con los cambios realizados
   */
  public actualizarBase(): void {
    this.mercaderesDatabase.data!.mercader = this.mercaderes.map(mercader => ({
      id: mercader.id,
      nombre: mercader.nombre,
      profesion: mercader.profesion,
      lugar: mercader.lugar
    }));
    this.mercaderesDatabase.write();
  }
}