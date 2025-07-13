import Note from '../model/Note.js'; // Adjust the import path as necessary

export async function getAllNotes(req, res){
  try{
      const notes = await Note.find().sort({ createdAt: -1 }); // Sort by creation date, most recent first
      if (!notes || notes.length === 0) {
        return res.status(404).json({ message: 'No notes found' });
      }
      res.status(200).json(notes); // Assuming Note is imported from the model

  }
  catch(error){
    console.error("Error retrieving notes:", error);
      res.status(500).json({ message: 'Error retrieving notes',});
  }
}


export async function getNoteById(req, res){
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
    
  } catch (error) {
    console.error("Error retrieving note:", error);
    res.status(500).json({ message: 'Error retrieving note' });
  }
}

export async function createNote(req, res){
    try{
        const {title, content}= req.body
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json({
        message: 'Note created successfully'
      });
    }
    catch(error){
        console.error("Error creating note:", error);
        res.status(500).json({ message: 'Error creating note',});
    }
}

export async function updateNote(req, res){
    try{
        const {title,content} = req.body
        const updatedNote =   await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if(!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note updated successfully' });
    }
    catch(error){
        console.error("Error updating note:", error);
        res.status(500).json({ message: 'Error updating note',});
    }
}
export async function deleteNote(req, res){
    try{
       const deletedNote =await Note.findByIdAndDelete(req.params.id);
      if(!deletedNote) {
          return res.status(404).json({ message: 'Note not found' });
    
      }}
    catch(error){
        console.error("Error deleting note:", error);
        res.status(500).json({ message: 'Error deleting note',});
    }
}