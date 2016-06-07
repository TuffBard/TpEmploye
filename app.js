//Utilisation de express
var express = require('express');
//Utilisation de mongoose
var mongoose = require('mongoose');


//Connexion a la base mongodb
mongoose.connect('mongodb://192.168.99.100:32769/tpemploye', function(err) {
  if (err) { throw err; }
});

//Création du schema employe
var Schema = mongoose.Schema;
var employesSchema = new Schema({
  prenom: String,
  nom: String
});
//Création du model Employes
var Employes = mongoose.model('employes',employesSchema);

//Création de l'application express
var app = express();
//Page d'accueil de l'application
app.get('/', function(req, res) {
    res.render("home.ejs",{});
});

//Listes des employés
app.get('/collaborateurs', function(req, res) {
    //res.render("collaborateurs.ejs",{});

    //Connexion à la base
    var db = mongoose.connection;

    // //Si erreur de connexion
    // db.on('error', console.error.bind(console, 'connection error:'));
    //
    // db.once('open', function() {
    //
    //
    //   Employes.find(function(err,employes){
    //     if (err) return console.error(err);
    //     var message = 'Les employées: '+employes;
    //     console.log(employes);
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.end(message);
    //   });
    // });
    Employes.find({}, function (err, docs) {
        res.json(docs);
    });
});

//Fiche d'un employé selon son id
app.get('/collaborateurs/:id', function(req, res) {
    var message = 'Ici les infos de l\'employe :'+req.params.id;
    res.setHeader('Content-Type', 'text/plain');
    res.end(message);
});

app.listen(80);
//fermeture de la base
mongoose.connection.close();
