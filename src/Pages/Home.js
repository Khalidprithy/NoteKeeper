import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import AddNoteModal from '../components/AddNoteModal';
import AddedNotes from './Notes/AddedNotes';
import PinnedNotes from './Notes/PinnedNotes';
import Pagination from '../components/Pagination';

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [notesPerPage] = useState(6);

    const { data: notesData, refetch, isLoading } = useQuery('notesData', () => fetch(`http://localhost:5000/notes`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()));

    const pinnedNotes = notesData?.filter((note) => note.isPinned === true);
    const unPinnedNotes = notesData?.filter((note) => note.isPinned === false);

    const lastNote = currentPage * notesPerPage;
    const firstNote = lastNote - notesPerPage;
    const activeNotes = unPinnedNotes?.slice(firstNote, lastNote)

    const paginate = (noteNumber) => {
        setCurrentPage(noteNumber)
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
                <PinnedNotes
                    pinnedNotes={pinnedNotes}
                    refetch={refetch}
                />
                <AddedNotes
                    unPinnedNotes={activeNotes}
                    refetch={refetch}
                />
                {
                    unPinnedNotes?.length > 5 &&
                    <Pagination
                        notesPerPage={notesPerPage}
                        totalNotes={unPinnedNotes?.length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                }
            </div>
        </div>
    );
};

export default Home;