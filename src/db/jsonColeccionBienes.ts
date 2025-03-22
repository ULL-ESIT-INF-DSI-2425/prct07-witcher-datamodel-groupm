import { ColeccionBienes } from '../coleccion/coleccionBienes.js';
import { Bien, Material } from '../module/bien.js';
import { Low, JSONFile } from 'lowdb';

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

export class JsonColeccionBienes extends ColeccionBienes {

  private bienesDatabase: Low<JsonBienes>;


  constructor(bienes: Bien[] = []) {
    super();
    const adapter = new JSONFile<JsonBienes>('src/db/data/bienes.json');
    this.bienesDatabase = new Low(adapter);
    this.initialize(bienes);
  }

  private async initialize(bienes: Bien[] = []) {
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

  añadir(bien: Bien) {
    super.añadir(bien);
    this.actualizarBase(); 
  }

  modificar(id: number, campo: string, valor: string) {
    super.modificar(id, campo, valor);
    this.actualizarBase(); 
  }

  eliminar(id: number) {
    super.eliminar(id);
    this.actualizarBase(); 
  }

  private actualizarBase() {
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