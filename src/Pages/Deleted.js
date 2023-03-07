import React, { useContext, useState } from 'react';
import ConfirmEmptyTrashModal from '../components/ConfirmEmptyTrashModal';
import IsLoading from '../components/Loading';
import NoteContext from '../context/NoteContext';
import NoteCard from './Notes/NoteCard';

const Deleted = () => {

    const [deleteNote, setDeleteNote] = useState();
    const { deleteNotes, isLoading, refetch } = useContext(NoteContext);


    if (isLoading) {
        return (<IsLoading />)
    }

    return (
        <>
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
            <ConfirmEmptyTrashModal
                refetch={refetch}
            />
        </>
    );
};

export default Deleted;