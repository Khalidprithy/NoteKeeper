import React from 'react';

const Loading = () => {
    return (
        <div class="flex items-center justify-center p-4">
            <div class="relative">
                {/* <!-- Outer Ring--> */}
                <div class="w-12 h-12 rounded-full absolute
        border-4 border-dashed border-gray-200"></div>

                {/* <!-- Inner Ring --> */}
                <div class="w-12 h-12 rounded-full animate-spin absolute
        border-4 border-dashed border-green-500 border-t-transparent"></div>
            </div>
        </div>
    );
};

export default Loading;
