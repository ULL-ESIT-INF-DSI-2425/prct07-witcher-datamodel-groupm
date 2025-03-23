import { ColeccionBienes } from '../coleccion/coleccionBienes.js';
import { Bien, Material } from '../module/bien.js';
import { Low, JSONFile } from 'lowdb';
import { Database } from '../interfaces/database.js';

/**
 * Tipo de datos para un bien en formato JSON
 */
type JsonBienes = {
  bien: {
    id: number,
    nombre: string,
    descripcion: string,
    material: Material,
    peso: number,
    valor: number
  }[];
};

/**
 * Clase para gestionar una colección de bienes en formato JSON
 */
export class JsonColeccionBienes extends ColeccionBienes implements Database<Bien> {

  private bienesDatabase: Low<JsonBienes>;

  /**
   * Constructor de la clase
   * @param bienes - Lista de bienes
   */
  constructor(bienes: Bien[] = []) {
    super();
    const adapter = new JSONFile<JsonBienes>('src/db/data/bienes.json');
    this.bienesDatabase = new Low(adapter);
    this.initialize(bienes);
  }

  /**
   * Función para inicializar la base de datos de bienes
   * @param bienes - Lista de bienes
   */
  public async initialize(bienes: Bien[] = []) {
    try {
      // Intentar leer la base de datos
      await this.bienesDatabase.read();
  
      // Si la base de datos está vacía o no tiene datos válidos, inicializarla. Es decir, cuando en el fichero aparezca { bien: [] }
      if (!this.bienesDatabase.data || !Array.isArray(this.bienesDatabase.data.bien)) {
        this.bienesDatabase.data = { bien: bienes };
        await this.bienesDatabase.write();
      } else {
        // Validar cada objeto en la base de datos
        this.bienesDatabase.data.bien.forEach((bien) => {
          if (bien.id && bien.nombre && bien.descripcion && bien.material && bien.peso && bien.valor) {
            this.bienes.push(
              new Bien(bien.id, bien.nombre, bien.descripcion, bien.material, bien.peso, bien.valor)
            );
          }
        });
      }
  
      // Si no hay bienes válidos, inicializar con los bienes proporcionados
      if (this.bienes.length === 0) {
        this.bienes = bienes;
        this.actualizarBase();
      }

    // Manejar el caso en que el fichero esté completamente vacío o no exista
    } catch (error) {
      this.bienesDatabase.data = { bien: bienes };
      await this.bienesDatabase.write();
      this.bienes = bienes;
      this.actualizarBase();
    }
  }

  /**
   * Función para añadir un bien a la colección
   * @param bien - Bien a añadir
   */
  añadir(bien: Bien) { 
    super.añadir(bien);
    this.actualizarBase(); 
  }

  /**
   * Función para modificar un bien de la colección
   * @param id - Identificador del bien
   * @param campo - Campo a modificar
   * @param valor - Valor nuevo
   */
  modificar(id: number, campo: string, valor: string) { 
    super.modificar(id, campo, valor);
    this.actualizarBase(); 
  }

  /**
   * Función para eliminar un bien de la colección seguún el ID
   * @param id - Identificador del bien
   */
  eliminar(id: number) {
    super.eliminar(id);
    this.actualizarBase(); 
  }

  /**
   * Función para actualizar la base de datos con los cambios realizados
   */
  public actualizarBase(): void {
    this.bienesDatabase.data!.bien = this.bienes.map(bien => ({
      id: bien.id,
      nombre: bien.nombre,
      descripcion: bien.descripcion,
      material: bien.material,
      peso: bien.peso,
      valor: bien.valor,
    }));
    this.bienesDatabase.write();
  }
}