import config from './config';
import logger from './logger.js';
import ExpressServer from './expressServer.js';

let expressServer: ExpressServer;

const launchServer = async (): Promise<void> => {
  try {
    expressServer = new ExpressServer(config.URL_PORT, config.OPENAPI_YAML);
    expressServer.launch();
    logger.info('Express server running');
  } catch (error) {
    logger.error('Express Server failure', (error as Error).message);
    await close();
  }
};

const close = async (): Promise<void> => {
  if (expressServer) {
    await expressServer.close();
  }
};

launchServer().catch((e) => logger.error(e));

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  await close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT signal received: closing HTTP server');
  await close();
  process.exit(0);
});
