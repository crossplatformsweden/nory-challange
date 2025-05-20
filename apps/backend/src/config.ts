import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Config {
  ROOT_DIR: string;
  URL_PORT: number;
  URL_PATH: string;
  BASE_VERSION: string;
  CONTROLLER_DIRECTORY: string;
  PROJECT_DIR: string;
  OPENAPI_YAML: string;
  FULL_PATH: string;
  FILE_UPLOAD_PATH: string;
}

const config: Config = {
  ROOT_DIR: __dirname,
  URL_PORT: 8080,
  URL_PATH: 'https://api.nory.example.com',
  BASE_VERSION: '/api',
  CONTROLLER_DIRECTORY: path.join(__dirname, 'controllers'),
  PROJECT_DIR: __dirname,
  OPENAPI_YAML: '',
  FULL_PATH: '',
  FILE_UPLOAD_PATH: '',
};

config.OPENAPI_YAML = path.join(config.ROOT_DIR, '..', 'api', 'openapi.yaml');
config.FULL_PATH = `${config.URL_PATH}:${config.URL_PORT}/${config.BASE_VERSION}`;
config.FILE_UPLOAD_PATH = path.join(config.PROJECT_DIR, '..', 'uploaded_files');

export default config;
