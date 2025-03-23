import inquirer from "inquirer";
import { Inventario } from "../module/inventario.js";
import { bienesMenu } from "./bienesMenu.js";
import { clientesMenu } from "./clientesMenu.js";
import { mercaderesMenu } from "./mercaderesMenu.js";
import { transaccionesMenu } from "./transaccionesMenu.js";
import { informesMenu } from "./informesMenu.js";
import { simulacionesMenu } from "./simulacionMenu.js";

/**
 * Enumeración Comandos
 */
export enum Menu_Opciones {
  ACCION_BIENES = 'Bienes',
  ACCION_CLIENTES = 'Clientes',
  ACCION_MERCADERES = 'Mercaderes',
  TRANSACCIONES = 'Transacciones',
  SIMULACION = 'Simulación',
  GENERAR_INFORME = 'Generar Informes',
  MOSTRAR_INVENTARIO = 'Mostrar Inventario',
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

let inventario = new Inventario();

/**
 * Funcion principal para mostrar el menú
 * @returns void
 */
export async function mainMenu() {

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
    case Menu_Opciones.SIMULACION:
      console.clear();
      await simulacionesMenu(inventario);
      break;
    case Menu_Opciones.GENERAR_INFORME:
      console.clear();
      await informesMenu(inventario);
      break;
    case Menu_Opciones.MOSTRAR_INVENTARIO:
      console.clear();
      await mostrarInventario(inventario);
      break;
    case Menu_Opciones.SALIR:
      console.log('Hasta la próxima!');
      break;
  }
}

/**
 * Función para mostrar el inventario
 * @param inventario - Inventario
 */
async function mostrarInventario(inventario: Inventario) {
  inventario.print();
  await mainMenu();
}