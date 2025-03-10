export const FilterTabSkeleton = () => {
    return (
      <button
        className="w-fit flex items-center gap-2 text-xs border rounded-md p-2 animate-pulse bg-gray-100 border-gray-200"
      >
        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
        <p className="h-4 bg-gray-200 rounded-full w-24"></p>
        <p className="h-4 bg-gray-200 rounded-full w-8"></p>
      </button>
    );
  };
  