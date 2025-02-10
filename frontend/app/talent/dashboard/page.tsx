'use client'
import { MetricCard } from '@/components/Components'
import { Button } from '@/components/ui/button'
import challengeData from "@/data/challengeData.json";
import ChallengeCard from '@/components/ChallengeCard';
import { Bell, ChevronDown, ChevronRight, Eye, FileText } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Challenge } from '@/app/types/challenge';
import { getChallenges } from '@/app/actions/challenges';

function page() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
  
    useEffect(() => {
      const fetchChallenge = async () => {
        try {
          const challengeData = await getChallenges(3);
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
        }
      };
  
      fetchChallenge();
    }, []);

    return (
        <div className='flex flex-col gap-10 py-6 px-8'>
            <div className='w-full flex justify-between items-center'>
                <div>
                    <h2 className='text-2xl font-bold'>Welcome back {localStorage.getItem('name')},</h2>
                    <p className='text-gray-600 text-sm'>Build Work Experience through Skills Challenges</p>
                </div>
                <Button className="bg-primary text-xs text-white">
                    <Eye className='text-white h-5 w-5' /> View Profile
                </Button>
            </div>
            <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-center'>
                <MetricCard title="Completed Challenges" amount={5} />
                <MetricCard title="Open Challenges" amount={200} />
                <MetricCard title="Ongoing Challenges" amount={200} />
            </div>
            <div>
                <div className='w-full flex justify-between items-center text-sm mb-4'>
                    <p className='font-bold'>Recent Challenges</p>
                    <Link href="/talent/challenges" className='flex items-center text-primary'>
                        See all <ChevronRight className='h-6 w-6' />
                    </Link>
                </div>
                { challenges.length !==0 ? (
                <div className="grid grid-cols-3 gap-6 mt-4">
                    {challenges.slice(0, 3).map((challenge) => (
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