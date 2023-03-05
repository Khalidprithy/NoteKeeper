import React from 'react';
import { GoPin } from 'react-icons/go';
import { AiFillDelete } from 'react-icons/ai';
import { useMutation, useQueryClient } from 'react-query';
import IsLoading from './IsLoading';
import { toast } from 'react-hot-toast';

const NoteCard = ({ note, refetch }) => {

    const queryClient = useQueryClient();

    const { mutate, isLoading } = useMutation(
        (id) => fetch(`http://localhost:5000/note/${id}`, {
            method: 'DELETE'
        }),
        {
            onSuccess: (data) => {
                // Invalidate and refetch the notes query to update the UI
                queryClient.invalidateQueries('notes');
                refetch();
                console.log(data)
            },
            onError: (error) => {
                console.error(error);
            }
        }
    );

    const handleDeleteNote = (id) => {
        mutate(id);
    }

    const handleTogglePinned = (id) => {
        const url = `http://localhost:5000/note/${id}`;
        const noteData = {
            title: note.title,
            noteBody: note.noteBody,
            tagline: note.tagline,
            date: note.date,
            isPinned: !note.isPinned,
            isCompleted: note.isCompleted,
            isDeleted: note.isDeleted,
        };
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(noteData)
        })
            .then(res => res.json())
            .then(data => {
                refetch();
                toast.success("Note Pinned Successful")

            })
            .catch(error => {
                toast.error(error)
            })
    }

    if (isLoading) {
        return <IsLoading />
    }

    return (
        <div className='border-2 border-gray-400 hover:bg-gray-100 rounded-md p-2 relative pb-10'>
            <h4>{note.title}</h4>
            <div>
                <p>{note.noteBody}</p>
                <p className='text-sm font-semibold'>#{note.tagline}</p>
                <button
                    onClick={() => handleTogglePinned(note._id)}
                    className={`absolute right-1 top-1 rounded-full ${note.isPinned ? 'text-gray-800' : 'text-gray-400'} hover:bg-gray-200 p-1`}><GoPin className='text-xl -rotate-45' /></button>

                <button
                    onClick={() => handleDeleteNote(note._id)}
                    disabled={isLoading}
                    className='absolute right-1 bottom-1 hover:bg-gray-300 rounded-full text-gray-400 hover:text-orange-500 p-1 transition-all ease-in duration-200'><AiFillDelete className='text-xl' /></button>
            </div>
        </div>
    );
};

export default NoteCard;