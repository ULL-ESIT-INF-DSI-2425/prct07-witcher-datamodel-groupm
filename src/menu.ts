import inquirer from 'inquirer';
import { Inventario } from './inventario.js';
import { ColeccionBienes, Bien } from './bien.js';
import { ColeccionClientes, Cliente } from './cliente.js';
import { ColeccionMercaderes, Mercader } from './mercader.js';
import { ColeccionTransacciones, Transaccion } from './transaccion.js';

// Enumeraciones para los comandos y tipos de entidades
/**
 * Enumeración Comandos
 */
enum Comandos {
  ADD = 'Agregar',
  REMOVE = 'Eliminar',
  MODIFY = 'Modificar',
  BUSCAR_BIEN = 'Buscar bien',
  LOCALIZAR = 'Localizar',
  REGISTRAR_TRANSACCION = 'Registrar transacción',
  GENERAR_INFORME = 'Generar informe',
  QUIT = 'Salir'
}

/**
 * Enumeración Entidades
 */
enum Entidades {
  BIEN = 'Bien',
  CLIENTE = 'Cliente',
  MERCADER = 'Mercader'
}

// Función principal
async function promptUser() {
  console.log(`La Posada del Lobo Blanco\n`);

  inventario.print();

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
    case Comandos.LOCALIZAR:
      await promptLocalizar();
      break;
    case Comandos.REGISTRAR_TRANSACCION:
      await promptRegistrarTransaccion();
      break;
    case Comandos.GENERAR_INFORME:
      await promptGenerarInforme();
      break;
    case Comandos.QUIT:
      console.log('¡Adiós!');
      return;
  }

  promptUser(); // Volver al menú principal
}

async function continuar() {
  // Mensaje de confirmación para continuar
  const { continuar } = await inquirer.prompt({
    type: 'confirm',
    name: 'continuar',
    message: '¿Deseas continuar?',
  });

  // Si no desea continuar
  if (!continuar) {
    console.log('¡Adiós!');
    process.exit(0);
  }

  // Limpiar la consola y mostrar el menú principal
  console.clear();
  promptUser();
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
        inventario.bienes.añadir(datos);
        break;
      case Entidades.CLIENTE:
        inventario.clientes.añadir(datos);
        break;
      case Entidades.MERCADER:
        inventario.mercaderes.añadir(datos);
        break;
    }
  }
}

// Función para eliminar entidades
async function promptEliminar() {
  console.clear();
  console.log(`Eliminar\n`);

  const { entidad } = await inquirer.prompt({
    type: 'list',
    name: 'entidad',
    message: 'Seleccione qué desea eliminar',
    choices: Object.values(Entidades),
  });

  switch (entidad) {
    case Entidades.BIEN:
      inventario.bienes.print();
      break;
    case Entidades.CLIENTE:
      inventario.clientes.print();
      break;
    case Entidades.MERCADER:
      inventario.mercaderes.print();
      break;
  }

  const { id } = await inquirer.prompt({
    type: 'input',
    name: 'id',
    message: `Ingrese el ID del ${entidad} a eliminar: `,
  });

  if (id) {
    switch (entidad) {
      case Entidades.BIEN:
        inventario.bienes.eliminar(Number(id));
        break;
      case Entidades.CLIENTE:
        inventario.clientes.eliminar(Number(id));
        break;
      case Entidades.MERCADER:
        inventario.mercaderes.eliminar(Number(id));
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
        inventario.bienes.modificar(Number(id), String(campo), String(valor));
        break;
      case Entidades.CLIENTE:
        inventario.clientes.modificar(Number(id), String(campo), String(valor));
        break;
      case Entidades.MERCADER:
        inventario.mercaderes.modificar(Number(id), String(campo), String(valor));
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

  let resultados = inventario.bienes.buscar(criterio.toLowerCase(), valor);

  switch (orden) {
    case 'Nombre Ascendente':
      resultados = inventario.bienes.ordenarPorNombre(resultados, true);
      break;
    case 'Nombre Descendente':
      resultados = inventario.bienes.ordenarPorNombre(resultados, false);
      break;
    case 'Valor Ascendente':
      resultados = inventario.bienes.ordenarPorValor(resultados, true);
      break;
    case 'Valor Descendente':
      resultados = inventario.bienes.ordenarPorValor(resultados, false);
      break;
  }

  resultados.bienes.forEach(b => b.print());

  await continuar();
}

async function promptLocalizar() {
  console.clear();
  console.log(`Buscar Bien\n`);

  const { tipo } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tipo',
      message: 'Seleccione el criterio de búsqueda',
      choices: ['Mercader', 'Cliente'],
    },
  ]);
  let resultados = null;
  if (tipo === 'Mercader') {
    const { campo, entrada } = await inquirer.prompt([   
      {
        type: 'list',
        name: 'campo',
        message: 'Seleccione el campo de búsqueda',
        choices: ['Profesion', 'Nombre', 'Lugar'],
      },
      {
        type: 'input',
        name: 'entrada',
        message: `Ingrese el valor de búsqueda: `,
      }
    ]);
    resultados = inventario.mercaderes.buscar(campo, entrada);
  }
  else {
    const { campo, entrada } = await inquirer.prompt([   
      {
        type: 'list',
        name: 'campo',
        message: 'Seleccione el campo de búsqueda',
        choices: ['Raza', 'Nombre', 'Lugar'],
      },
      {
        type: 'input',
        name: 'entrada',
        message: `Ingrese el valor de búsqueda: `,
      }
    ]);
    resultados = inventario.clientes.buscar(campo, entrada);
  }
  resultados.print();

  await continuar();
}

async function promptRegistrarTransaccion() {
  console.log(`Registrar Transacción\n`);
  console.clear();
  inventario.bienes.print();
  inventario.clientes.print();
  inventario.mercaderes.print();
  const { id, tipo, bienes, monto, cliente, mercader } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: `Ingrese el ID de la transacción`,
    },
    {
      type: 'list',
      name: 'tipo',
      message: 'Seleccione el tipo de transacción',
      choices: ['Compra', 'Venta', 'Devolución'],
    },
    {
      type: 'input',
      name: 'bienes',
      message: `Ingrese los IDs de los bienes involucrados en la transacción separados por comas: `,
    },
    {
      type: 'input',
      name: 'monto',
      message: `Ingrese el monto de la transacción: `,
    },
    {
      type: 'input',
      name: 'cliente',
      message: `Ingrese el ID del cliente: `,
    },
    {
      type: 'input',
      name: 'mercader',
      message: `Ingrese el ID del mercader: `,
    }
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
  let buscarBienes = bienes.split(',').map((b: string) => inventario.bienes.buscar('ID', b).bienes[0]);
  if (buscarBienes.length === 0) {
    console.log('Bienes no encontrados.');
    return;
  }
  inventario.transacciones.añadir(new Transaccion(id, tipo, buscarBienes, Number(monto), buscarCliente.clientes[0], buscarMercader.mercaderes[0]));
  console.log('Transacción registrada.');

  await continuar();
}

async function promptGenerarInforme() {

  // Preguntamos el tipo de informe
  console.clear();
  console.log(`Generar Informe\n`);
  const { tipo } = await inquirer.prompt([
    {
      type: 'list',
      name: 'tipo',
      message: 'Que tipo de informe quiere generar?',
      choices: ['Stock de bienes', 'Bienes demandados', 'Ingresos/gastos', 'Historial de transacciones'],
    },
  ]);

  switch (tipo) {
    
    case 'Stock de bienes': {
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
      break;
    }

    case 'Bienes demandados':

    // Imprimimos la lista ordenada de los bienes más demandados
      console.log('Lista ordenada de los bienes más demandados');
      inventario.transacciones.bienesDemandados().forEach((cantidad, nombre) => {
        console.log(`Nombre del bien: ${nombre}, Cantidad: ${cantidad}`);
      });
      break;

    case 'Ingresos/gastos':
      console.log('Ingresos/gastos');
      break;

    case 'Historial de transacciones': {
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
      break;
    }
  }

  await continuar();
}

// Datos iniciales
const declaracionBienes = [
  new Bien(1, 'Espada', '', 'Acero de Mahakam', 100, 500),
  new Bien(2, 'Pala', '', 'Cuero endurecido', 10, 100),
  new Bien(3, 'Pico', '', 'Esencia magica', 200, 200),
  new Bien(4, 'Azada', '', 'Acero de Mahakam', 10, 100),
  new Bien(5, 'Hacha', '', 'Acero de Mahakam', 10, 200),
  new Bien(6, 'Casco', '', 'Cuero endurecido', 200, 500),
];

const declaracionClientes = [
  new Cliente(1, 'Geralt', 'Humano', 'Novigrado'),
  new Cliente(2, 'Daniel', 'Elfo', 'Novigrado'),
  new Cliente(3, 'Jose', 'Humano', 'Velen')
];

const declaracionMercaderes = [
  new Mercader(1, 'Geralt', 'Herrero', 'Novigrado'),
  new Mercader(2, 'Daniel', 'Alquimista', 'Novigrado'),
  new Mercader(3, 'Jose', 'Herrero', 'Velen')
];

let bienes = new ColeccionBienes(declaracionBienes);
let clientes = new ColeccionClientes(declaracionClientes);
let mercaderes = new ColeccionMercaderes(declaracionMercaderes);

let inventario = new Inventario(bienes, mercaderes, clientes);

// Iniciar la aplicación
promptUser();