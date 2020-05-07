const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.json());

app.get('/', 
  (req,res) => res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
)

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, '../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
  });
};

app.use((req, res) => res.status(404).sendFile(path.resolve(__dirname, '../client/404.html')))

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`))