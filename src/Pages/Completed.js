import React, { useContext } from 'react';
import Loading from '../components/Loading';
import NoteContext from '../context/NoteContext';
import NoteCard from './Notes/NoteCard';

const Completed = () => {

    const { completeNotes, isLoading, refetch } = useContext(NoteContext);

    if (isLoading) {
        return (<Loading />)
    }

    return (
        <div>
            <h4 className='text-center text-md md:text-lg text-gray-600 dark:text-gray-300 font-medium p-4'>Completed</h4>
        </div>
    );
};

export default Completed;