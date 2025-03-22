import inquirer from "inquirer";
import { Inventario } from "../module/inventario.js";
import { bienesMenu } from "./bienesMenu.js";
import { clientesMenu } from "./clientesMenu.js";
import { mercaderesMenu } from "./mercaderesMenu.js";
import { transaccionesMenu } from "./transaccionesMenu.js";
import { informesMenu } from "./informesMenu.js";

/**
 * Enumeración Comandos
 */
export enum Menu_Opciones {
  ACCION_BIENES = 'Bienes',
  ACCION_CLIENTES = 'Clientes',
  ACCION_MERCADERES = 'Mercaderes',
  TRANSACCIONES = 'Transacciones',
  GENERAR_INFORME = 'Generar Informe',
  SALIR = 'Salir'
}

/**
 * Enumeración Entidades
 */
export enum Entidades {
  BIEN = 'Bien',
  CLIENTE = 'Cliente',
  MERCADER = 'Mercader'
}

/**
 * Funcion principal para mostrar el menú
 * @returns void
 */
export async function mainMenu() {

  let inventario = new Inventario();

  console.log(`La Posada del Lobo Blanco\n`);

  const { comando } = await inquirer.prompt({
    type: 'list',
    name: 'comando',
    message: '¿Qué deseas hacer?',
    choices: Object.values(Menu_Opciones),
  });

  switch (comando) {
    case Menu_Opciones.ACCION_BIENES:
      console.clear();
      await bienesMenu(inventario.bienes);
      break;
    case Menu_Opciones.ACCION_CLIENTES:
      console.clear();
      await clientesMenu(inventario.clientes);
      break;
    case Menu_Opciones.ACCION_MERCADERES:
      console.clear();
      await mercaderesMenu(inventario.mercaderes);
      break;
    case Menu_Opciones.TRANSACCIONES:
      console.clear();
      await transaccionesMenu(inventario);
      break;
    case Menu_Opciones.GENERAR_INFORME:
      console.clear();
      await informesMenu(inventario);
      break;
    case Menu_Opciones.SALIR:
      console.log('Hasta la próxima!');
      break;
  }
}
