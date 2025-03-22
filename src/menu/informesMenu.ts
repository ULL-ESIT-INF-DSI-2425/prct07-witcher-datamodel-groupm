import { JsonColeccionTransacciones } from "../db/jsonColeccionTransacciones.js";
import { Inventario } from "../module/inventario.js";
import inquirer from 'inquirer';
import { mainMenu } from './mainMenu.js';
import { Transaccion } from "../module/transaccion.js";


export async function informesMenu(inventario: Inventario) {
  console.log(`Gestión de Mercaderes\n`);

  inventario.print();

  const { comando } = await inquirer.prompt({
    type: 'list',
    name: 'comando',
    message: '¿Qué deseas hacer?',
    choices: ['Stock de bienes', 
              'Bienes demandados', 
              'Ingresos/gastos', 
              'Historial de transacciones',
              'Volver'
            ],
  });

  switch (comando) {
    case 'Stock de bienes':
      await stockBienes(inventario);
      break;
    case 'Bienes demandados':
      await bienesDemandados(inventario);
      break;
    case 'Ingresos/gastos':
      await ingresosGastos(inventario);
      break;
    case 'Historial de transacciones':
      await historialTransacciones(inventario);
      break;
    case 'Volver':
      await mainMenu();
      break;
  }
}

async function stockBienes(inventario: Inventario) {
  inventario.bienes.print();
  console.log('Stock de bienes');
  
  // Preguntamos por el campo de búsqueda
  const { campo, entrada } = await inquirer.prompt([   
    {
      type: 'list',
      name: 'campo',
      message: 'Seleccione el campo de búsqueda',
      choices: ['nombre', 'material', 'peso', 'valor'],
    },
    {
      type: 'input',
      name: 'entrada',
      message: `Ingrese el valor de búsqueda: `,
    }
  ]);
  
  // Mostramos el stock disponible
  const stock = inventario.bienes.buscar(campo, entrada);
  if (stock.bienes.length === 0) {
    console.log('No hay disponibles.');
  } else {
    console.log(`Hay ${stock.bienes.length} articulos disponibles con esas carácteristicas.`);
    stock.print();
  }
  await informesMenu(inventario);
}

async function bienesDemandados(inventario: Inventario) {
  console.log('Lista ordenada de los bienes más demandados');
  inventario.transacciones.bienesDemandados().forEach((cantidad, nombre) => {
    console.log(`Nombre del bien: ${nombre}, Cantidad: ${cantidad}`);
  });
  await informesMenu(inventario);
}

async function ingresosGastos(inventario: Inventario) {
  console.log('Ingresos/gastos');
  await informesMenu(inventario);
}

async function historialTransacciones(inventario: Inventario) {
  inventario.clientes.print();
  inventario.mercaderes.print();

  // Preguntamos por el ID de la persona
  const { id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: `Ingrese el ID del mercader/cliente:`,
    },
  ]);

  // Mostramos las transacciones de la persona
  const transacciones: JsonColeccionTransacciones = inventario.transacciones.buscarPorPersonaID(Number(id));
  if (transacciones.transacciones.length > 0) {
    transacciones.print();
  } else {
    console.log('No se encontraron transacciones para el ID proporcionado.');
  }
  await informesMenu(inventario);
}