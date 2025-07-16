import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import toast from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from '../lib/axios'
import NoNotes from '../components/NoNotes'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () =>{
        try {
            const res = await api.get("/notes")
            setNotes(res.data);
            console.log(res.data);
            setIsRateLimited(false)
        } catch(error){
            console.error("Error fetching notes:", error);
            if(error.response?.status === 429) {
                setIsRateLimited(true);
            }
            else{
                toast.error("Error fetching notes");
            }
        }
        finally{
            setLoading(false);
        }


    }
    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
        <Navbar/>
        {isRateLimited && <RateLimitedUI />}
        <div className='max-w-7xl mx-auto mt-6 p-4'>
        {loading && <p className = "text-center text-secondary py-10">Load the ing...</p>}
        {notes.length === 0 && !isRateLimited && <NoNotes/>}
    {notes.length>0 && !isRateLimited && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' >
            {notes.map((note) => (
           <NoteCard key={note._id} note={note} setNotes={setNotes} />   
            ))}

        </div>

    )}
        </div>
        
        
        </div>
  )
  
  
}

export default HomePage