/**
 * Interfaz que define un objeto identificable
 */
export interface Identificable {
  id: number;
  nombre?: string;
}

/**
 * Interfaz que define un objeto con lugar
 */
export interface Persona extends Identificable {
  lugar: string;
}