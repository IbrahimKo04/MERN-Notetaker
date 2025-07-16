import { ArrowLeftIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import toast from 'react-hot-toast';
import axios from 'axios';
import api from '../lib/axios';

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content,setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log("Title:", title);
    console.log("Content:", content);
    if(!title.trim() || !content.trim()){
        toast.error('Dearest Human, Title yourself, and be Content with your content.', {
  style: {
    border: '1px solid #00ffff', // cyan border
    background: '#0f172a',       // dark slate background
    padding: '16px',
    color: '#00ffff',            // cyan text
  },
  iconTheme: {
    primary: '#00ffff',          // cyan icon
    secondary: '#0f172a',        // match background
  },
});
        return;

    }
    setLoading(true);
    try {
        await api.post("http://localhost:5001/api/notes", {
            title,
            content
        });
        toast.success('Your note has been created successfully!', {
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
        navigate("/")
    } catch (error) {
        console.error("Error creating note:", error);
        if(error.response.status ===429){
            toast.error('Slow down, speedy guy!', {
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
                duration: 5000,

            });
        }
        else{ 
            toast.error('Something went wrong while creating your note. Please try again.', {
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
}
    } finally {
        setLoading(false);
    }
  }
  return (
    <div className = "min-h-screen bg-base-300">
        <div className = "container mx-auto px-4 py-8">
            <Link to = "/" className = "btn btn-ghost mb-6"> 
                <ArrowLeftIcon className = "size-6 text-secondary" />
                    <p className = "text-primary"> Back to your dreamland </p></Link>
            <div className = "card bg-base-100">
                <div className = "card-body">
                    <h2 className = "card-title text-4xl mb-4 font-bold"> Create a New Think</h2>
                    <form onSubmit={handleSubmit}>
                        <div className = "form-control mb-4">
                            <label className = "label">
                                <span className = "label-text"> Title </span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Enter your title here" 
                                className="input input-bordered" 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                            />

                        </div>
                        <div className = "form-control mb-4">
                            <label className = "label">
                                <span className = "label-text">Content</span>
                            </label>
                            <textarea
                                type="text" 
                                placeholder="Enter your content here" 
                                className="textarea textarea-bordered" 
                                value={content} 
                                onChange={(e) => setContent(e.target.value)} 
                            />

                        </div>

                        <div className="card-actions justify-end">
                            <button type = "submit" className="btn btn-primary" disabled={loading}>
                                {loading? "Creating..." : "Create Note"}
                            </button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    </div>
  )
}

export default CreatePage