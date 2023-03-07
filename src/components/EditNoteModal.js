import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const EditNoteModal = ({ refetch, updateNote, tempUpdateNote, setTempUpdateNote }) => {

    const formattedTime = tempUpdateNote?.date?.timestamp;
    const time = moment(formattedTime).format('h:mm A');

    const [changed, setChanged] = useState(false);
    const [postData] = useState({
        message: 'Edited',
        timestamp: new Date().toISOString()
    });

    // Edit note function
    const handleEditNote = async () => {
        const { _id, ...updatedNote } = tempUpdateNote;
        const url = `https://todo-server-ze08.onrender.com/note/${updateNote._id}`;
        console.log(tempUpdateNote)
        await fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedNote)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Note Updated')
            })
        await refetch();
        setChanged(false)
    }

    return (
        <>
            <input type="checkbox" id="edit-note-modal" className="modal-toggle" />
            <div className="modal backdrop-blur-md">
                <div className="modal-box w-full md:w-8/12 relative rounded-md">
                    <label htmlFor="edit-note-modal" className="btn btn-sm btn-circle border-0 hover:bg-success absolute right-2 top-2">✕</label>
                    <div className='flex flex-col gap-4 mt-6'>
                        <div className="form-control w-full">
                            <input
                                className='input w-full border border-gray-400 px-2'
                                value={tempUpdateNote?.title}
                                placeholder='Add note title'
                                onChange={(e) => {
                                    setChanged(true);
                                    setTempUpdateNote({
                                        ...tempUpdateNote,
                                        title: e.target.value,
                                        date: postData,
                                    });
                                }}
                                type="text" />
                        </div>
                        <div className="form-control w-full">
                            <textarea
                                className='input w-full border border-gray-400 h-auto min-h-16 p-2'
                                value={tempUpdateNote?.noteBody}
                                placeholder='Add note body'
                                onChange={(e) => {
                                    setChanged(true)
                                    setTempUpdateNote({
                                        ...tempUpdateNote,
                                        noteBody: e.target.value,
                                        date: postData,
                                    })
                                }}
                                type="text" />
                        </div>
                        <div className="form-control w-full">
                            <input
                                className='input w-full border border-gray-400 px-2 mb-5'
                                value={tempUpdateNote?.tagline}
                                placeholder='Add tagline'
                                onChange={(e) => {
                                    setChanged(true);
                                    setTempUpdateNote({
                                        ...tempUpdateNote,
                                        tagline: e.target.value,
                                        date: postData,
                                    });
                                }}
                                type="text" />
                        </div>
                        <h4 className='absolute left-6 bottom-4 text-sm font-medium'>{tempUpdateNote?.date?.message} {time}</h4>
                        {
                            changed && <div className="modal-action mt-1">
                                <label
                                    htmlFor="edit-note-modal"
                                    className='btn btn-sm btn-success rounded-md text-white'
                                    onClick={handleEditNote}
                                >Save</label>
                                <label
                                    htmlFor="edit-note-modal"
                                    className="btn btn-sm rounded-md text-white"
                                    onClick={(e) => {
                                        setChanged(false)
                                        setTempUpdateNote({ ...updateNote })
                                    }}
                                >Cancel</label>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditNoteModal;