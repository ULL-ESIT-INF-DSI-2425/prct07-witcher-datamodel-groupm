import { ColeccionTransacciones } from "../coleccion/coleccionTransacciones.js";
import { Inventario } from "../module/inventario.js";
import inquirer from 'inquirer';
import { mainMenu } from './mainMenu.js';
import { Transaccion } from "../module/transaccion.js";

/**
 * Función para mostrar el menú de informes
 * @param inventario - Inventario
 */
export async function informesMenu(inventario: Inventario) {

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

/**
 * Función para mostrar el stock de bienes
 * @param inventario - Inventario
 */
async function stockBienes(inventario: Inventario) {
  inventario.bienes.print();
  console.log('Stock de bienes');
  
  // Preguntamos por el campo de búsqueda
  const { campo, entrada } = await inquirer.prompt([   
    {
      type: 'list',
      name: 'campo',
      message: 'Seleccione el campo de búsqueda',
      choices: ['nombre', 'material', 'descripcion','peso', 'valor'],
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

/**
 * Función para mostrar los bienes más demandados
 * @param inventario - Inventario
 */
async function bienesDemandados(inventario: Inventario) {
  console.log('Lista ordenada de los bienes más demandados');
  inventario.transacciones.bienesDemandados().forEach((cantidad, nombre) => {
    console.log(`Nombre del bien: ${nombre}, Cantidad: ${cantidad}`);
  });
  await informesMenu(inventario);
}

/**
 * Función para mostrar los ingresos y gastos
 * @param inventario - Inventario
 */
async function ingresosGastos(inventario: Inventario) {
  let totalIngresos = 0;
  inventario.transacciones.transacciones.forEach(transaccion => {
    if (transaccion.tipo === 'compra') {
      totalIngresos += transaccion.monto;
    } else if (transaccion.tipo === 'devolucion') {
      totalIngresos -= transaccion.monto;
    }
  });
  console.log(`Ingresos totales: ${totalIngresos} coronas`);
  await informesMenu(inventario);
}

/**
 * Función para mostrar el historial de transacciones
 * @param inventario - Inventario
 */
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
  const transacciones: ColeccionTransacciones = inventario.transacciones.buscarPorPersonaID(Number(id));
  if (transacciones.transacciones.length > 0) {
    transacciones.print();
  } else {
    console.log('No se encontraron transacciones para el ID proporcionado.');
  }
  await informesMenu(inventario);
}