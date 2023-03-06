import React, { useState } from 'react';

const EditNoteModal = ({ refetch, updateNote, tempUpdateNote, setTempUpdateNote }) => {

    const [changed, setChanged] = useState(false);
    console.log(updateNote)
    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="edit-note-modal" className="modal-toggle" />
            <div className="modal backdrop-blur-md">
                <div className="modal-box relative ">
                    <label htmlFor="edit-note-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                    <div>
                        <input
                            className='text-gray-800  border rounded-md px-4 py-1 focus:outline-red-500 w-full h-12 mt-5'
                            value={tempUpdateNote?.title}
                            onChange={(e) => {
                                setChanged(true)
                                setTempUpdateNote({
                                    ...tempUpdateNote,
                                    title: e.target.value,
                                })
                            }}
                            type="text" />
                        <textarea
                            className='text-gray-800  border rounded-md px-4 py-1 focus:outline-red-500 w-full h-12 mt-5'
                            value={tempUpdateNote?.noteBody}
                            onChange={(e) => {
                                setChanged(true)
                                setTempUpdateNote({
                                    ...tempUpdateNote,
                                    noteBody: e.target.value,
                                })
                            }}
                            type="text" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditNoteModal;