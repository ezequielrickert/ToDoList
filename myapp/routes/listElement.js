const express = require('express');
const router = express.Router();
const listElements = [{id: 0, isActive: true, description: 'Element 1'}, {id: 1, isActive: false, description: 'Element 2'}];

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