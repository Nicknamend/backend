const express = require('express');

const PORT = process.env.PORT || 3010;
const app = express();

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dasha1000',
    database: 'birds'
});




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

const todoItems = require('./todo-items.json');
app.get('/api/:bb', (req, res) => {
    connection.connect();
    const bird_name=req.params.bb.replace("_", " ");
    console.log(bird_name);
    connection.query('select * from bio_taxons where parentId in (select id from bio_taxons where parentId= (select parentId from bio_taxons where id =(select parentId from bio_taxons where id=(select taxonId from bio_taxons_locale where title_ru=?)))) order by RAND() limit 3', [bird_name], function(err, results) {
        if (err) throw err;
        res.json(results);
    });

    connection.end();
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
