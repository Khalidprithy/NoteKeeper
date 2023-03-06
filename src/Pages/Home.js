import React, { useContext } from 'react';
import AddNoteModal from '../components/AddNoteModal';

import IsLoading from '../components/IsLoading';

import NoteContext from '../context/NoteContext';
import NoteCards from './Notes/NoteCards';

const Home = () => {

    const { refetch, isLoading } = useContext(NoteContext);


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
            <NoteCards />
        </div>
    );
};

export default Home;