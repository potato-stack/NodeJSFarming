import { Container } from 'inversify';
import 'reflect-metadata';
import { registerInfra } from './bindingInfra.js';

const dependencies = new Container();

registerInfra(dependencies);

export { dependencies };
