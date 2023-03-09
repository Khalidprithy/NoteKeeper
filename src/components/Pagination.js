import React from 'react';

const Pagination = ({ notesPerPage, totalNotes, paginate, currentPage }) => {

    const pageNum = [];

    for (let i = 1; i <= Math.ceil(totalNotes / notesPerPage); i++) {
        pageNum.push(i);
    }


    return (
        <div className='flex justify-center my-5'>
            <div className="btn-group">
                {
                    pageNum?.map(page =>
                        <button
                            onClick={() => {
                                paginate(page)
                            }}
                            key={page} className={`btn btn-sm ${currentPage === page && 'btn-success'} `}>{page}</button>
                    )
                }
            </div>
        </div>
    );
};

export default Pagination;