import path from 'path';

// Use process.cwd() as the base directory for compatibility
const ROOT_DIR = process.cwd();

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
  ROOT_DIR: ROOT_DIR,
  URL_PORT: 8080,
  URL_PATH: 'https://api.nory.example.com',
  BASE_VERSION: '/api',
  CONTROLLER_DIRECTORY: path.join(ROOT_DIR, 'controllers'),
  PROJECT_DIR: ROOT_DIR,
  OPENAPI_YAML: '',
  FULL_PATH: '',
  FILE_UPLOAD_PATH: '',
};

config.OPENAPI_YAML = path.join(config.ROOT_DIR, '..', 'api', 'openapi.yaml');
config.FULL_PATH = `${config.URL_PATH}:${config.URL_PORT}/${config.BASE_VERSION}`;
config.FILE_UPLOAD_PATH = path.join(config.PROJECT_DIR, '..', 'uploaded_files');

export default config;
