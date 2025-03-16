const connectToMongo = require('./db'); 
const express = require('express');

const app = express();
const port = 5000;

app.use(express.json())

//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

connectToMongo()
  .then(() => {
    app.listen(port, () => {
      console.log(`iNoteBook backend: Server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB. Server not started.", err);
  });

app.get('/', (req, res) => {
  res.send('Connection successful. Hi Anshul!');
});
