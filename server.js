// app.js
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');

dotenv.config();

const app = express();

app.use('/imgproducts', express.static('imgproducts'));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./Models");
db.sequelize.sync();

// require('./Routes/user.routes.js')(app);
require('./Routes/product.routes.js')(app);
require('./Routes/auth.routes.js')(app);
require('./Routes/brand.routes.js')(app);
require('./Routes/category.routes.js')(app);
require('./Routes/review.routes.js')(app);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
