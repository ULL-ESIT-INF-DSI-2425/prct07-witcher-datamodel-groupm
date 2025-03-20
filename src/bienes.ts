/**
 * Tipo Material = 'Acero de Mahakam' | 'cuero endurecido' | 'esencia mágica' | 'mutágenos de bestias antiguas'
 */
export type Material = 'Acero de Mahakam' | 'Cuero endurecido' | 'Esencia magica' | 'Mutagenos de bestias antiguas';

/**
 * Clase Bienes
 */
export class Bienes {
  private _id: number
  private _nombre: string
  private _descripcion: string
  private _material: Material
  private _peso: number
  private _valor: number
  
  /**
   * Constructor de la clase Bienes
   * @param _id 
   * @param _nombre 
   * @param _descripcion 
   * @param _material 
   * @param _peso 
   * @param _valor 
   */
  constructor(id: number, nombre: string, descripcion: string, material: Material, peso: number, valor: number) {
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._material = material;
    this._peso = peso;
    this._valor = valor;
  }

  /**
   * Getter de id
   * @returns id
   */
  get id() {
    return this._id;
  }
  
  /**
   * Setter de id
   * @param - id
   */
  set id(id: number) {
    this._id = id;
  }

  /**
   * Getter de nombre
   * @returns nombre
   */
  get nombre() {
    return this._nombre;
  }

  set nombre(nombre: string) {
    this._nombre = nombre;
  }

  /**
   * Getter de descripcion
   * @returns descripcion
   */
  get descripcion() {
    return this._descripcion;
  }

  /**
   * Setter de descripcion
   * @param - descripcion
   */
  set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  /**
   * Getter de material
   * @returns material
   */
  get material() {
    return this._material;
  }

  /**
   * Setter de material
   * @param - material
   */
  set material(material: Material) {
    this._material = material;
  }

  /**
   * Getter de peso
   * @returns peso
   */
  get peso() {
    return this._peso;
  }

  /**
   * Setter de peso
   * @param - peso
   */
  set peso(peso: number) {
    this._peso = peso;
  }

  /**
   * Getter de valor
   * @returns valor
   */
  get valor() {
    return this._valor;
  }

  /**
   * Setter de valor
   * @param - valor
   */
  set valor(valor: number) {
    this._valor = valor;
  }

  print() {
    console.log(`ID: ${this.id} - Nombre: ${this.nombre} - Valor: ${this.valor}`);
  }
};