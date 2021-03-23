const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

require('./database');

// settings
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('start'));
app.use(express.json());
app.use(cors({origin:"http://localhost:4200"}));

// routes
app.use('/api', require('./src/routes/user.route'));

app.listen(app.get('port'));
console.log('Server on port', app.get('port'));