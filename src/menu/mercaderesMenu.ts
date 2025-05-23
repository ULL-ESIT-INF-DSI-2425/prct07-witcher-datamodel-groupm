import inquirer from 'inquirer';
import { mainMenu } from './mainMenu.js';
import { Profesion } from '../module/mercader.js';
import { Lugar } from '../module/mercader.js';
import { Mercader } from '../module/mercader.js';
import { JsonColeccionMercaderes } from '../db/jsonColeccionMercaderes.js';

/**
 * Función para mostrar el menú de gestión de Mercaderes
 * @param mercaderes - Colección de mercaderes
 */
export async function mercaderesMenu(mercaderes: JsonColeccionMercaderes) {

  mercaderes.print();

    const { comando } = await inquirer.prompt({
        type: 'list',
        name: 'comando',
        message: '¿Qué deseas hacer?',
        choices: [
            'Añadir Mercader',
            'Eliminar Mercader',
            'Modificar Mercader',
            'Localizar Mercader',
            'Volver',
        ],
    });

    switch (comando) {
        case 'Añadir Mercader':
            await añadirMercader(mercaderes);
            break;
        case 'Eliminar Mercader':
            await eliminarMercader(mercaderes);
            break;
        case 'Modificar Mercader':
            await modificarMercader(mercaderes);
            break; 
        case 'Localizar Mercader':
            await localizarMercader(mercaderes);
            break;
        case 'Volver':
          console.clear();
            await mainMenu();
            break;
    }
}

/**
 * Función para añadir un mercader
 * @param mercaderes - Colección de mercaderes
 */
async function añadirMercader(mercaderes: JsonColeccionMercaderes) {
const { id, nombre, profesion, lugar } = await inquirer.prompt([
  {
    type: 'number',
    name: 'id',
    message: 'ID del Mercader',
  },
  {
    type: 'input',
    name: 'nombre',
    message: 'Nombre del Mercader',
  },
  {
    type: 'list',
    name: 'profesion',
    message: 'Profesion del Mercader',
    choices: ['Herrero', 'Alquimista', 'Mercader general'],
  },
  {
    type: 'list',
    name: 'lugar',
    message: 'Lugar del Mercader',
    choices: ['Novigrado', 'Velen', 'Kaer Trolde'],
  },
]);

  const mercader = new Mercader(id, nombre, profesion as Profesion, lugar as Lugar);
  mercaderes.añadir(mercader);
  console.log(`Mercader añadido con éxito.\n`);
  await mercaderesMenu(mercaderes);
}

/**
 * Función para eliminar un mercader según el ID
 * @param mercaderes - Colección de mercaderes
 */
async function eliminarMercader(mercaderes: JsonColeccionMercaderes) {
  const { id } = await inquirer.prompt({
    type: 'number',
    name: 'id',
    message: 'ID del Mercader a eliminar',
  });

  mercaderes.eliminar(id);
  console.log(`Mercader eliminado con éxito.\n`);
  await mercaderesMenu(mercaderes);
}

/**
 * Función para modificar un mercader según el ID, modificar el valor del campo seleccionado
 * @param mercaderes - Colección de mercaderes
 */
async function modificarMercader(mercaderes: JsonColeccionMercaderes) {
  const { id, campo, valor } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: `Ingrese el ID del mercader a modificar: `,
    },
    {
      type: 'list',
      name: 'campo',
      message: `Seleccione el campo a modificar: `,
      choices: ['nombre', 'profesion', 'lugar'],
    },
    {
      type: 'input',
      name: 'valor',
      message: `Ingrese el nuevo valor: `,
    }
  ]);

  mercaderes.modificar(Number(id), campo, valor);
  console.log(`Mercader modificado con éxito.\n`);
  await mercaderesMenu(mercaderes);
}

/**
 * Función para localizar un mercader según el campo y el valor de búsqueda
 * @param mercaderes - Colección de mercaderes
 */
async function localizarMercader(mercaderes: JsonColeccionMercaderes) {
  const { campo, busqueda } = await inquirer.prompt([
    {
      type: 'list',
      name: 'campo',
      message: `Seleccione el campo por el que desea buscar: `,
      choices: ['ID', 'Profesion', 'Nombre', 'Lugar'],
    },
    {
      type: 'input',
      name: 'busqueda',
      message: `Ingrese el valor a buscar: `,
    }
  ]);

  const resultado = mercaderes.buscar(campo, busqueda);
  console.log(`Resultados de la búsqueda:`);
  resultado.print();
  await mercaderesMenu(mercaderes);
}