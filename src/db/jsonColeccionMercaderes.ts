import { ColeccionMercaderes } from '../coleccion/coleccionMercaderes.js';
import { Mercader, Lugar, Profesion } from '../module/mercader.js';
import { JSONFile, Low } from 'lowdb';


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
    const adapter = new JSONFile<JsonMercader>('src/db/data/mercaderes.json');
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