import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import AddNoteModal from '../components/AddNoteModal';
import AddedNotes from './Notes/AddedNotes';
import PinnedNotes from './Notes/PinnedNotes';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';

const Home = () => {

    const [prev, setPrev] = useState(0)
    const [next, setNext] = useState(6)
    const [prevPinned, setPrevPinned] = useState(0)
    const [nextPinned, setNextPinned] = useState(6)

    const { data: notesData, refetch, } = useQuery('notesData', () => fetch(`http://localhost:5000/notes`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()));

    const pinnedNotes = notesData?.filter((note) => note.isPinned === true);
    const unPinnedNotes = notesData?.filter((note) => note.isPinned === false);

    const totalNotes = unPinnedNotes?.length;
    const totalPinnedNotes = pinnedNotes?.length;

    const handlePrev = () => {
        if (prev <= 3 || prev > totalNotes) {
            setPrev(0);
            return;
        }
        else {
            setPrev(prev - 6)
        }
        if (next <= 6) {
            setNext(6);
            return;
        } else {
            setNext(next - 6)
        }
        refetch();
    }

    const handleNext = () => {
        if (next >= totalNotes) {
            setNext(totalNotes);
            return;
        } else {
            setNext(next + 6)
        }
        if (prev >= totalNotes - 6) {
            return;
        } else {
            setPrev(prev + 6)
        }
        refetch();
    }


    const handlePinnedPrev = () => {
        if (prevPinned <= 3 || prevPinned > totalPinnedNotes) {
            setPrevPinned(0);
            return;
        }
        else {
            setPrevPinned(prevPinned - 6)
        }
        if (nextPinned <= 6) {
            setNextPinned(6);
            return;
        } else {
            setNextPinned(nextPinned - 6)
        }
        refetch();
    }

    const handlePinnedNext = () => {
        if (nextPinned >= totalPinnedNotes) {
            setNextPinned(totalPinnedNotes);
            return;
        } else {
            setNextPinned(nextPinned + 6)
        }
        if (prevPinned >= totalPinnedNotes - 6) {
            return;
        } else {
            setPrevPinned(prevPinned + 6)
        }
        refetch();
    }

    const dataToShow = unPinnedNotes?.slice(prev, next);
    const dataToShowPinned = pinnedNotes?.slice(prevPinned, nextPinned);

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
                    (pinnedNotes?.length !== 0) && <PinnedNotes
                        dataToShowPinned={dataToShowPinned}
                        refetch={refetch}
                    />
                }

                {
                    totalPinnedNotes >= 7 &&
                    <div className='grid grid-cols-6 items-center text-center'>
                        <button
                            disabled={prevPinned <= 1}
                            onClick={handlePinnedPrev}
                            className='btn btn-success btn-circle mx-auto'><GrFormPrevious className='text-4xl' /></button>
                        <p className='text-lg font-light'>0</p>
                        <p className='text-lg font-semibold'>{prevPinned + 1}</p>
                        <p className='text-lg font-semibold'>{nextPinned >= totalPinnedNotes ? totalPinnedNotes : nextPinned}</p>
                        <p className='text-lg font-light'>{totalPinnedNotes}</p>
                        <button
                            disabled={nextPinned >= totalPinnedNotes}
                            onClick={handlePinnedNext}
                            className='btn btn-success btn-circle mx-auto'><GrFormNext className='text-4xl' /></button>
                    </div>
                }

                {
                    (unPinnedNotes?.length !== 0) &&
                    <AddedNotes
                        dataToShow={dataToShow}
                        refetch={refetch}
                    />
                }

                {
                    totalNotes >= 7 &&
                    <div className='grid grid-cols-6 items-center text-center'>
                        <button
                            disabled={prev <= 1}
                            onClick={handlePrev}
                            className='btn btn-success btn-circle mx-auto'><GrFormPrevious className='text-4xl' /></button>
                        <p className='text-lg font-light'>0</p>
                        <p className='text-lg font-semibold'>{prev + 1}</p>
                        <p className='text-lg font-semibold'>{next >= totalNotes ? totalNotes : next}</p>
                        <p className='text-lg font-light'>{totalNotes}</p>
                        <button
                            disabled={next >= totalNotes}
                            onClick={handleNext}
                            className='btn btn-success btn-circle mx-auto'><GrFormNext className='text-4xl' /></button>
                    </div>
                }



            </div>
        </div>
    );
};

export default Home;