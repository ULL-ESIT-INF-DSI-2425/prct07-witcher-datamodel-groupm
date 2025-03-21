import inquirer from 'inquirer';
import { Inventario } from './inventario.js';
import { Bien } from './bien.js';
import { ColeccionBienes } from './coleccionBienes.js';
import { Cliente } from './cliente.js';
import { ColeccionClientes } from './coleccionClientes.js';
import { Mercader } from './mercader.js';
import { ColeccionMercaderes } from './coleccionMercaderes.js';
import { Transaccion } from './transaccion.js';
import { ColeccionTransacciones } from './coleccionTransacciones.js';

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

/**
 * Funcion principal para mostrar el menú
 * @returns void
 */
export async function promptUser(inventario: Inventario) {
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
      await promptAgregar(inventario);
      break;
    case Comandos.REMOVE:
      await promptEliminar(inventario);
      break;
    case Comandos.MODIFY:
      await promptModificar(inventario);
      break;
    case Comandos.BUSCAR_BIEN:
      await promptBuscarBien(inventario);
      break;
    case Comandos.LOCALIZAR:
      await promptLocalizar(inventario);
      break;
    case Comandos.REGISTRAR_TRANSACCION:
      await promptRegistrarTransaccion(inventario);
      break;
    case Comandos.GENERAR_INFORME:
      await promptGenerarInforme(inventario);
      break;
    case Comandos.QUIT:
      console.log('¡Adiós!');
      return;
  }
  promptUser(inventario); // Volver al menú principal
}

/**
 * Funcion que pregunta al usuario si desea continuar
 * @returns void
 */
async function continuar(inventario: Inventario) {
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
  promptUser(inventario);
}


/**
 * Función para agregar entidades (Bien, Cliente, Mercader)
 * @returns void
 */
async function promptAgregar(inventario: Inventario) {
  console.clear();
  console.log(`Agregar\n`);

  const { entidad } = await inquirer.prompt({
    type: 'list',
    name: 'entidad',
    message: 'Seleccione qué desea agregar',
    choices: Object.values(Entidades),
  });

  switch (entidad) {
    case Entidades.BIEN:
      await promptAgregarBien(inventario);
      break;
    case Entidades.CLIENTE:
      await promptAgregarCliente(inventario);
      break;
    case Entidades.MERCADER:
      await promptAgregarMercader(inventario);
      break;
  }
}

/**
 * Función para agregar un bien
 */
async function promptAgregarBien(inventario: Inventario) {
  const { id, nombre, descripcion, material, peso, valor } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: `Ingrese el ID: `,
    },
    {
      type: 'input',
      name: 'nombre',
      message: `Ingrese el nombre: `,
    },
    {
      type: 'input',
      name: 'descripcion',
      message: `Ingrese la descripción: `,
    },
    {
      type: 'input',
      name: 'material',
      message: `Ingrese el material: `,
    },
    {
      type: 'input',
      name: 'peso',
      message: `Ingrese el peso: `,
    },
    {
      type: 'input',
      name: 'valor',
      message: `Ingrese el valor: `,
    },
  ]);
  inventario.bienes.añadir(new Bien(Number(id), nombre, descripcion, material, Number(peso), Number(valor)));
  console.clear();
  promptUser(inventario);
}

/**
 * Función para agregar un cliente
 */
async function promptAgregarCliente(inventario: Inventario) {
  const { id, nombre, raza, lugar } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: `Ingrese el ID: `,
    },
    {
      type: 'input',
      name: 'nombre',
      message: `Ingrese el nombre: `,
    },
    {
      type: 'input',
      name: 'raza',
      message: `Ingrese la raza: `,
    },
    {
      type: 'input',
      name: 'lugar',
      message: `Ingrese el lugar: `,
    },
  ]);
  inventario.clientes.añadir(new Cliente(Number(id), nombre, raza, lugar));
  console.clear();
  promptUser(inventario);
}

/**
 * Función para agregar un mercader
 */
async function promptAgregarMercader(inventario: Inventario) {
  const { id, nombre, profesion, lugar } = await inquirer.prompt([
    {
      type: 'input',
      name: 'id',
      message: `Ingrese el ID: `,
    },
    {
      type: 'input',
      name: 'nombre',
      message: `Ingrese el nombre: `,
    },
    {
      type: 'input',
      name: 'profesion',
      message: `Ingrese la profesión: `,
    },
    {
      type: 'input',
      name: 'lugar',
      message: `Ingrese el lugar: `,
    },
  ]);
  inventario.mercaderes.añadir(new Mercader(Number(id), nombre, profesion, lugar));
  console.clear();
  promptUser(inventario);
}

/**
 * Función para eliminar entidades (Bien, Cliente, Mercader)
 * @returns void
 */
async function promptEliminar(inventario: Inventario) {
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

/**
 * Función para modificar entidades (Bien, Cliente, Mercader)
 */
async function promptModificar(inventario: Inventario) {
  console.clear();
  console.log(`Modificar\n`);

  const { entidad } = await inquirer.prompt({
    type: 'list',
    name: 'entidad',
    message: 'Seleccione qué desea modificar',
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
    let aux = String(campo).toLowerCase();
    switch (entidad) {
      case Entidades.BIEN:
        inventario.bienes.modificar(Number(id), aux, String(valor));
        break;
      case Entidades.CLIENTE:
        inventario.clientes.modificar(Number(id), aux, String(valor));
        break;
      case Entidades.MERCADER:
        inventario.mercaderes.modificar(Number(id), aux, String(valor));
        break;
    }
  }
}

/**
 * Función para buscar un bien
 * @returns void
 */
async function promptBuscarBien(inventario: Inventario) {
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

  await continuar(inventario);
}

/**
 * Función para localizar un mercader o cliente
 * @returns void
 */
async function promptLocalizar(inventario: Inventario) {
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

  await continuar(inventario);
}

/**
 * Funcion para registrar una transacción
 * 
 * @returns void
 */
async function promptRegistrarTransaccion(inventario: Inventario) {
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

  await continuar(inventario);
}

/**
 * Funcion para generar un informe
 */
async function promptGenerarInforme(inventario: Inventario) {

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

  await continuar(inventario);
}