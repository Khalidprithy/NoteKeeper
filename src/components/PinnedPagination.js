import React from 'react';

const PinnedPagination = ({ pinnedNotesPerPage, totalPinnedNotes, paginatePinned, currentPagePinned }) => {

    const pageNum = [];

    for (let i = 1; i <= Math.ceil(totalPinnedNotes / pinnedNotesPerPage); i++) {
        pageNum.push(i);
    }

    return (
        <div className='flex justify-center mb-5'>
            <div className="btn-group">
                {
                    pageNum?.map(page =>
                        <button
                            onClick={() => paginatePinned(page)}
                            key={page} className={`btn btn-sm ${currentPagePinned === page && 'btn-success'} `}>{page}</button>
                    )
                }
            </div>
        </div>
    );
};

export default PinnedPagination;