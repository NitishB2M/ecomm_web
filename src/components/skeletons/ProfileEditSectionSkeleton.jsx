const ProfileEditSectionSkeleton = () => {
    return (
        <form className="space-y-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-2/5 mb-2"></div>

        <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
        </div>
        
        <div className="flex justify-end gap-4 mt-6">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-200 rounded w-28"></div>
        </div>
      </form>
    );
  };

  export default ProfileEditSectionSkeleton