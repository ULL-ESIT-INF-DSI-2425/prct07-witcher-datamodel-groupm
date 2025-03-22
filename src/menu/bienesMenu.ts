import inquirer from 'inquirer';
import { Bien } from '../module/bien.js';
import { JsonColeccionBienes } from '../db/jsonColeccionBienes.js';
import { mainMenu } from './mainMenu.js';

export async function bienesMenu(bienes: JsonColeccionBienes) {
  console.log(`Gestión de Bienes\n`);

  bienes.print();

  const { comando } = await inquirer.prompt({
    type: 'list',
    name: 'comando',
    message: '¿Qué deseas hacer?',
    choices: [
      'Añadir Bien',
      'Eliminar Bien',
      'Modificar Bien',
      'Volver'
    ],
  });

  switch (comando) {
    case 'Añadir Bien':
      await añadirBien(bienes);
      break;
    case 'Eliminar Bien':
      await eliminarBien(bienes);
      break;
    case 'Modificar Bien':
      await modificarBien(bienes);
      break; 
    case 'Volver':
      await mainMenu();
      break;
  }
}

async function añadirBien(bienes: JsonColeccionBienes) {
  const { id, nombre, descripcion, material, peso, precio } = await inquirer.prompt([
    {
      type: 'number',
      name: 'id',
      message: 'ID del Bien',
    },
    {
      type: 'input',
      name: 'nombre',
      message: 'Nombre del Bien',
    },
    {
      type: 'input',
      name: 'descripcion',
      message: 'Descripción del Bien',
    },
    {
      type: 'input',
      name: 'material',
      message: 'Material del Bien',
    },
    {
      type: 'number',
      name: 'peso',
      message: 'Peso del Bien',
    },
    {
      type: 'number',
      name: 'precio',
      message: 'Precio del Bien',
    },
  ]);

  const bien = new Bien(id, nombre, descripcion, material, peso, precio);
  bienes.añadir(bien);

  console.log(`Bien añadido con éxito.\n`);
  await bienesMenu(bienes);
}

async function eliminarBien(bienes: JsonColeccionBienes) {
  const { id } = await inquirer.prompt({
    type: 'number',
    name: 'id',
    message: 'ID del Bien a eliminar',
  });

    bienes.eliminar(id);
    console.log(`Bien eliminado con éxito.\n`);

  await bienesMenu(bienes);
}

async function modificarBien(bienes: JsonColeccionBienes) {
  const { id, campo, valor } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: `Ingrese el ID del bien a modificar: `,
    },
    {
      type: 'list',
      name: 'campo',
      message: `Seleccione el campo a modificar: `,
      choices: ['nombre', 'descripcion', 'material', 'stock', 'precio'],
    },
    {
      type: 'input',
      name: 'valor',
      message: `Ingrese el nuevo valor: `,
    }
  ]);

  bienes.modificar(id, campo, valor);
  console.log(`Bien modificado con éxito.\n`);
  await bienesMenu(bienes);
}