const EventEmitter = require('events');
const jobEmitter = new EventEmitter();

// Optional: limit the number of listeners to prevent memory leaks warning
jobEmitter.setMaxListeners(100);

module.exports = { jobEmitter };