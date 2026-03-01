const app = require('./app');
const { PORT, NODE_ENV } = require('./config/env');

app.listen(PORT, () => {
  console.log(`AtourLondry API running on port ${PORT} [${NODE_ENV}]`);
});
