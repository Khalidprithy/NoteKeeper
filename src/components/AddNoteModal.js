import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { GoPin } from 'react-icons/go';
import { useMutation } from 'react-query';
import IsLoading from './IsLoading';

const AddNoteModal = ({ refetch }) => {

    const [isPinned, setIsPinned] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [postData, setPostData] = useState({
        message: '',
        timestamp: new Date().toISOString() // include current date and time
    });

    const { register, reset, formState: { errors }, handleSubmit } = useForm({
        mode: 'onTouched'
    });

    const { mutate, isLoading } = useMutation(
        (noteData) => fetch('http://localhost:5000/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(noteData)
        }),
        {
            onSuccess: () => {
                toast.success('New Note Added');
                setIsPinned(false)
                refetch();
            },
            onError: (error) => {
                toast.error(`Failed to add note ${error.message}`)
            }
        }
    );

    const onSubmit = async (data, e) => {
        e.preventDefault();
        const noteData = {
            title: data.title,
            noteBody: data.noteBody,
            tagline: data.tagline,
            date: postData,
            isPinned: isPinned,
            isCompleted: isCompleted,
            isDeleted: isDeleted,
        };
        console.log(noteData)

        mutate(noteData);
        reset();
    }

    if (isLoading) {
        return <IsLoading />
    }

    return (
        <div className=''>
            <input type="checkbox" id="add-task-modal" className="modal-toggle" />
            <div className="modal backdrop-blur-sm inset-0 z-[99]">
                <div className="modal-box relative ">
                    <label htmlFor="add-task-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <button
                        onClick={() => setIsPinned(!isPinned)}
                        className={`absolute left-2 top-2 rounded-full ${isPinned ? 'text-gray-800' : 'text-gray-400'} hover:bg-gray-200 p-1`}><GoPin className='text-2xl -rotate-45' /></button>
                    <div className='mt-5'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control w-full">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    className="input w-full"
                                    {...register("title", {
                                        required: {
                                            value: true,
                                            message: 'Please enter your title'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.title && <span className="label-text text-base font-normal text-red-700">{errors.title.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full">
                                <input
                                    type="text"
                                    placeholder="Write a note"
                                    className="input w-full"
                                    {...register("noteBody", {
                                        required: {
                                            value: true,
                                            message: 'Please enter your Note'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.noteBody && <span className="label-text text-base font-normal text-red-700">{errors.noteBody.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full">
                                <input
                                    type="text"
                                    placeholder="Add tagline"
                                    className="input w-full mb-4"
                                    {...register("tagline")}
                                />
                            </div>

                            <input

                                className="btn btn-outline w-full" type="submit" value='Add' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddNoteModal;