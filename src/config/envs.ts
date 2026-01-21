import 'dotenv/config';
import * as joi from 'joi';

interface EnvVariables {
  PORT: number;
  PRODUCTOS_MICROSERVICE_HOST: string;
  PRODUCTOS_MICROSERVICE_PORT: number;
}

const envvariablesRequeridas= joi.object({
  PORT: joi.number().required(),
  PRODUCTOS_MICROSERVICE_HOST: joi.string().required(),
  PRODUCTOS_MICROSERVICE_PORT: joi.number().required(),
})
.unknown(true);

const {error, value} = envvariablesRequeridas.validate(process.env);
if (error) {
  throw new Error(`error en la configuración: ${error.message}`);
}

const enVars: EnvVariables = value;

export const envs = {  
    port: enVars.PORT,
    productsMicroserviceHost: enVars.PRODUCTOS_MICROSERVICE_HOST,
    productsMicroservicePort: enVars.PRODUCTOS_MICROSERVICE_PORT,
};    