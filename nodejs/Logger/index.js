const fs = require('fs');
const os = require('os');
const EventEmitter = require('events');

const logFilePath = './logs.txt';

class Logger extends EventEmitter {
  log(message) {
    this.emit('message', { message });
  }
}
const logger = new Logger();
const logToFile = (event) => {
  const logMessage = `${new Date().toISOString()} - ${event.message}${os.EOL}`;
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
};

setInterval(() => {
  const memoryUsage = (os.freemem() / os.totalmem()) * 100;
  logger.log(`Memory usage: ${memoryUsage.toFixed(2)}%`);
}, 3000);
logger.on('message', logToFile);
logger.log('Application started');
logger.log('Application ended');
