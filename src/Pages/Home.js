import React, { useState } from 'react';
import { useQuery } from 'react-query';
import AddNoteModal from '../components/AddNoteModal';
import AddedNotes from './Notes/AddedNotes';
import PinnedNotes from './Notes/PinnedNotes';
import Pagination from '../components/Pagination';
import IsLoading from '../components/IsLoading';
import PinnedPagination from '../components/PinnedPagination';

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentPinnedPage, setCurrentPinnedPage] = useState(1);
    const [notesPerPage] = useState(6);
    const [notesPinnedPerPage] = useState(6);

    const { data: notesData, refetch, isLoading } = useQuery('notesData', () => fetch(`http://localhost:5000/notes`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()));

    const notes = notesData?.filter((note) => note.isDeleted === false);


    const pinnedNotes = notes?.filter((note) => note.isPinned === true);
    const unPinnedNotes = notes?.filter((note) => note.isPinned === false);

    const lastNote = currentPage * notesPerPage;
    const firstNote = lastNote - notesPerPage;

    const lastPinnedNote = currentPinnedPage * notesPinnedPerPage;
    const firstPinnedNote = lastPinnedNote - notesPinnedPerPage;

    const activeNotes = unPinnedNotes?.slice(firstNote, lastNote);
    const activePinnedNotes = pinnedNotes?.slice(firstPinnedNote, lastPinnedNote);


    const paginate = (noteNumber) => {
        setCurrentPage(noteNumber)
    };

    const paginatePinned = (notePinned) => {
        setCurrentPinnedPage(notePinned)
    };

    if (isLoading) {
        return <IsLoading />
    }

    return (
        <div>
            <div className='flex justify-center items-center p-4'>

                {/* The button to open modal */}
                <label htmlFor="add-task-modal" className="w-8/12 md:w-6/12 lg:w-4/12 border-2 text-gray-800 hover:text-gray-50 font-medium border-gray-300 hover:bg-gray-700 rounded-lg p-2 cursor-pointer flex items-center justify-center gap-2 transition-all ease-in duration-300 z-10">Add a new Note </label>
                {/* Put this part before </body> tag */}
                <AddNoteModal
                    refetch={refetch}
                />
            </div>
            <div>
                {
                    pinnedNotes?.length === 0 ||
                    <PinnedNotes
                        pinnedNotes={activePinnedNotes}
                        refetch={refetch}
                    />
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
                    <AddedNotes
                        unPinnedNotes={activeNotes}
                        refetch={refetch}
                    />
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

export default Home;