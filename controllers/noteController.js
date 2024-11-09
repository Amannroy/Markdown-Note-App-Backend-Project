import { marked } from "marked";
import Note from "../models/Note.js";
import axios from "axios";
import {URLSearchParams} from 'url';

// Save a new note
export const saveNote = async(req, res) => {
    try{
        const {title, content} = req.body;
        const htmlContent = marked(content); //Converting markdown to HTML
        const note = new Note({title, content, htmlContent});
        await note.save();
        res.status(201).json({message: "Note saved successfully", note});

    }catch(error){
        res.status(500).json({message: "Error saving note", error});
    }
}


// List all notes
export const listNotes = async(req, res) => {
    try{
        const notes = await Note.find();
        res.json(notes);
    }catch(error){
        res.status(500).json({message: "Error retrieving notes", error});
    }
}

// Rerender a specific note as HTML
export const renderNote = async(req, res) =>{
    try{
      const note = await Note.findById(req.params.id);
      if(!note) return res.status(404).json({message: "Note not found"});
      res.send(note.htmlContent);
    }catch(error){
      res.status(500).json({message: "Error rendering note", error});
    }
}

//  Grammar Check using language tool API
export const checkGrammar = async(req,res) => {
    const {text} = req.body; // Getting the markdown text from the request body

    // Checking if text is provided
    if(!text){
        return res.status(400).json({message: "Missing 'text' parameter in the request body."})
    }
    try{
        // Set up the data to be sent in the required format
        const params = new URLSearchParams();
        params.append('text', text); // Text to be checked
        params.append('language', 'en-us'); // language of the text

         // Send request to languageTool API for grammar checking
         const response = await axios.post('https://api.languagetool.org/v2/check', params, {
            headers: {
                'Content-Type': 'application/x-www-form-form-urlencoded',
            },
         });
         const matches = response.data.matches; // Getting grammar issues from the response

         // If there are grammar issues, return them
         if(matches.length > 0){
            res.status(200).json({
                message: 'Grammar issues found',
                issues: matches,
            });
         }else{
            res.status(200).json({
                message: 'No grammar issues found',
                issues: [],
            })
         }
    }catch(error){
          console.error("Error checking grammar:", error);
          res.status(500).json({message: "Error checking grammar", error});
    }
}