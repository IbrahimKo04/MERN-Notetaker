import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router'
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast';


const NoteCard = ({note, setNotes}) => {
    const handleDelete = async (e, id) => {

        e.preventDefault(); // get rid of navigational behaviour
        if(!window.confirm("Are you sure you want to delete this note?")) {
            return;
        }
        try {
                await api.delete(`/notes/${id}`);
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id)); // get rid of deleted note from the state
                toast.success('Your note has been deleted successfully!', {
                    style: {
                        border: '1px solid #00ff00', // green border                        
                        background: '#0f172a',       // dark slate background
                        padding: '16px',
                        color: '#00ff00',            // green text
                    },
                    iconTheme: {
                        primary: '#00ff00',          // green icon
                        secondary: '#0f172a',        // match background
                    },
                });


    } catch (error) {
        console.error("Error in handleDelete", error);
        toast.error('Error deleting note. Please try again later.', {
            style: {
                border: '1px solid #ff0000', // red border
                background: '#0f172a',       // dark slate background
                padding: '16px',            
                color: '#ff0000',            // red text
            },
            iconTheme: {
                primary: '#ff0000',          // red icon
                secondary: '#0f172a',        // match background
            },
        });

    } finally{
        
    }
    }
  return (
    <Link to={`/note/${note._id}`} className=" card bg-base-100 hover:shadow-md transition-all duration-200 border-t-4 border-solid border-secondary hover:border-primary hover:shadow-cyan-700">
        <div className='card-body'>
            <h3 className='card-title text-base-content'>{note.title}</h3>
            <p className = "text-base-content/70">{note.content}</p>
            <div className = "card-actions justify-between items-center mt-4">
                <span className='text-sm text-base-content/50'> {formatDate(new Date(note.createdAt))} </span>
                <div className = "flex items-center gap-1">
                        <PenSquareIcon className='size-4 text-secondary' />
                        <button className='btn btn-ghost btn-xs text-error hover:bg-secondary/10' onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2Icon className='size-4' />
                        </button>

                </div>
                
               
            </div>


        </div>
        
         </Link>

  )
  

}

export default NoteCard;