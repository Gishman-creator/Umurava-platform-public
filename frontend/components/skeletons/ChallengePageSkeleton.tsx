import { BriefcaseBusiness, CalendarDays, DollarSign, Mail } from 'lucide-react'
import React from 'react'
import { GoBackButton } from '../Components'
import Link from 'next/link'

function ChallengePageSkeleton() {
    return (
        <div>
            {/* Breadcrumb navigation skeleton */}
            <div className="bg-white flex flex-wrap text-sm items-center gap-2 px-4 sm:px-8 py-3 border-y border-gray-200">
                <GoBackButton />
                <Link className="text-gray-600 hover:underline" href="/talent/challenges">
                    Challenges & Hackathons /
                </Link>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="flex flex-col xl:flex-row justify-between space-y-8 xl:space-y-0 items-start py-6 px-4 sm:px-8">
                {/* Left column - Challenge details */}
                <div className="bg-white p-4 pb-6 border border-gray-200 rounded-lg w-full lg:w-[35rem]">
                    {/* Image placeholder */}
                    <div className="h-72 w-full rounded-lg bg-gray-200 animate-pulse"></div>

                    {/* Title and description */}
                    <div className="mt-6 h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="mt-2 space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Tasks section */}
                    <div className="mt-6 h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
                    <div className="mt-2 h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                    <div className="mt-2 space-y-2 pl-4">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Design section */}
                    <div className="mt-6 h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="mt-2 space-y-2 pl-4">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Deliverables section */}
                    <div className="mt-6 h-6 w-36 bg-gray-200 rounded animate-pulse"></div>
                    <div className="mt-2 space-y-2 pl-4">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Notes section */}
                    <div className="mt-6 h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="mt-2 space-y-2 pl-4">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>

                {/* Right column - Sidebar */}
                <div className="bg-white px-6 py-4 border border-gray-200 rounded-lg w-80">
                    <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                    <div className="mt-2 space-y-1">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Contact info */}
                    <div className="flex items-center gap-2 mt-6">
                        <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-3">
                            <Mail className="text-primary h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="flex items-center gap-2 mt-4">
                        <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-3">
                            <BriefcaseBusiness className="text-primary h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-3 w-36 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 mt-4">
                        <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-3">
                            <CalendarDays className="text-primary h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Prize */}
                    <div className="flex items-center gap-2 mt-4">
                        <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-3">
                            <DollarSign className="text-primary h-4 w-4" />
                        </div>
                        <div className="space-y-1">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>

                    {/* Button */}
                    <div className="h-9 w-full bg-gray-200 rounded mt-6 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

export default ChallengePageSkeleton