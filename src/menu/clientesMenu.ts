import inquirer from 'inquirer';
import { Cliente } from '../module/cliente.js';
import { JsonColeccionClientes } from '../db/jsonColeccionClientes.js';
import { mainMenu } from './mainMenu.js';
import { Raza } from '../module/cliente.js';
import { Lugar } from '../module/mercader.js';

/**
 * Función para mostrar el menú de gestión de Clientes
 * @param clientes - colección de clientes
 */
export async function clientesMenu(clientes: JsonColeccionClientes) {
  console.log(`Gestión de Bienes\n`);

  clientes.print();

  const { comando } = await inquirer.prompt({
    type: 'list',
    name: 'comando',
    message: '¿Qué deseas hacer?',
    choices: [
      'Añadir Cliente',
      'Eliminar Cliente',
      'Modificar Cliente',
      'Localizar Cliente',
      'Volver',
    ],
  });

  switch (comando) {
    case 'Añadir Cliente':
      await añadirCliente(clientes);
      break;
    case 'Eliminar Cliente':
      await eliminarCliente(clientes);
      break;
    case 'Modificar Cliente':
      await modificarCliente(clientes);
      break; 
    case 'Localizar Cliente':
      await localizarCliente(clientes);
      break;
    case 'Volver':
      await mainMenu();
      break;
  }
}

/**
 * Función añadir cliente
 * @param clientes - Colección de clientes
 */
async function añadirCliente(clientes: JsonColeccionClientes) {
  const { id, nombre, raza, lugar } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'ID del Cliente',
    },
    {
      type: 'input',
      name: 'nombre',
      message: 'Nombre del Cliente',
    },
    {
      type: 'list',
      name: 'raza',
      message: 'Raza del Cliente',
      choices: ['Humano', 'Elfo', 'Enano', 'Hechicero'],
    },
    {
      type: 'list',
      name: 'lugar',
      message: 'Lugar del cliente',
      choices: ['Novigrado', 'Velen', 'Kaer Trolde'],
    },
  ]);

  const cliente = new Cliente(id, nombre, raza as Raza, lugar as Lugar);
  clientes.añadir(cliente);
  console.log(`Cliente añadido con éxito.\n`);
  await clientesMenu(clientes);
}

/**
 * Función eliminar cliente según el ID
 * @param clientes - Colección de clientes
 */
async function eliminarCliente(clientes: JsonColeccionClientes) { // Eliminamos según el ID
  const { id } = await inquirer.prompt({
    type: 'number',
    name: 'id',
    message: 'ID del Cliente a eliminar',
  });

  clientes.eliminar(id);
  console.log(`Cliente eliminado con éxito.\n`);
  await clientesMenu(clientes);
}

/**
 * Función modificar cliente según el ID, modificamos el valor del campo seleccionado
 * @param clientes - Colección de clientes
 */
async function modificarCliente(clientes: JsonColeccionClientes) { // Modificamos según el ID y el campo seleccionado
  const { id, campo, valor } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: `Ingrese el ID del cliente a modificar: `,
    },
    {
      type: 'list',
      name: 'campo',
      message: `Seleccione el campo a modificar: `,
      choices: ['nombre', 'raza', 'lugar'],
    },
    {
      type: 'input',
      name: 'valor',
      message: `Ingrese el nuevo valor: `,
    }
  ]);

  clientes.modificar(Number(id), campo, valor);
  console.log(`Cliente modificado con éxito.\n`);
  await clientesMenu(clientes);
}

/**
 * Función localizar cliente según el valor del campo seleccionado
 * @param clientes - Colección de clientes
 */
async function localizarCliente(clientes: JsonColeccionClientes) { // Buscamos según el campo seleccionado
  const { campo, busqueda } = await inquirer.prompt([
      {
        type: 'list',
        name: 'campo',
        message: `Seleccione el campo por el que desea buscar: `,
        choices: ['ID', 'Raza', 'Nombre', 'Lugar'],
      },
      {
        type: 'input',
        name: 'busqueda',
        message: `Ingrese el valor a buscar: `,
      }
    ]);
  
    const resultado = clientes.buscar(campo, busqueda);
    console.log(`Resultados de la búsqueda:`);
    resultado.print();
    await clientesMenu(clientes);
}

