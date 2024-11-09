import express from 'express';
import { checkGrammar, listNotes, renderNote, saveNote } from '../controllers/noteController.js';


const router = express.Router();

// Save a new note
router.post('/save', saveNote);

// List all notes
router.get('/list', listNotes);

// Render markdown to HTML
router.get('/render/:id', renderNote);

// Grammar check
router.post('/check-grammar', checkGrammar);


export default router;
