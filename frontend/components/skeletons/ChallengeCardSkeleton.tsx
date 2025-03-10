import React from 'react'

function ChallengeCardSkeleton() {
  return (
    <div className="border rounded-md w-fit h-fit">
      <div className="p-3">
        {/* Image placeholder */}
        <div className="h-40 w-[270px] bg-gray-200 animate-pulse rounded-md" />

        {/* Title placeholder */}
        <div className="h-5 w-[220px] bg-gray-200 animate-pulse rounded-md my-6" />

        {/* Skills section */}
        <div className="h-4 w-[100px] bg-gray-200 animate-pulse rounded-md mb-1" />
        <div className="flex flex-wrap mt-1 gap-2 max-w-[270px]">
          <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full" />
          <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full" />
          <div className="h-6 w-14 bg-gray-200 animate-pulse rounded-full" />
          <div className="h-6 w-18 bg-gray-200 animate-pulse rounded-full" />
        </div>

        {/* Seniority level */}
        <div className="flex items-center mt-2 gap-1">
          <div className="h-4 w-[100px] bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-[80px] bg-gray-200 animate-pulse rounded-md" />
        </div>

        {/* Timeline */}
        <div className="flex items-center mt-2 gap-1">
          <div className="h-4 w-[60px] bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-[100px] bg-gray-200 animate-pulse rounded-md" />
        </div>
      </div>

      {/* Button section */}
      <div className="border-t p-3">
        <div className="h-9 w-[135px] bg-gray-200 animate-pulse rounded-md" />
      </div>
    </div>
  )
}

export default ChallengeCardSkeleton