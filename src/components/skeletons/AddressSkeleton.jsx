const AddressListSkeleton = () => {
    return (
        <div className="bg-gray-200 animate-pulse hover:shadow-md transition-shadow border-l-4 m-4 mb-2 py-2 rounded-tl rounded-bl">
            <div className="flex items-center justify-between py-4 pr-4 ml-4">
                <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                <div className="border border-gray-300 text-gray-300 px-2 py-1 rounded text-sm">
                <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                </div>
            </div>
            <div className="h-0.5 bg-gray-300 rounded w-full"></div>
            <div className="p-4 flex items-center justify-between pb-4 w-full">
                <div className="flex flex-col w-1/3">
                <div className="flex items-center gap-4 justify-between mb-2">
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="flex items-center gap-4 justify-between mb-2">
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="flex items-center gap-4 justify-between mb-2">
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
                <div className="flex items-center gap-4 justify-between mb-2">
                    <div className="h-8 bg-gray-300 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                </div>
                </div>
                <div className="flex items-center gap-4 justify-between mb-2">
                <div className="h-5 bg-gray-300 rounded w-1/4"></div>
                </div>
            </div>
        </div>
    );  
};

export {AddressListSkeleton}