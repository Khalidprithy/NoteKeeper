import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";

const NoteContext = createContext();

export default NoteContext;

export const NoteProvider = ({ children }) => {

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

        // Fetch notes
        notes: notes,
        refetch: refetch,
        isLoading: isLoading,
        pinnedNotes: pinnedNotes,
        activeNotes: activeNotes,
        unPinnedNotes: unPinnedNotes,
        activePinnedNotes: activePinnedNotes,
    }

    return (
        <NoteContext.Provider value={contextData}>
            {children}
        </NoteContext.Provider >
    )
}


// Developed by Khalid
// Git: github.com/Khalidprithy