import React, { useContext } from 'react';
import NoteContext from '../context/NoteContext';

const ConfirmEmptyTrashModal = () => {

    const { handleEmptyTrash } = useContext(NoteContext);

    return (
        <>
            <input type="checkbox" id="empty-trash-modal" className="modal-toggle" />
            <div className="modal backdrop-blur-md">
                <div className="modal-box relative">
                    <label htmlFor="empty-trash-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Are you sure you want to delete all deleted data?</h3>
                    <p className='text-gray-500 font-medium'>This action cannot be undone and you will lose all your deleted notes data.</p>
                    <div className="modal-action mt-4">
                        <label
                            htmlFor="empty-trash-modal"
                            className='btn btn-sm btn-error rounded-md text-white'
                            onClick={handleEmptyTrash}
                        >Confirm</label>
                        <label
                            htmlFor="empty-trash-modal"
                            className="btn btn-sm rounded-md text-white"
                        >Cancel</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmEmptyTrashModal;