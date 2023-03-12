import React from 'react';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';

const ConfirmDeleteModal = ({ refetch, deleteNote, setDeleteNote }) => {

    const queryClient = useQueryClient();
    const { mutate } = useMutation(
        (id) => fetch(`https://todo-server-ze08.onrender.com/note/${deleteNote._id}`, {
            method: 'DELETE'
        }),
        {
            onSuccess: (data) => {
                // Invalidate and refetch the notes query to update the UI
                queryClient.invalidateQueries('notes');
                refetch();
                toast.success('Note Deleted Permanently')
            },
            onError: (error) => {
                console.error(error);
            }
        }
    );

    const handleDeleteNote = (id) => {
        mutate(id);
    }

    return (
        <>
            <input type="checkbox" id="confirm-delete-modal" className="modal-toggle" />
            <div className="modal backdrop-blur-md">
                <div className="modal-box relative rounded-md">
                    <label htmlFor="confirm-delete-modal" className="btn btn-sm btn-circle border-0 hover:bg-success absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold pr-4">Are you sure you want to delete: <span className='text-red-400'>"{deleteNote?.title}"</span> </h3>
                    <div className="modal-action mt-4">
                        <label
                            htmlFor="confirm-delete-modal"
                            className='btn btn-sm btn-error rounded-md text-white'
                            onClick={handleDeleteNote}
                        >Delete</label>
                        <label
                            htmlFor="confirm-delete-modal"
                            className="btn btn-sm rounded-md text-white"
                            onClick={(e) => {
                                setDeleteNote('')
                            }}
                        >Cancel</label>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmDeleteModal;