const express = require('express');
const Artist = require('../models/artist');
let router = express.Router();

router.get('/', (req, res) => {
    Artist.find({}, (err, doc) =>{
        if(err) return res.send(err.message);
        res.send(doc);
    })
    //.then((data) => {
    //    res.json(data);
    //})
    //.catch((err) => {
    //    console.log(err.message)
    //})
})
router.get('/:nameArtist', (req, res) => {
    let {nameArtist} = req.params;
    //let artist = artists.find( artist => artist.id === Number(id))
    //let artist2 = artists.filter( artist => artist.id === Number(id))
    //artist ? res.json(artist) : res.send(`<h1>Артист не найден</h1>`)
    let artist = Artist.find({name: nameArtist}, (err, doc) =>{
        if(err) res.send(err.message);
        res.status(202).send(doc);
    })
    // .then( artist => {
    //     console.log(artist)
    //     res.json(artist);
    // })
    // .catch(err => {
    //     if(err) console.log(err.message);
    // })
})
router.post('/', (req, res) => {
    //console.log(req.body);
    //let artist = {
    //    id: artists.length,
    //    name: req.body.name
    //}
    //artists.push(artist);
    //res.send(artists);
    //let name = req.body.name;
    const newArtist = new Artist({name: req.body.name});
    newArtist.save((err, artist) => {
        if(err) return res.status(500).json({msg: `Ошибка при сохранении ${err.message}`})
        res.status(200).json({msg: `<h1>Артист: ${req.body.name} успешно сохранен</h1> ${artist}`});
    });
})
router.put('/:id', (req, res) => {
    //const {id} = req.params;
    //let artist = artists.find(artist => Number(id) == artist.id);
    //artist.name = req.body.name;
    //res.send(artists)
    //res.status(200).send('Артист обновлен')
    //Artist.findOneAndUpdate({_id: req.params.id}, {$set: {name: req.body.name}});
    // Artist.findByIdAndUpdate(id, (err, doc) => {
    //     if(err) return console.log(err.message);
    //     doc.name = req.body.name;
    //     doc.save();
    // })
    Artist.findByIdAndUpdate(req.params.id, {name: req.body.name}, (err, doc) =>{
        if(err) res.send(`Ошибка при обновлении ${err.message}`)
        res.send(`<h1>Артист успешно обновлен</h1>`);
    })
})
router.delete('/:id', (req, res) =>{
    let {id} = req.params;
    //artists = artists.filter(art => art.id !== Number(id))
    Artist.findOneAndDelete({_id: id}, (err) => {
        if(err) return res.status(404).send(err.message)
    })
    res.status(200).send(`<h1>Артист удален((((</h1>`)    
})

module.exports = router;