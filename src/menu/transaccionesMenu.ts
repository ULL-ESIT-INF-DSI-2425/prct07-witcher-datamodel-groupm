import { Inventario } from "../module/inventario.js";
import inquirer from 'inquirer';
import { mainMenu } from './mainMenu.js';

/**
 * Función para mostrar el menú de transacciones
 * @param inventario - Inventario
 */
export async function transaccionesMenu(inventario: Inventario) {

  const { comando } = await inquirer.prompt({
      type: 'list',
      name: 'comando',
      message: '¿Qué deseas hacer?',
      choices: [
        'Mostrar Transacciones',
        'Eliminar Transacción',
        'Volver',
      ],
  });

  switch (comando) {
    case 'Mostrar Transacciones':
      await mostrarTransacciones(inventario);
      break; 
    case 'Eliminar Transacción':
      await eliminarTransaccion(inventario);
      break;
    case 'Volver':
      console.clear();
      await mainMenu();
      break;
  }
}

/**
 * Función que muestra las transacciones
 * @param inventario - Inventario
 */
async function mostrarTransacciones(inventario: Inventario) {
  inventario.transacciones.print();
  await transaccionesMenu(inventario);
}

/**
 * Función eliminar la transacción según el ID
 * @param transaccion - Colección de transacciones
 */
async function eliminarTransaccion(inventario: Inventario) { // Eliminamos según el ID
  inventario.transacciones.print();

  const { id } = await inquirer.prompt({
    type: 'number',
    name: 'id',
    message: 'ID de la transacción a eliminar',
  });

  inventario.transacciones.eliminar(id);
  console.log(`Transacción eliminado con éxito.\n`);
  await transaccionesMenu(inventario);
}