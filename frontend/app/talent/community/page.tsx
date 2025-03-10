'use client';
import React, { useEffect, useState } from 'react';
import Modal from '../_components/Modal';
import { FilterTab } from '@/components/Components';
import challengeData from "@/data/challengeData.json";
import ChallengeCard from '@/components/ChallengeCard';
import { getChallenges, getChallengeStats } from '@/app/actions/challenges';
import { Challenge } from '@/app/types/challenge';
import ChallengeCardSkeleton from '@/components/skeletons/ChallengeCardSkeleton';
import { challengeStats } from '@/app/types/stats';
import { FilterTabSkeleton } from '@/components/skeletons/FilterTabSkeleton';

const Page = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [stats, setStats] = useState<challengeStats>({
    total: 0,
    open: 0,
    ongoing: 0,
    completed: 0,
  });

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const challengeData = await getChallenges(6);
        const challengeStats: challengeStats = await getChallengeStats();

        setStats(challengeStats);
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
    setShowModal(true); // Show the modal when navigating to /community
  }, []);

  if (challenges) {
    return (
      <div>
        {/* If showModal is true, render the Modal */}
        {showModal && <Modal onClose={() => setShowModal(false)} />}
        <div className='flex flex-col gap-10 py-6 px-4 sm:px-8'>
          <div>
            <h2 className='text-2xl font-bold'>Challenges,</h2>
            <p className='text-gray-600 text-sm'>Join a challenge or a hackathon to gain valuable work experience.</p>
          </div>
          <div>
            <div className='flex flex-wrap items-center gap-4 pb-4 border-b border-gray-200'>
                                {isLoading ? (
                                    <>
                                    <FilterTabSkeleton />
                                    <FilterTabSkeleton />
                                    <FilterTabSkeleton />
                                    <FilterTabSkeleton />
                                    </>
                                ) : (
                                    <>
                                    <FilterTab tab="all" label="All Challenges" count={stats.total} />
                                    <FilterTab tab="completed" label="Completed Challenges" count={stats.completed} />
                                    <FilterTab tab="open" label="Open Challenges" count={stats.open} />
                                    <FilterTab tab="ongoing" label="Ongoing Challenges" count={stats.ongoing} />
                                    </>
                                )}
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
      </div>
    );
  }
};

export default Page;
