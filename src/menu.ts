import inquirer from 'inquirer';
import { Inventario } from './inventario.js';
import { Bienes } from './bienes.js';
import { Cliente } from './cliente.js';
import { Mercader } from './mercader.js';

// Datos iniciales
const bienes = [
  new Bienes(1, 'Espada', '', 'Acero de Mahakam', 100, 500),
  new Bienes(2, 'Pala', '', 'Cuero endurecido', 10, 100),
  new Bienes(3, 'Pico', '', 'Esencia magica', 200, 200)
];

const clientes = [
  new Cliente(1, 'Geralt', 'Humano', 'Novigrado'),
  new Cliente(2, 'Daniel', 'Elfo', 'Novigrado'),
  new Cliente(3, 'Jose', 'Humano', 'Velen')
];

const mercaderes = [
  new Mercader(1, 'Geralt', 'Herrero', 'Novigrado'),
  new Mercader(2, 'Daniel', 'Alquimista', 'Novigrado'),
  new Mercader(3, 'Jose', 'Herrero', 'Velen')
];

let inventario = new Inventario(bienes, mercaderes, clientes);

// Enumeraciones para los comandos y tipos de entidades
enum Comandos {
  ADD = 'Agregar',
  REMOVE = 'Eliminar',
  MODIFY = 'Modificar',
  BUSCAR_BIEN = 'Buscar bien',
  QUIT = 'Salir'
}

enum Entidades {
  BIEN = 'Bien',
  CLIENTE = 'Cliente',
  MERCADER = 'Mercader'
}

// Función principal
async function promptUser() {
  console.log(`La Posada del Lobo Blanco\n`);

  inventario.mostrar();

  const { comando } = await inquirer.prompt({
    type: 'list',
    name: 'comando',
    message: '¿Qué deseas hacer?',
    choices: Object.values(Comandos),
  });

  switch (comando) {
    case Comandos.ADD:
      await promptAgregar();
      break;
    case Comandos.REMOVE:
      await promptEliminar();
      break;
    case Comandos.MODIFY:
      await promptModificar();
      break;
    case Comandos.BUSCAR_BIEN:
      await promptBuscarBien();
      break;
    case Comandos.QUIT:
      console.log('¡Adiós!');
      return;
  }

  promptUser(); // Volver al menú principal
}

// Función para agregar entidades
async function promptAgregar() {
  console.clear();
  console.log(`Agregar\n`);

  const { entidad } = await inquirer.prompt({
    type: 'list',
    name: 'entidad',
    message: 'Seleccione qué desea agregar',
    choices: Object.values(Entidades),
  });

  const { datos } = await inquirer.prompt({
    type: 'input',
    name: 'datos',
    message: `Ingrese los datos del ${entidad} <ID-Nombre-Descripcion-Material-Peso-Valor>: `,
  });

  if (datos) {
    switch (entidad) {
      case Entidades.BIEN:
        inventario.addBien(datos);
        break;
      case Entidades.CLIENTE:
        inventario.addCliente(datos);
        break;
      case Entidades.MERCADER:
        inventario.addMercader(datos);
        break;
    }
  }
}

// Función para eliminar entidades
async function promptEliminar() {
  console.clear();
  console.log(`Eliminar\n`);
  inventario.mostrar();

  const { entidad } = await inquirer.prompt({
    type: 'list',
    name: 'entidad',
    message: 'Seleccione qué desea eliminar',
    choices: Object.values(Entidades),
  });

  const { id } = await inquirer.prompt({
    type: 'input',
    name: 'id',
    message: `Ingrese el ID del ${entidad} a eliminar: `,
  });

  if (id) {
    switch (entidad) {
      case Entidades.BIEN:
        inventario.removeBien(Number(id));
        break;
      case Entidades.CLIENTE:
        inventario.removeCliente(Number(id));
        break;
      case Entidades.MERCADER:
        inventario.removeMercader(Number(id));
        break;
    }
  }
}

// Función para modificar entidades
async function promptModificar() {
  console.clear();
  console.log(`Modificar\n`);

  const { entidad } = await inquirer.prompt({
    type: 'list',
    name: 'entidad',
    message: 'Seleccione qué desea modificar',
    choices: Object.values(Entidades),
  });

  const { id, campo, valor } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: `Ingrese el ID del ${entidad} a modificar: `,
    },
    {
      type: 'input',
      name: 'campo',
      message: `Ingrese el campo a modificar: `,
    },
    {
      type: 'input',
      name: 'valor',
      message: `Ingrese el nuevo valor: `,
    }
  ]);

  if (id && campo && valor) {
    switch (entidad) {
      case Entidades.BIEN:
        inventario.modifyBien(Number(id), String(campo), String(valor));
        break;
      case Entidades.CLIENTE:
        inventario.modifyCliente(Number(id), String(campo), String(valor));
        break;
      case Entidades.MERCADER:
        inventario.modifyMercader(Number(id), String(campo), String(valor));
        break;
    }
  }
}

async function promptBuscarBien() {
  console.clear();
  console.log(`Buscar Bien\n`);

  const { criterio, orden } = await inquirer.prompt([
    {
      type: 'list',
      name: 'criterio',
      message: 'Seleccione el criterio de búsqueda',
      choices: ['Nombre', 'Tipo', 'Descripción'],
    },
    {
      type: 'list',
      name: 'orden',
      message: 'Seleccione el orden',
      choices: ['Nombre Ascendente', 'Nombre Descendente', 'Valor Ascendente', 'Valor Descendente'],
    }
  ]);

  const { valor } = await inquirer.prompt({
    type: 'input',
    name: 'valor',
    message: `Ingrese el valor del ${criterio.toLowerCase()} a buscar: `,
  });

  let resultados = inventario.buscarBienes(criterio.toLowerCase(), valor);

  switch (orden) {
    case 'Nombre Ascendente':
      resultados = inventario.ordenarBienesPorNombre(resultados, true);
      break;
    case 'Nombre Descendente':
      resultados = inventario.ordenarBienesPorNombre(resultados, false);
      break;
    case 'Valor Ascendente':
      resultados = inventario.ordenarBienesPorValor(resultados, true);
      break;
    case 'Valor Descendente':
      resultados = inventario.ordenarBienesPorValor(resultados, false);
      break;
  }

  resultados.forEach(b => b.print());
  const { continuar } = await inquirer.prompt({
    type: 'confirm',
    name: 'continuar',
    message: '¿Deseas continuar?',
  });

  if (!continuar) {
    console.log('¡Adiós!');
    return;
  }
  console.clear();
  promptUser();
}

// Iniciar la aplicación
promptUser();