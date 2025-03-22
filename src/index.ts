import inquirer from 'inquirer';
import { Inventario } from './inventario.js';
import { Bien } from './bien.js';
import { ColeccionBienes, JsonColeccionBienes } from './coleccionBienes.js';
import { Cliente } from './cliente.js';
import { ColeccionClientes, JsonColeccionClientes } from './coleccionClientes.js';
import { Mercader } from './mercader.js';
import { ColeccionMercaderes, JsonColeccionMercaderes } from './coleccionMercaderes.js';
import { Transaccion } from './transaccion.js';
import { ColeccionTransacciones, JsonColeccionTransacciones } from './coleccionTransacciones.js';
import * as menu from './menu.js';

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
  
  let inventario = new Inventario(bienes, mercaderes, clientes);
  
  // Iniciar la aplicación
  menu.promptUser(inventario);