import { MoveLeft } from 'lucide-react'
import React from 'react'
import ChallengeCard from '../../../components/ChallengeCard';
import { GoBackButton } from '@/components/Components';
import Link from 'next/link';
import { getChallenges } from '@/app/actions/challenges';
import { Challenge } from '@/app/types/challenge';

async function page() {

    const challenges: Challenge[] = await getChallenges(12);

    return (
        <div className='bg-[#F9FAFB] pt-28 pb-16 px-5 sm:px-14'>
            <div className='flex items-center gap-2'>
                <GoBackButton />
                <Link href="/challenges" className='text-primary '>/ Challenges & Hackathons</Link>
            </div>
            {challenges.length !== 0 ? (
                <div className="grid grid-cols-3 gap-6 mt-4">
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