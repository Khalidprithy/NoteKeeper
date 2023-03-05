import React from 'react';

const PinnedPagination = ({ notesPinnedPerPage, totalPinnedNotes, paginatePinned, currentPinnedPage }) => {

    const pinnedPageNum = [];

    for (let i = 1; i <= Math.ceil(totalPinnedNotes / notesPinnedPerPage); i++) {
        pinnedPageNum.push(i);
    }

    return (
        <div className='flex justify-center my-5'>
            <div className="btn-group">
                {
                    pinnedPageNum?.map(pages =>
                        <button
                            onClick={() => paginatePinned(pages)}
                            key={pages} className={`btn btn-sm ${currentPinnedPage === pages && 'btn-success'} `}>{pages}</button>
                    )
                }
            </div>
        </div>
    );
};

export default PinnedPagination;