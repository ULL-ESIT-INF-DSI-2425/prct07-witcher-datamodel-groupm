import inquirer from 'inquirer';
import { Cliente } from '../module/cliente.js';
import { JsonColeccionClientes } from '../db/jsonColeccionClientes.js';
import { mainMenu } from './mainMenu.js';
import { Raza } from '../module/cliente.js';
import { Lugar } from '../module/mercader.js';

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
    case 'Añadir Bien':
      await añadirCliente(clientes);
      break;
    case 'Eliminar Bien':
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

async function eliminarCliente(clientes: JsonColeccionClientes) {
  const { id } = await inquirer.prompt({
    type: 'number',
    name: 'id',
    message: 'ID del Cliente a eliminar',
  });

  clientes.eliminar(id);
  console.log(`Cliente eliminado con éxito.\n`);
  await clientesMenu(clientes);
}

async function modificarCliente(clientes: JsonColeccionClientes) {
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

  clientes.modificar(id, campo, valor);
  console.log(`Cliente modificado con éxito.\n`);
  await clientesMenu(clientes);
}

async function localizarCliente(clientes: JsonColeccionClientes) {
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

