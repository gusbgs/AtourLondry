'use strict';

const { PORT } = require('./config/env');
const app = require('./app');

app.listen(PORT, () => {
  console.log(`AtourLondry API running on http://localhost:${PORT}`);
});
