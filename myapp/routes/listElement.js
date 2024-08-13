const express = require('express');
const router = express.Router();
const listElements = [];

router.post('/', (req, res) => {
    listElements.push(req.body);
    res.json({ message: 'Element added' });
});

router.get('/', (req, res) => {
    res.json(listElements);
});

router.get('/:id', (req, res) => {
    res.json(listElements[req.params.id]);
});

router.put('/:id', (req, res) => {
    listElements[req.params.id] = req.body;
    res.json({ message: 'Element updated' });
});

router.delete('/:id', (req, res) => {
    listElements.splice(req.params.id, 1);
    res.json({ message: 'Element deleted' });
});

module.exports = router;