import React, { useContext } from 'react';
import AddNoteModal from '../components/AddNoteModal';
import IsLoading from '../components/Loading';
import NoteContext from '../context/NoteContext';
import NoteCards from './Notes/NoteCards';

const Home = () => {

    const { refetch, isLoading } = useContext(NoteContext);

    if (isLoading) {
        return <IsLoading />
    }

    return (
        <>
            <div className='flex justify-center items-center p-4'>
                <label htmlFor="add-task-modal" className="w-8/12 md:w-6/12 lg:w-4/12 text-gray-900 hover:text-white border border-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2 mb-2 dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all ease-in duration-300 z-10">Add a new Note </label>
                <AddNoteModal
                    refetch={refetch}
                />
            </div>
            <NoteCards />
        </>
    );
};

export default Home;