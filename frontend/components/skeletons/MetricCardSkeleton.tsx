export const MetricCardSkeleton = () => {
    return (
      <div className="bg-white flex justify-between items-center w-full border border-gray-200 rounded-md py-6 px-3 animate-pulse">
        {/* Left Section */}
        <div className="flex text-sm gap-2">
          <div className="w-1 bg-primary rounded-lg"></div>
          <div>
            <p className="h-4 bg-gray-200 rounded-full w-32 mb-2"></p>
            <p className="h-6 bg-gray-200 rounded-full w-24"></p>
          </div>
        </div>
  
        {/* Right Section - Icon */}
        <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-2">
          <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  };
  