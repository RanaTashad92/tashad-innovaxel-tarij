require('dotenv').config();
const express =require ('express');
const app = express();
const mongoose =require ('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error('Connection error:', error));
db.once('open', () => console.log('Connected to Database'));

//ALLOWING JSON DATA FORMAT
app.use(express.json()); 

//Setting Routes
const UrlRouter=require('./routes/urls');
app.use('/urls', UrlRouter);


app.listen(3000, () => {
    console.log('Server Started');
  });