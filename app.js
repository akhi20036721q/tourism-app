const express=require('express');
const Mongoose=require('mongoose');
const cors = require('cors');
const app=express();
const path=require('path');
require('dotenv').config();
const flipRouter = require('./router/fliprouter');



Mongoose.connect(process.env.Mongodb).then(()=>{
    console.log("mongodb connected");
});

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to enable CORS
app.use(cors());
// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Import and use the blog routes
app.use('/api', flipRouter);

// Serve the main HTML file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});
    
const PORT=7000;

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});