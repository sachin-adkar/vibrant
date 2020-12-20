const app = require('express')();
const mongoose = require('mongoose');
const config = require('./utils/configs');
const bodyParser = require('body-parser');

/**
 * Used for pinging.
 */

app.get('/', (req, res) => {
    res.send({ status: 200, message: 'Server is up and running' });
});

app.use(bodyParser.json({ limit: '6mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '6mb', extended: true }));

require('./routes')(app);

//Server will start only after successful connection to database is established
mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log('Failed to connect Database')
    } else {
        app.listen(config.port, () => {
            console.log('Server is up and running 🤘');
        });
    }
})
