import { Coleccion } from "./coleccion.js";

/**
 * Interfaz para gestionar una base de datos
 */
export interface Database<T> extends Coleccion<T> {
  actualizarBase(): void;
}