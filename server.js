const express = require('express');
const connectDB = require('./config/db');
<<<<<<< HEAD
const path = require('path');
=======

>>>>>>> 04ef837301557f88ff69ced70228a9402ab5a514

const app = express();

//initialize Middleware(body-parser- now part of express)
app.use(express.json({ extended: false }));
<<<<<<< HEAD

// connect Database
connectDB();

=======
// connect Database

connectDB();

app.get('/', (req, res) => res.send('API running'));

>>>>>>> 04ef837301557f88ff69ced70228a9402ab5a514
//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
<<<<<<< HEAD

//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
=======
>>>>>>> 04ef837301557f88ff69ced70228a9402ab5a514

PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
