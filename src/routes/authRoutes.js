import express from 'express';
import bcrypt, { genSalt } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

// Register a new user endpoint /auth/register
router.post('/register', (req, res) => {
    const {username, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to db
    try {
        const insertUser = db.prepare(`INSERT INTO users(username, password) 
            VALUES (?, ?)`);
        const result = insertUser.run(username, hashedPassword);

        const defaultTodo = `Hello :) Add your first todo!`;
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
            VALUES (?, ?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo)    

        // create a token
        const token = jwt.sign({id: result.lastInsertRowid},
            process.env.JWT_SECRETKEY, {expiresIn: '24h'})
            res.json({ token })
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }

    res.sendStatus(201)
})

router.post('/login', (req, res) => {})

const {username, password} = req.body

try {

} catch (err) {
    console.log(err.message)
    res.sendStatus(503)
}


export default router;