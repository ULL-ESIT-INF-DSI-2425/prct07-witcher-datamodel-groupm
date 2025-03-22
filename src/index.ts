import inquirer from 'inquirer';
import { Inventario } from './module/inventario.js';
import { Bien } from './module/bien.js';
import { JsonColeccionBienes } from './db/jsonColeccionBienes.js';
import { Cliente } from './module/cliente.js';
import { JsonColeccionClientes } from './db/jsonColeccionClientes.js';
import { Mercader } from './module/mercader.js';
import { JsonColeccionMercaderes } from './db/jsonColeccionMercaderes.js';
import { Transaccion } from './module/transaccion.js';
import { JsonColeccionTransacciones } from './db/jsonColeccionTransacciones.js';
import { mainMenu } from './menu/mainMenu.js';

// Datos iniciales
const declaracionBienes = [
    new Bien(1, 'Espada', 'Prueba', 'Acero de Mahakam', 100, 500),
    new Bien(2, 'Pala', 'Prueba', 'Cuero endurecido', 10, 100),
    new Bien(3, 'Pico', 'Prueba', 'Esencia magica', 200, 200),
    new Bien(4, 'Azada', 'Prueba', 'Acero de Mahakam', 10, 100),
    new Bien(5, 'Hacha', 'Prueba', 'Acero de Mahakam', 10, 200),
    new Bien(6, 'Casco', 'Prueba', 'Cuero endurecido', 200, 500),
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
  
  let bienes = new JsonColeccionBienes(declaracionBienes);
  let clientes = new JsonColeccionClientes(declaracionClientes);
  let mercaderes = new JsonColeccionMercaderes(declaracionMercaderes);
  
  // let inventario = new Inventario(bienes, mercaderes, clientes, new JsonColeccionTransacciones([]));
  
  // Iniciar la aplicación
  // menu.promptUser(inventario);
  mainMenu();