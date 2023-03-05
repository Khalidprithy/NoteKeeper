import React from 'react';
import NoteCard from '../../components/NoteCard';

const PinnedNotes = ({ pinnedNotes, refetch }) => {
    return (
        <div className='p-4'>
            <h4 className='text-md md:text-lg text-gray-600 font-medium py-2'>Pinned Notes</h4>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
                {
                    pinnedNotes?.map(note =>
                        <NoteCard
                            key={note._id}
                            note={note}
                            refetch={refetch}
                        />
                    )
                }
            </div>
        </div>
    );
};

export default PinnedNotes;