/**
 * Tipo Material = 'Acero de Mahakam' | 'cuero endurecido' | 'esencia mágica' | 'mutágenos de bestias antiguas'
 */
type Material = 'Acero de Mahakam' | 'Cuero endurecido' | 'Esencia magica' | 'Mutagenos de bestias antiguas';

/**
 * Clase Bienes
 */
class Bienes {
  /**
   * Constructor de la clase Bienes
   * @param _id 
   * @param _nombre 
   * @param _descripcion 
   * @param _material 
   * @param _peso 
   * @param _valor 
   */
  constructor(private _id: number, private readonly _nombre: string, private _descripcion: string, private _material: Material, private _peso: number, private _valor: number) {
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
};