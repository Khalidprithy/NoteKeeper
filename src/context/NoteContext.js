import { useEffect, useState } from "react";
import { createContext } from "react";
import { useQuery } from "react-query";

const NoteContext = createContext();

export default NoteContext;

export const NoteProvider = ({ children }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentPinnedPage, setCurrentPinnedPage] = useState(1);
    const [notesPerPage] = useState(6);
    const [notesPinnedPerPage] = useState(6);

    // Get all notes data
    const { data: notesData, refetch, isLoading } = useQuery('notesData', () => fetch(`http://localhost:5000/notes`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }
    }).then(res => res.json()));

    // Delete all deleted notes
    async function handleEmptyTrash() {
        try {
            const response = await fetch('http://localhost:5000/empty_trash', { method: 'DELETE' });
            const data = await response.json();
            console.log(data)
            refetch();
        } catch (err) {
            console.error(err);
        }
    }

    // Delete all deleted notes
    async function handleDeleteAll() {
        try {
            const response = await fetch('http://localhost:5000/delete_all', { method: 'DELETE' });
            const data = await response.json();
            console.log(data)
            refetch();
        } catch (err) {
            console.error(err);
        }
    }

    const sortedNote = notesData?.sort((a, b) => {
        if (a.isCompleted && !b.isCompleted) {
            return 1;
        } else if (!a.isCompleted && b.isCompleted) {
            return -1;
        } else {
            return 0;
        }
    });


    // Notes Filter
    const notes = sortedNote?.filter((note) => note.isDeleted === false);
    const pinnedNotes = notes?.filter((note) => note.isPinned === true);
    const unPinnedNotes = notes?.filter((note) => note.isPinned === false);
    const deleteNotes = notesData?.filter((note) => note.isDeleted === true);
    const completeNotes = notesData?.filter((note) => note.isCompleted === true);

    // Pagination
    const lastNote = currentPage * notesPerPage;
    const firstNote = lastNote - notesPerPage;

    const lastPinnedNote = currentPinnedPage * notesPinnedPerPage;
    const firstPinnedNote = lastPinnedNote - notesPinnedPerPage;

    const activeNotes = unPinnedNotes?.slice(firstNote, lastNote);
    const activePinnedNotes = pinnedNotes?.slice(firstPinnedNote, lastPinnedNote);

    // Select page when page count reduce unpinned
    useEffect(() => {
        const notesToShow = Math.ceil(unPinnedNotes?.length / 6);
        console.log('After math.ceil', notesToShow);
        if (unPinnedNotes?.length % 6 === 0) {
            setCurrentPage(notesToShow)
        }
    }, [unPinnedNotes?.length])

    const paginate = (noteNumber) => {
        setCurrentPage(noteNumber)
    };

    // Select page when page count reduce pinned
    useEffect(() => {
        const notesToShow = Math.ceil(pinnedNotes?.length / 6);
        console.log('After math.ceil', notesToShow);
        if (pinnedNotes?.length % 6 === 0) {
            setCurrentPinnedPage(notesToShow)
        }
    }, [pinnedNotes?.length])


    const paginatePinned = (notePinned) => {
        setCurrentPinnedPage(notePinned)
    };


    // Sending all data 
    let contextData = {

        // Pagination
        paginate: paginate,
        paginatePinned: paginatePinned,

        lastNote: lastNote,
        firstNote: firstNote,

        currentPage: currentPage,
        currentPinnedPage: currentPinnedPage,

        notesPerPage: notesPerPage,
        notesPinnedPerPage: notesPinnedPerPage,

        setCurrentPage: setCurrentPage,

        // Fetched and filtered notes
        notes: notes,
        refetch: refetch,
        isLoading: isLoading,
        pinnedNotes: pinnedNotes,
        activeNotes: activeNotes,
        deleteNotes: deleteNotes,
        completeNotes: completeNotes,
        unPinnedNotes: unPinnedNotes,
        activePinnedNotes: activePinnedNotes,

        // Delete all deleted notes
        handleEmptyTrash: handleEmptyTrash,
        handleDeleteAll: handleDeleteAll
    }

    return (
        <NoteContext.Provider value={contextData}>
            {children}
        </NoteContext.Provider >
    )
}

// Developed by Khalid
// Git: github.com/Khalidprithy