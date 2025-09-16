const ProfileSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-12">
          <div className="px-4 py-3 bg-opacity-90 backdrop-blur-sm flex flex-row items-center">
            <div className="w-48 h-48 mr-4 bg-gray-200 rounded-full">
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
              <div className="mt-2 flex gap-2 h-4 bg-gray-200 rounded w-40"></div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="p-4 bg-white bg-opacity-90 backdrop-blur-sm">
            <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;