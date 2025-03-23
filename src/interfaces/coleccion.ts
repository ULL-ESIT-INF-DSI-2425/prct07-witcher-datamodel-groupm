/**
 * Interfaz que define los métodos que debe implementar una colección de elementos.
 * @param T - Tipo de los elementos de la colección
 */
export interface Coleccion<T> {
  añadir(elemento: T): void;
  eliminar(id: number): void;
  modificar?(id: number, campo: string, valor: string): void;
}