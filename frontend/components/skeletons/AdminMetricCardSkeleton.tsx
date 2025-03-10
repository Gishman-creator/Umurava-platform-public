export const AdminMetricCardSkeleton = ({ className }: { className?: string }) => {
    return (
        <div className={`bg-white w-full border border-gray-200 rounded-md pt-2 pb-6 px-4 animate-pulse ${className}`}>
            {/* Dropdown Skeleton */}
            <div className="flex text-xs items-center ml-auto bg-gray-200 h-4 w-24 rounded"></div>

            <div className="flex items-center text-xs gap-4 mt-2">
                {/* Right Section - Icon Skeleton */}
                <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-2">
                    <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                </div>

                {/* Left Section Skeleton */}
                <div className="flex flex-col gap-1.5">
                    <p className="h-4 bg-gray-200 w-32 rounded-full"></p>
                    <div className="flex items-center gap-2">
                        <p className="h-4 bg-gray-200 w-16 rounded-full"></p>
                        <p className="bg-gray-200 h-6 w-12 rounded-full"></p>
                    </div>
                </div>
            </div>
        </div>
    );
};  