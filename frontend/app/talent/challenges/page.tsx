'use client';
import { FilterTab } from '@/components/Components'
import ChallengeCard from '@/components/ChallengeCard';
import React, { useEffect, useState } from 'react'
import { Challenge } from '@/app/types/challenge';
import { getChallenges } from '@/app/actions/challenges';
import ChallengeCardSkeleton from '@/components/skeletons/ChallengeCardSkeleton';

function page() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const data = await getChallenges(6);
                setChallenges(data);
            } catch (error) {
                console.error("Failed to fetch challenges", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    return (
        <div className='flex flex-col gap-10 py-6 px-4 sm:px-8'>
            <div>
                <h2 className='text-2xl font-bold'>Challenges,</h2>
                <p className='text-gray-600 text-sm'>Join a challenge or a hackathon to gain valuable work experience.</p>
            </div>
            <div>
                <div className='flex flex-wrap items-center gap-4 pb-4 border-b border-gray-200'>
                    <FilterTab tab="all" label="All Challenges" count={10} />
                    <FilterTab tab="completed" label="Completed Challenges" count={10} />
                    <FilterTab tab="open" label="Open Challenges" count={10} />
                    <FilterTab tab="ongoing" label="Ongoing Challenges" count={10} />
                </div>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-4">
                        {[...Array(6)].map((_, index) => (
                            <ChallengeCardSkeleton key={index} />
                        ))}
                    </div>
                ) : challenges.length !== 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-4">
                        {challenges.map((challenge) => (
                            <ChallengeCard key={challenge._id} challenge={challenge} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-10 text-center text-sm text-gray-600">
                        No challenges were found!
                    </p>
                )}
            </div>
        </div>
    )
}

export default page