import React, { useContext } from 'react';
import AddNoteModal from '../components/AddNoteModal';
import ConfirmDeleteAllModal from '../components/ConfirmDeleteAllModal';
import Loading from '../components/Loading';
import NoteContext from '../context/NoteContext';
import NoteCards from './Notes/NoteCards';

const Home = () => {

    const { refetch, isLoading } = useContext(NoteContext);

    if (isLoading) {
        return <Loading />
    };

    return (
        <div className='min-h-screen'>
            <div className='flex justify-between items-center p-4 '>
                <label htmlFor="add-task-modal" className="w-72 text-gray-900 hover:text-white border border-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:border-gray-400 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all ease-in duration-300 z-10">Add a new Note</label>
                <label
                    htmlFor="delete-all-modal"
                    className='btn btn-error rounded-md text-white'>Delete All</label>
                <AddNoteModal
                    refetch={refetch}
                />
                <ConfirmDeleteAllModal />
            </div>
            <NoteCards />
        </div>
    );
};

export default Home;