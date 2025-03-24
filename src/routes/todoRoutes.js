import express from 'express';
import db from '../db.js';

const router = express.Router()


// Get all todos for logged-in
router.get('/', (req, res) => {})

// Create a new todo
router.post('/', (req, res) => {})

// Update a todo
router.put('/:id', (req, res) => {})

router.delete('/:id', (req, res) => {})

export default router;