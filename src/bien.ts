/**
 * Tipo Material = 'Acero de Mahakam' | 'cuero endurecido' | 'esencia mágica' | 'mutágenos de bestias antiguas'
 */
export type Material = 'Acero de Mahakam' | 'Cuero endurecido' | 'Esencia magica' | 'Mutagenos de bestias antiguas';

/**
 * Clase Bien
 */
export class Bien {
  accessor id: number
  accessor nombre: string
  accessor descripcion: string
  accessor material: Material
  accessor peso: number
  accessor valor: number
  
  /**
   * Constructor de la clase Bien
   * @param id - Identificador único del bien
   * @param nombre - Nombre del bien
   * @param descripcion - Descripción del bien
   * @param material - Material del bien
   * @param peso - Peso del bien
   * @param valor - Valor del bien
   */
  constructor(id: number, nombre: string, descripcion: string, material: Material, peso: number, valor: number) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.material = material;
    this.peso = peso;
    this.valor = valor;
  }

  /**
   * Método para imprimir la información del bien
   */
  print(): void {
    console.log(
      `ID: ${this.id}
      Nombre: ${this.nombre} 
      Valor: ${this.valor}
      Material: ${this.material}
      Peso: ${this.peso}`
    );
  }
};


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
  buscar(criterio: 'nombre' | 'descripcion' | 'material', valor: string) {
    switch (criterio) {
      case 'nombre':
        return new ColeccionBienes(this.bienes.filter(b => b.nombre.includes(valor)));
      case 'descripcion':
        return new ColeccionBienes(this.bienes.filter(b => b.descripcion.includes(valor)));
      case 'material':
        return new ColeccionBienes(this.bienes.filter(b => b.material === valor as Material));
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
}