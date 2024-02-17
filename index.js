// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/routes');
const path = require('path');
const cors = require('cors'); // Add this line


const app = express();
app.use(cors());
// Handle requests that don't match the static files

app.set('trust proxy', true);
// Allow requests from all origins (for testing purposes)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/lead', leadRoutes);

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//  });

app.get('/', (req, res) => {
  res.send('Node.js Setup Success!')
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
