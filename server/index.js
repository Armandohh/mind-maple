const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');
app.use(express.json());
app.use(cors());

//-Routers
//deck router
const deckRouter = require('./routes/deck')
app.use('/decks', deckRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log('Server running on port 3001!');
    });
})