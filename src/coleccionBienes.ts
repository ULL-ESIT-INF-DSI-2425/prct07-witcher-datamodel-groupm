import { Bien, Material } from './bien.js';
import { JSONFile, Low } from 'lowdb';

/**
 * Clase que representa una coleccion de Bienes
 */
export class ColeccionBienes {
  accessor bienes: Bien[];
  
  /**
   * Constructor de la clase ColeccionBienes
   * @param bienes - Bienes de la coleccion
   */
  constructor(bienes: Bien[] = []) {
    this.bienes = bienes;
  }

  /**
   * Método que añade un bien a la coleccion
   * @param bien - Bien a añadir
   */
  añadir(bien: Bien) {
    if (this.bienes.some(b => b.id === bien.id)) {
      throw new Error(`Bien con ID ${bien.id} ya existe.`);
    }
    this.bienes.push(bien);
  }

  /**
   * Método que elimina un bien de la coleccion
   * @param id - ID del bien
   */
  eliminar(id: number) {
    const bienIndex = this.bienes.findIndex(b => b.id === id);
    if (bienIndex === -1) {
      throw new Error(`Bien con ID ${id} no existe.`);
    }
    this.bienes.splice(bienIndex, 1);
  }

  /**
   * Método que modifica un bien de la coleccion
   * @param id - ID del bien
   * @param campo - Campo a modificar
   * @param valor - Valor a asignar
   */
  modificar(id: number, campo: string, valor: string) {
    const bien = this.bienes.find(b => b.id === id);
    if (!bien) {
      throw new Error(`Bien con ID ${id} no existe.`);
    }
    switch (campo) {
      case 'nombre':
        bien.nombre = valor;
        break;
      case 'descripcion':
        bien.descripcion = valor;
        break;
      case 'material':
        bien.material = valor as Material;
        break;
      case 'peso':
        bien.peso = Number(valor);
        break;
      case 'valor':
        bien.valor = Number(valor);
        break;
      default:
        throw new Error(`Campo ${campo} no existe en Bien.`);
    }
  }

  /**
   * Método que busca un bien en la coleccion
   * @param criterio - Criterio de busqueda
   * @param valor - Valor a buscar
   */
  buscar(criterio: 'ID' | 'nombre' | 'descripcion' | 'material' | 'peso' | 'valor', valor: string): ColeccionBienes {
    switch (criterio) {
      case 'ID':
        return new ColeccionBienes(this.bienes.filter(b => b.id === Number(valor)));
      case 'nombre':
        return new ColeccionBienes(this.bienes.filter(b => b.nombre.includes(valor)));
      case 'descripcion':
        return new ColeccionBienes(this.bienes.filter(b => b.descripcion.includes(valor)));
      case 'material':
        return new ColeccionBienes(this.bienes.filter(b => b.material === valor as Material));
      case 'peso':
        return new ColeccionBienes(this.bienes.filter(b => b.peso === Number(valor)));
      case 'valor':
        return new ColeccionBienes(this.bienes.filter(b => b.valor === Number(valor)));
      default:
        throw new Error(`Criterio ${criterio} no es válido.`);
    }
  }

  /**
   * Método que ordena los bienes por nombre o valor
   * @param bienes - Bienes a ordenar
   * @param ascendente - Orden ascendente o descendente
   */
  ordenarPorNombre(bienes: ColeccionBienes, ascendente: boolean = true): ColeccionBienes {
    return new ColeccionBienes(bienes.bienes.sort((a, b) => {
      if (ascendente) {
        return a.nombre > b.nombre ? 1 : -1;
      } else {
        return a.nombre < b.nombre ? 1 : -1;
      }
    }));
  }

  /**
   * Método que ordena los bienes por valor
   * @param bienes - Bienes a ordenar
   * @param ascendente - Orden ascendente o descendente
   */
  ordenarPorValor(bienes: ColeccionBienes, ascendente: boolean = true): ColeccionBienes {
    return new ColeccionBienes(bienes.bienes.sort((a, b) => ascendente ? a.valor - b.valor : b.valor - a.valor));
  }

  /**
   * Método para imprimir la información de los bienes
   */
  print() {
    console.table(this.bienes.map(b => ({
      ID: b.id,
      Nombre: b.nombre,
      Descripción: b.descripcion,
      Material: b.material,
      Peso: b.peso,
      Valor: b.valor
    })));
  }
}

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

  constructor(bienes: Bien[]) {
    super();
    const adapter = new JSONFile<JsonBienes>('bienes.json');
    this.bienesDatabase = new Low(adapter);
    this.initialize(bienes);
  }

  private async initialize(bienes: Bien[]) {

    await this.bienesDatabase.read();

    // Validar si los datos son válidos
    if (!this.bienesDatabase.data) {
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

    if (this.bienes.length === 0) {
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