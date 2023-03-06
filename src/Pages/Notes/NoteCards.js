import React, { useContext, useState } from 'react';
import IsLoading from '../../components/IsLoading';
import NoteCard from '../../components/NoteCard';
import Pagination from '../../components/Pagination';
import PinnedPagination from '../../components/PinnedPagination';
import NoteContext from '../../context/NoteContext';

const NoteCards = () => {

    const [updateNote, setUpdateNote] = useState();
    const [tempUpdateNote, setTempUpdateNote] = useState();

    const { currentPage, currentPinnedPage, notesPerPage, notesPinnedPerPage, pinnedNotes, unPinnedNotes, activeNotes, activePinnedNotes, paginate, paginatePinned, refetch, isLoading } = useContext(NoteContext);


    if (isLoading) {
        return <IsLoading />
    }
    return (
        <div>
            <div>
                {
                    pinnedNotes?.length === 0 ||
                    <div className='p-4'>
                        <h4 className='text-md md:text-lg text-gray-600 font-medium py-2'>Pinned Notes</h4>
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
                            {
                                activePinnedNotes?.map(note =>
                                    <NoteCard
                                        key={note._id}
                                        note={note}
                                        refetch={refetch}
                                        updateNote={updateNote}
                                        setUpdateNote={setUpdateNote}
                                        tempUpdateNote={tempUpdateNote}
                                        setTempUpdateNote={setTempUpdateNote}

                                    />
                                )
                            }
                        </div>
                    </div>
                }
                {
                    pinnedNotes?.length > 5 &&
                    <PinnedPagination
                        totalPinnedNotes={pinnedNotes?.length}
                        notesPinnedPerPage={notesPinnedPerPage}
                        currentPinnedPage={currentPinnedPage}
                        paginatePinned={paginatePinned}
                    />
                }
                {
                    unPinnedNotes?.length === 0 ||
                    <div className='p-4'>
                        <h4 className='text-md md:text-lg text-gray-600 font-medium py-2'>Notes</h4>
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
                            {
                                activeNotes?.map(note =>
                                    <NoteCard
                                        key={note._id}
                                        note={note}
                                        refetch={refetch}
                                        updateNote={updateNote}
                                        setUpdateNote={setUpdateNote}
                                        tempUpdateNote={tempUpdateNote}
                                        setTempUpdateNote={setTempUpdateNote}
                                    />
                                )
                            }
                        </div>
                    </div>
                }
                {
                    unPinnedNotes?.length > 5 &&
                    <Pagination
                        totalNotes={unPinnedNotes?.length}
                        notesPerPage={notesPerPage}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                }
            </div>
        </div>
    );
};

export default NoteCards;