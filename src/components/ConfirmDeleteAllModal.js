import React, { useContext } from 'react';
import NoteContext from '../context/NoteContext';

const ConfirmDeleteAllModal = () => {

    const { handleDeleteAll } = useContext(NoteContext);

    return (
        <>
            <input type="checkbox" id="delete-all-modal" className="modal-toggle" />
            <div className="modal backdrop-blur-md">
                <div className="modal-box relative rounded-md">
                    <label htmlFor="delete-all-modal" className="btn btn-sm btn-circle border-0 hover:bg-success absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold pr-4">Are you sure you want to wipe out all notes data?</h3>
                    <p className='text-gray-500 font-medium'>This action cannot be undone and you will lose all your notes.</p>
                    <div className="modal-action mt-4">
                        <label
                            htmlFor="delete-all-modal"
                            className='btn btn-sm btn-error rounded-md text-white'
                            onClick={handleDeleteAll}
                        >Confirm</label>
                        <label
                            htmlFor="delete-all-modal"
                            className="btn btn-sm rounded-md text-white"
                        >Cancel</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmDeleteAllModal;