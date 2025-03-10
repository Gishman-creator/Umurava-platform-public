'use client'
import { FilterTab } from '@/components/Components'
import challengeData from "@/data/challengeData.json";
import ChallengeCard from '@/components/ChallengeCard';
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { getByCreatorId, getChallenges } from '@/app/actions/challenges';
import { Challenge } from '@/app/types/challenge';
import ChallengeCardSkeleton from '@/components/skeletons/ChallengeCardSkeleton';

function page() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeData = await getByCreatorId(6, localStorage.getItem('_id'), localStorage.getItem('authToken'));
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
    <div className='flex flex-col gap-10 py-6 px-8'>
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
          <Button type="submit" className="bg-primary text-xs text-white" asChild>
            <Link href={"/admin/challenges/new"}>
              <Plus />
              Create New Challenge
            </Link>
          </Button>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-4">
            {[...Array(6)].map((_, index) => (
              <ChallengeCardSkeleton key={index} />
            ))}
          </div>
        ) : challenges.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-4">
            {challenges.slice(0, 6).map((challenge) => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-gray-600">
            You have not created any challenges yet!
          </p>
        )}
      </div>
    </div>
  )
}

export default page