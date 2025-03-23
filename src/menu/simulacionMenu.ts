import { Inventario } from "../module/inventario.js";
import inquirer from 'inquirer';
import { mainMenu } from './mainMenu.js';
import { Transaccion } from "../module/transaccion.js";
import { Bien } from "../module/bien.js";
import { Mercader } from "../module/mercader.js";
import { Cliente } from "../module/cliente.js";

/**
 * Función para mostrar el menú de simulaciones
 * @param inventario - Inventario
 */
export async function simulacionesMenu(inventario: Inventario) {

  const { comando } = await inquirer.prompt({
      type: 'list',
      name: 'comando',
      message: '¿Qué deseas hacer?',
      choices: [
        'Simular compra/venta',
        'Simular devolución',
        'Volver',
      ],
  });

  switch (comando) {
    case 'Simular compra/venta':
      await registrarCompraVenta(inventario);
      break;
    case 'Simular devolución':
      await registrarDevolucion(inventario);
      break;
    case 'Volver':
      console.clear();
      await mainMenu();
      break;
  }
}

/**
 * Función para registrar una compra/venta
 * @param inventario - Inventario
 */
async function registrarCompraVenta(inventario: Inventario) {

  inventario.print();

  const { bienes, cliente, mercader } = await inquirer.prompt([
    { 
      type: 'input',
      name: 'bienes',
      message: 'Introduce las ID de los bienes (separados por comas) que deseas comprar/vender',
    },
    {
      type: 'number',
      name: 'cliente',
      message: 'Introduce el id del clienta que va a comprar',
    },
    {
      type: 'number',
      name: 'mercader',
      message: 'Introduce el id del mercader que va a vender',
    },
  ]);

  let buscarCliente: Cliente = inventario.clientes.buscar('ID', cliente).clientes[0];
  let buscarMercader: Mercader = inventario.mercaderes.buscar('ID', mercader).mercaderes[0];
  let monto = 0;
  let bienesTransaccion: Bien[] = bienes.split(',').map((item: string) => {
    let bien = inventario.bienes.buscar('ID', item.trim());
    monto += bien.bienes[0].valor;
    return bien.bienes[0];
  });

  let id_1 = inventario.transacciones.determinarSiguienteId();
  let id_2 = id_1 + 1;

  let transaccionCompra = new Transaccion(id_1, "compra", bienesTransaccion, monto, buscarCliente, buscarMercader);
  let transaccionVenta = new Transaccion(id_2, "venta", bienesTransaccion, monto, buscarCliente, buscarMercader);
  inventario.transacciones.añadir(transaccionCompra);
  inventario.transacciones.añadir(transaccionVenta);
  await simulacionesMenu(inventario);
}

/**
 * Función para registrar una devolución
 * @param inventario - Inventario
 */
async function registrarDevolucion(inventario: Inventario) {
  inventario.print();
  const { bienes, cliente, mercader } = await inquirer.prompt([
    { 
      type: 'input',
      name: 'bienes',
      message: 'Introduce los bienes (separados por comas) que desea devolver',
    },
    {
      type: 'number',
      name: 'cliente',
      message: 'introduce el id del cliente que va a devoler',
    },
    {
      type: 'number',
      name: 'mercader',
      message: 'Introduce el id del mercader',
    },
  ]);

  let buscarCliente: Cliente = inventario.clientes.buscar('ID', cliente).clientes[0];
  let buscarMercader: Mercader = inventario.mercaderes.buscar('ID', mercader).mercaderes[0];
  let monto = 0;
  let bienesTransaccion: Bien[] = bienes.split(',').map((item: string) => {
    let bien = inventario.bienes.buscar('ID', item.trim());
    monto += bien.bienes[0].valor;
    return bien.bienes[0];
  });

  let id = inventario.transacciones.determinarSiguienteId();

  let transaccion = new Transaccion(id, "devolucion", bienesTransaccion, monto, buscarCliente, buscarMercader);
  inventario.transacciones.añadir(transaccion);

  await simulacionesMenu(inventario);
}