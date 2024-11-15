const express = require('express');
const app = express();
const port = 3000;
const expressHbs = require('express-handlebars');
const {emotions, categories, products, zodiacs} = require('./data');

app.use(express.static(__dirname + '/html', {index: "index.htm"}));

app.engine(
    "hbs",
    expressHbs.engine({
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
        extname: "hbs",
        defaultLayout: "layout"
    })
)
app.set('view engine', 'hbs');

app.get('/', (req, res) => {res.render("index", {title: "Jeopardize Contest"})});

app.get('/task1', (req, res) => {
    res.locals.title = "Inspiring Quotes";
    res.locals.emotions = emotions;
    res.render("task1");
});

app.get('/task2', (req, res) => {
    let salary = req.query.salary ? parseInt(req.query.salary) : 0;
    let j55 = salary * 55 / 100;
    let j10 = salary * 10 / 100;
    let j5 = salary * 5 / 100;
    res.locals.title = "Jars Saving";
    res.render("task2", {j55, j10, j5});
});

app.get('/task3', (req, res) => {
    let category = req.query.category;
    res.locals.title = "TV Sales";
    res.locals.categories = categories;
    res.locals.products = category ? products.filter((item)=> item.category == category) : products;
    res.render("task3");
});

app.use("/task4", require("./routers/task4Router"));


app.get('/xyz', (req, res) => {res.render("xyz", {layout: "admin"})});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});