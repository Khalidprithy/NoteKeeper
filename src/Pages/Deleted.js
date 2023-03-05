import React from 'react';
import { useQuery } from 'react-query';
import NoteCard from '../components/NoteCard';

const Deleted = () => {

    const { data: notesData, refetch, isLoading } = useQuery('notesData', () => fetch(`http://localhost:5000/notes`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()));


    const deleteNotes = notesData?.filter((note) => note.isDeleted === true);

    return (
        <div>
            <div className='p-4'>
                {
                    deleteNotes?.length === 0 ?
                        <h4 className='text-md text-center md:text-lg text-gray-600 font-medium py-2'>Empty</h4>
                        :
                        <>
                            <h4 className='text-md md:text-lg text-gray-600 font-medium py-2'>Deleted Notes</h4>
                            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
                                {
                                    deleteNotes?.map(note =>
                                        <NoteCard
                                            key={note._id}
                                            note={note}
                                            refetch={refetch}
                                        />
                                    )
                                }
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Deleted;