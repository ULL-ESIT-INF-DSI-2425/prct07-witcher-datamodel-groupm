import inquirer from 'inquirer';
import { Inventario } from './inventario.js';
import { Bien } from './bien.js';
import { ColeccionBienes } from './coleccionBienes.js';
import { Cliente } from './cliente.js';
import { ColeccionClientes } from './coleccionClientes.js';
import { Mercader } from './mercader.js';
import { ColeccionMercaderes } from './coleccionMercaderes.js';
import { ColeccionTransacciones, Transaccion } from './transaccion.js';
import * as menu from './menu.js';

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
  menu.promptUser(inventario);