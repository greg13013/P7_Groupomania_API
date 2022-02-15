// const http = require('http');
const app = require('./app');

// app.set('port', process.env.PORT || 3000);
// const server = http.createServer(app);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`-------------------- Server is running on port ${PORT}. -------------------------`);
});
