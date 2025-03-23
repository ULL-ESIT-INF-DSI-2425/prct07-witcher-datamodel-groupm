import { Inventario } from "../module/inventario.js";
import inquirer from 'inquirer';
import { mainMenu } from './mainMenu.js';
import { Transaccion } from "../module/transaccion.js";
import { Bien } from "../module/bien.js";
import { Mercader } from "../module/mercader.js";
import { Cliente } from "../module/cliente.js";

/**
 * Función para mostrar el menú de transacciones
 * @param inventario - Inventario
 */
export async function transaccionesMenu(inventario: Inventario) {
  console.log(`Gestión de Mercaderes\n`);

  inventario.print();

  const { comando } = await inquirer.prompt({
      type: 'list',
      name: 'comando',
      message: '¿Qué deseas hacer?',
      choices: [
        'Registrar Compra',
        'Registrar Venta',
        'Registrar Devolución',
        'Eliminar Transacción',
        'Volver',
      ],
  });

  switch (comando) {
    case 'Registrar Compra':
      await registrarCompra(inventario);
      break;
    case 'Registrar Venta':
      await registrarVenta(inventario);
      break;
    case 'Registrar Devolución':
      await registrarDevolucion(inventario);
      break; 
    case 'Eliminar Transacción':
      await eliminarTransaccion(inventario);
      break;
    case 'Volver':
      await mainMenu();
      break;
  }
}

/**
 * Función para registrar una compra
 * @param inventario - Inventario
 */
async function registrarCompra(inventario: Inventario) {
  inventario.print();
  const { id, bienes, monto, cliente, mercader } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'ID de la transacción',
    },
    { // Puede fallar
      type: 'input',
      name: 'bienes',
      message: 'Introduce las ID de los bienes (separados por comas)',
    },
    {
      type: 'number',
      name: 'monto',
      message: 'Monto de la transacción',
    },
    {
      type: 'number',
      name: 'cliente',
      message: 'Introduce el id del cliente',
    },
    {
      type: 'number',
      name: 'mercader',
      message: 'Introduce el id del mercader',
    },
  ]);
  inventario.clientes.print();

  let buscarCliente: Cliente = inventario.clientes.buscar('ID', cliente).clientes[0];
  let buscarMercader: Mercader = inventario.mercaderes.buscar('ID', mercader).mercaderes[0];
  let bienesTransaccion: Bien[] = bienes.split(',').map((item: string) => {
    let bien = inventario.bienes.buscar('ID', item.trim());
    return bien.bienes[0];
  });
  let transaccion = new Transaccion(id, "compra", bienesTransaccion, monto, buscarCliente, buscarMercader);
  inventario.transacciones.añadir(transaccion);
  await transaccionesMenu(inventario);
}

/**
 * Función para registrar una venta
 * @param inventario - Inventario
 */
async function registrarVenta(inventario: Inventario) {
  inventario.print();
  const { id, bienes, monto, cliente, mercader } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'ID de la transacción',
    },
    { // Puede fallar
      type: 'input',
      name: 'bienes',
      message: 'Introduce los bienes (separados por comas)',
    },
    {
      type: 'number',
      name: 'monto',
      message: 'Monto de la transacción',
    },
    {
      type: 'number',
      name: 'cliente',
      message: 'introduce el id del cliente',
    },
    {
      type: 'number',
      name: 'mercader',
      message: 'Introduce el id del mercader',
    },
  ]);
  inventario.clientes.print();

  let buscarCliente: Cliente = inventario.clientes.buscar('ID', cliente).clientes[0];
  let buscarMercader: Mercader = inventario.mercaderes.buscar('ID', mercader).mercaderes[0];
  let bienesTransaccion: Bien[] = bienes.split(',').map((item: string) => {
    let bien = inventario.bienes.buscar('ID', item.trim());
    return bien.bienes[0];
  });
  let transaccion = new Transaccion(id, "venta", bienesTransaccion, monto, buscarCliente, buscarMercader);
  inventario.transacciones.añadir(transaccion);
  await transaccionesMenu(inventario);
}

/**
 * Función para registrar una devolución
 * @param inventario - Inventario
 */
async function registrarDevolucion(inventario: Inventario) {
  inventario.print();
  const { id, bienes, monto, cliente, mercader } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'ID de la transacción',
    },
    { // Puede fallar
      type: 'input',
      name: 'bienes',
      message: 'Introduce los bienes (separados por comas)',
    },
    {
      type: 'number',
      name: 'monto',
      message: 'Monto de la transacción',
    },
    {
      type: 'number',
      name: 'cliente',
      message: 'introduce el id del cliente',
    },
    {
      type: 'number',
      name: 'mercader',
      message: 'Introduce el id del mercader',
    },
  ]);
  inventario.clientes.print();

  let buscarCliente: Cliente = inventario.clientes.buscar('ID', cliente).clientes[0];
  let buscarMercader: Mercader = inventario.mercaderes.buscar('ID', mercader).mercaderes[0];
  let bienesTransaccion: Bien[] = bienes.split(',').map((item: string) => {
    let bien = inventario.bienes.buscar('ID', item.trim());
    return bien.bienes[0];
  });
  let transaccion = new Transaccion(id, "devolucion", bienesTransaccion, monto, buscarCliente, buscarMercader);
  inventario.transacciones.añadir(transaccion);
  await transaccionesMenu(inventario);
}

/**
 * Función eliminar la transacción según el ID
 * @param transaccion - Colección de transacciones
 */
async function eliminarTransaccion(inventario: Inventario) { // Eliminamos según el ID
  const { id } = await inquirer.prompt({
    type: 'number',
    name: 'id',
    message: 'ID de la transacción a eliminar',
  });

  inventario.transacciones.eliminar(id);
  console.log(`Transacción eliminado con éxito.\n`);
  await transaccionesMenu(inventario);
}