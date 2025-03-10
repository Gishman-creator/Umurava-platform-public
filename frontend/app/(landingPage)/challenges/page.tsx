'use client';
import React, { useEffect, useState } from 'react'
import ChallengeCard from '../../../components/ChallengeCard';
import { GoBackButton } from '@/components/Components';
import Link from 'next/link';
import { getChallenges } from '@/app/actions/challenges';
import { Challenge } from '@/app/types/challenge';
import ChallengeCardSkeleton from '@/components/skeletons/ChallengeCardSkeleton';

function page() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const challengeData = await getChallenges(12);
                console.log("Challenge data:", challengeData);

                if (challengeData && Object.keys(challengeData).length === 0) {
                    // If the fetched data is an empty object, treat it as a 404
                    setChallenges([]);
                } else {
                    setChallenges(challengeData);
                }
            } catch (error) {
                console.error("Error fetching challenge:", error);
                setChallenges([]); // In case of an error, treat it as a 404
            } finally {
                setIsLoading(false);
            }
        };

        fetchChallenge();
    }, []);

    return (
        <div className='bg-[#F9FAFB] pt-28 pb-16 px-5 sm:px-14'>
            <div className='flex items-center gap-2'>
                <GoBackButton />
                <Link href="/challenges" className='text-primary '>/ Challenges & Hackathons</Link>
            </div>
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-8">
                    {[...Array(12)].map((_, index) => (
                        <ChallengeCardSkeleton key={index} />
                    ))}
                </div>
            ) : challenges.length !== 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-8">
                    {challenges.slice(0, 12).map((challenge) => (
                        <ChallengeCard key={challenge._id} challenge={challenge} />
                    ))}
                </div>
            ) : (
                <p className="text-center py-40 text-sm text-gray-600">
                    No challenges were found!
                </p>
            )}
        </div>
    )
}

export default page