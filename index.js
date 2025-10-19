const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Article = require('./models/Article');



const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connexion MongoDB
mongoose.connect('mongodb+srv://iskaryoucha:UHsOMYuZrejeHXYC@cluster0.n3rggqi.mongodb.net/crud?retryWrites=true&w=majority&appName=Cluster0');


app.get('/',async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 }); // tri par date décroissante
    res.render('afficherArticle', { articles });
  } catch (err) {
    res.status(500).send('❌ Erreur lors de la récupération des articles.');
  }
});
// Afficher le formulaire
app.get('/articles/new', (req, res) => {
  res.render('Article');
});

// Ajouter un article
app.post('/articles', async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
     res.redirect('/articles');

    
  } catch (err) {
    res.status(500).send('❌ Erreur lors de l\'ajout de l\'article.');
  }
});
app.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find().sort({ date: -1 }); // tri par date décroissante
    res.render('afficherArticle', { articles });
  } catch (err) {
    res.status(500).send('❌ Erreur lors de la récupération des articles.');
  }
});




// Lancer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});