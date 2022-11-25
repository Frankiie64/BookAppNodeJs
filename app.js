// PACKAGES
const express = require("express");
const path = require("path");
const { engine } = require("express-handlebars");
const sequelize = require("./util/database");
const autor = require("./models/Autor");
const categoria = require("./models/Categoria");
const editorial = require("./models/Editorial");
const libro = require("./models/Libro");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

// Definitions
const app = express();


// Routes
const rouetHome = require("./routes/Home");
const rouetLibro = require("./routes/Libro");
const rouetCategoria = require("./routes/Categoria");
const rouetAutor = require("./routes/Autor");
const rouetEditorial = require("./routes/Editorial");
const rouetStatusView = require("./routes/Status");

//Helpers
const GetCurrenteYear = require("./helper/hbs/GetCurrentYear");
const GetComparece = require("./helper/hbs/IsEqual");

// Config hbs
app.engine("hbs", engine({
    layoutsDir: 'views/Layouts/', defaultLayout: 'main-layout', extname: 'hbs',
    helpers: {
        getCurrenteYear: GetCurrenteYear.getCurrentYear,
        isEqual: GetComparece.IsEqual,
    }
}));

app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use("/img",express.static(path.join(__dirname, "img")));


app.use(express.urlencoded({ extended: false }));

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "img");
    },
    filename: (req, file, cb) => {
        cb(null, `${uuidv4()}-${file.originalname}`);
    },
});

// Middleware

app.use(multer({ storage: imageStorage }).single("Image"));

app.use(rouetHome);
app.use(rouetLibro);
app.use(rouetAutor);
app.use(rouetCategoria);
app.use(rouetEditorial);


// Error view (404)
app.use(rouetStatusView);

// Relation

libro.belongsTo(editorial, { constraint: true, onDelete: "CASCADE" });
editorial.hasMany(libro);
libro.belongsTo(autor, { constraint: true, onDelete: "CASCADE" });
autor.hasMany(libro);
libro.belongsTo(categoria, { constraint: true, onDelete: "CASCADE" });
categoria.hasMany(libro);

//Sincronizacion con la db

sequelize.sync().then((result) => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
