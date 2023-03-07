import React, { useState } from 'react';
import { GoPin } from 'react-icons/go';
import { FaTrashRestore } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import moment from 'moment/moment';
import EditNoteModal from '../../components/EditNoteModal';
import ConfirmDeleteModal from '../../components/ConfirmDeleteModal';
import Loading from '../../components/Loading';

const NoteCard = ({ note, refetch, isLoading, updateNote, setUpdateNote, tempUpdateNote, setTempUpdateNote, deleteNote, setDeleteNote }) => {

    const formattedTime = note.date.timestamp;
    const time = moment(formattedTime).format('h:mm A');
    const [noteOpen, setNoteOpen] = useState('');

    const handleTogglePinned = (id) => {
        const url = `https://todo-server-ze08.onrender.com/note/${id}`;
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
                toast.success(`${note.isPinned ? 'Note Unpinned' : 'Note Pinned'} `)
            })
            .catch(error => {
                toast.error(error)
            });
    }


    const handleDeleteNotes = (id) => {
        const url = `https://todo-server-ze08.onrender.com/note/${id}`;
        const noteData = {
            title: note.title,
            noteBody: note.noteBody,
            tagline: note.tagline,
            date: note.date,
            isPinned: note.isPinned,
            isCompleted: note.isCompleted,
            isDeleted: !note.isDeleted,
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
                toast.success(`${note.isDeleted ? 'Restored' : 'Note Moved to Deleted'} `)

            })
            .catch(error => {
                toast.error(error)
            });
    }


    if (isLoading) {
        return <Loading />
    }

    return (
        <div
            onMouseEnter={() => setNoteOpen(note._id)}
            onMouseLeave={() => setNoteOpen('')}
            className={`h-fit border border-gray-300 dark:bg-gray-400 ${note.isDeleted && 'bg-gray-300 hover:bg-gray-300 hover:shadow-md'} hover:bg-gray-100 hover:shadow-lg rounded-md p-2 relative pb-10 transition-all ease-in duration-150`}>
            <h4 className='font-medium pr-3'>{note.title}</h4>
            <div>
                <p className='text-gray-700'>{note.noteBody}</p>
                <p className='text-sm font-semibold'>{note.tagline}</p>
                {
                    !note.isDeleted &&
                    <button
                        onClick={() => handleTogglePinned(note._id)}
                        className={`absolute right-1 top-1 rounded-full ${note.isPinned ? 'text-gray-800' : 'text-gray-400'} hover:bg-gray-200 p-1`}><GoPin className='text-xl -rotate-45' /></button>
                }

                {
                    noteOpen === note._id &&
                    <div>
                        <h4 className='absolute left-2 bottom-2 text-sm font-medium'>{time}</h4>
                        {/* The button to open edit notes modal */}
                        {
                            !note.isDeleted &&
                            <label
                                htmlFor="edit-note-modal"
                                onClick={() => {
                                    setUpdateNote(note)
                                    setTempUpdateNote(note)
                                }}
                                className='absolute right-9 bottom-[5px] hover:bg-gray-300 rounded-full text-gray-400 hover:text-teal-500 p-1 transition-all ease-in duration-200'><AiFillEdit className='text-xl' /></label>
                        }

                        <div className={`absolute right-1 bottom-1 tooltip ${note.isDeleted ? 'tooltip-success' : 'tooltip-error'} tooltip-bottom`} data-tip={`${note.isDeleted ? 'Restore' : 'Delete'}`}>
                            <button
                                onClick={() => handleDeleteNotes(note._id)}
                                className=' hover:bg-gray-300 rounded-full text-gray-400 hover:text-orange-500 p-1 transition-all ease-in duration-200'>
                                {
                                    note.isDeleted ?
                                        <FaTrashRestore className='text-base' />
                                        :
                                        <AiFillDelete className='text-xl' />
                                }

                            </button>
                        </div>
                        {
                            note.isDeleted &&
                            <div className="absolute right-[2px] top-0 tooltip tooltip-error tooltip-right" data-tip='Wipe Out'>
                                <label
                                    onClick={() => {
                                        setDeleteNote(note)
                                    }}
                                    htmlFor="confirm-delete-modal"
                                    className='absolute top-0 right-0 hover:bg-gray-300 rounded-full text-red-500 hover:text-red-600 p-1 transition-all ease-in duration-200'><MdDeleteForever className='text-xl' /></label>
                            </div>
                        }
                    </div>
                }
            </div>
            <ConfirmDeleteModal
                refetch={refetch}
                deleteNote={deleteNote}
            />

            <EditNoteModal
                refetch={refetch}
                updateNote={updateNote}
                tempUpdateNote={tempUpdateNote}
                setTempUpdateNote={setTempUpdateNote}
            />
        </div>
    );
};

export default NoteCard;