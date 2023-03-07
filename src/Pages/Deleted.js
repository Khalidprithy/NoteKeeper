import React, { useState } from 'react';
import { useQuery } from 'react-query';
import IsLoading from '../components/IsLoading';
import NoteCard from '../components/NoteCard';

const Deleted = () => {
    const [deleteNote, setDeleteNote] = useState();

    const { data: notesData, refetch, isLoading } = useQuery('notesData', () => fetch(`http://localhost:5000/notes`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()));

    const deleteNotes = notesData?.filter((note) => note.isDeleted === true);

    if (isLoading) {
        return (<IsLoading />)
    }


    async function handleEmptyTrash() {
        try {
            const response = await fetch('http://localhost:5000/empty_trash', { method: 'DELETE' });
            const data = await response.json();
            console.log(data)
            refetch();
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <div>
            <div className='p-4'>
                {
                    deleteNotes?.length === 0 ?
                        <h4 className='text-md text-center md:text-lg text-gray-600 font-medium py-2'>Empty</h4>
                        :
                        <>
                            <div className='flex items-center justify-between mb-4'>
                                <h4 className='text-md md:text-lg text-gray-600 font-medium py-2'>Deleted Notes</h4>
                                <label
                                    htmlFor="empty-trash-modal"
                                    className='btn btn-sm btn-error'>Empty Trash</label>

                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
                                {
                                    deleteNotes?.map(note =>
                                        <NoteCard
                                            key={note._id}
                                            note={note}
                                            refetch={refetch}
                                            deleteNote={deleteNote}
                                            setDeleteNote={setDeleteNote}
                                        />
                                    )
                                }
                            </div>
                        </>
                }
            </div>



            <div>
                {/* Put this part before </body> tag */}
                <input type="checkbox" id="empty-trash-modal" className="modal-toggle" />
                <div className="modal backdrop-blur-md">
                    <div className="modal-box relative">
                        <label htmlFor="empty-trash-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="text-lg font-bold">Are you sure you want to delete all deleted data?</h3>
                        <p className='text-gray-500 font-medium'>This action cannot be undone and you will lose all your deleted notes data.</p>
                        <div className="modal-action mt-4">
                            <label
                                htmlFor="empty-trash-modal"
                                className='btn btn-sm btn-error rounded-md text-white'
                                onClick={handleEmptyTrash}
                            >Confirm</label>
                            <label
                                htmlFor="empty-trash-modal"
                                className="btn btn-sm rounded-md text-white"
                            >Cancel</label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Deleted;