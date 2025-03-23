import inquirer from 'inquirer';
import { Bien } from '../module/bien.js';
import { JsonColeccionBienes } from '../db/jsonColeccionBienes.js';
import { mainMenu } from './mainMenu.js';

/**
 * Función para mostrar el menú de gestión de Bienes
 * @param bienes - Colección de bienes
 */
export async function bienesMenu(bienes: JsonColeccionBienes) {

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
      console.clear();
      await mainMenu();
      break;
  }
}

/**
 * Función añadir bien
 * @param bienes - Colección de bienes
 */
export async function añadirBien(bienes: JsonColeccionBienes) {
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

/**
 * Función eliminar bien
 * @param bienes - Colección de bienes
 */
export async function eliminarBien(bienes: JsonColeccionBienes) { // Eliminamos según el ID
  const { id } = await inquirer.prompt({
    type: 'number',
    name: 'id',
    message: 'ID del Bien a eliminar',
  });

    bienes.eliminar(Number(id));
    console.log(`Bien eliminado con éxito.\n`);

  await bienesMenu(bienes);
}

/**
 * Función modificar un bien según el ID, modificamos el valor del campo seleccionado
 * @param bienes - Colección de bienes
 */
export async function modificarBien(bienes: JsonColeccionBienes) {
  const { id, campo, valor } = await inquirer.prompt([ // Modificamos según el ID, el valor del campo seleccionado
    {
      type: 'input',
      // type: 'number',
      name: 'id',
      message: `Ingrese el ID del bien a modificar: `,
    },
    {
      type: 'list',
      name: 'campo',
      message: `Seleccione el campo a modificar: `,
      choices: ['nombre', 'descripcion', 'material', 'peso', 'valor'],
    },
    {
      type: 'input',
      name: 'valor',
      message: `Ingrese el nuevo valor: `,
    }
  ]);

  bienes.modificar(Number(id), campo, valor);
  console.log(`Bien modificado con éxito.\n`);
  await bienesMenu(bienes);
}