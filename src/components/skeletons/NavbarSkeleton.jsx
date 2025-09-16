const NavbarSkeleton = () => {
    return (
        <div className="flex container p-5 items-center justify-between py-4 animate-pulse">
        <div className="w-20 h-5 bg-gray-200 rounded"></div>
        <div className="flex items-center space-x-4">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="relative w-64 h-8 bg-gray-200 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
        </div>
        </div>
    )
};
export default NavbarSkeleton