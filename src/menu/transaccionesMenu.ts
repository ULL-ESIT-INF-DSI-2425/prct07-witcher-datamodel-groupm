import { JsonColeccionTransacciones } from "../db/jsonColeccionTransacciones.js";
import { Inventario } from "../module/inventario.js";
import inquirer from 'inquirer';
import { mainMenu } from './mainMenu.js';
import { Transaccion } from "../module/transaccion.js";


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
    case 'Volver':
      await mainMenu();
      break;
  }
}

async function registrarCompra(inventario: Inventario) {
  const { id, bienes, monto, cliente, mercader } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'ID de la transacción',
    },
    { // Puede fallar
      type: 'checkbox',
      name: 'bienes',
      message: 'Bienes',
      choices: (inventario.bienes as unknown as any[]).map((item: any) => item.nombre),
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

  let buscarCliente = inventario.clientes.buscar('ID', cliente);
  let buscarMercader = inventario.mercaderes.buscar('ID', mercader);
  if (buscarCliente.clientes.length === 0) {
    console.log('Cliente no encontrado.');
    return;
  }
  if (buscarMercader.mercaderes.length === 0) {
    console.log('Mercader no encontrado.');
    return;
  }
  let bienesTransaccion = (inventario.bienes as unknown as any[]).filter((item: any) => bienes.includes(item.nombre));
  let transaccion = new Transaccion(id, "compra", bienesTransaccion, monto, buscarCliente.clientes[0], buscarMercader.mercaderes[0]);
  await transaccionesMenu(inventario);
}

async function registrarVenta(inventario: Inventario) {
  const { id, bienes, monto, cliente, mercader } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'ID de la transacción',
    },
    {
      type: 'checkbox',
      name: 'bienes',
      message: 'Bienes',
      choices: (inventario.bienes as unknown as any[]).map((item: any) => item.nombre),
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

  let buscarCliente = inventario.clientes.buscar('ID', cliente);
  let buscarMercader = inventario.mercaderes.buscar('ID', mercader);
  if (buscarCliente.clientes.length === 0) {
    console.log('Cliente no encontrado.');
    return;
  }
  if (buscarMercader.mercaderes.length === 0) {
    console.log('Mercader no encontrado.');
    return;
  }
  let bienesTransaccion = (inventario.bienes as unknown as any[]).filter((item: any) => bienes.includes(item.nombre));
  let transaccion = new Transaccion(id, "venta", bienesTransaccion, monto, buscarCliente.clientes[0], buscarMercader.mercaderes[0]);
  await transaccionesMenu(inventario);
}

async function registrarDevolucion(inventario: Inventario) {
  const { id, bienes, monto, cliente, mercader } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'ID de la transacción',
    },
    {
      type: 'checkbox',
      name: 'bienes',
      message: 'Bienes',
      choices: (inventario.bienes as unknown as any[]).map((item: any) => item.nombre),
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

  let buscarCliente = inventario.clientes.buscar('ID', cliente);
  let buscarMercader = inventario.mercaderes.buscar('ID', mercader);
  if (buscarCliente.clientes.length === 0) {
    console.log('Cliente no encontrado.');
    return;
  }
  if (buscarMercader.mercaderes.length === 0) {
    console.log('Mercader no encontrado.');
    return;
  }
  let bienesTransaccion = (inventario.bienes as unknown as any[]).filter((item: any) => bienes.includes(item.nombre));
  let transaccion = new Transaccion(id, "devolucion", bienesTransaccion, monto, buscarCliente.clientes[0], buscarMercader.mercaderes[0]);
  await transaccionesMenu(inventario);
}