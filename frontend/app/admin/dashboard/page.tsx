'use client'
import { AdminMetricCard, MetricCard } from '@/components/Components'
import { Button } from '@/components/ui/button'
import ChallengeCard from '@/components/ChallengeCard';
import { Bell, ChevronRight, Eye, FileText, Users } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Challenge } from '@/app/types/challenge';
import { getAdminStats, getByCreatorId, getChallenges } from '@/app/actions/challenges';
import ChallengeCardSkeleton from '@/components/skeletons/ChallengeCardSkeleton';
import { adminStats } from '@/app/types/stats';
import { AdminMetricCardSkeleton } from '@/components/skeletons/AdminMetricCardSkeleton';

function page() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [stats, setStats] = useState<adminStats>({
        total: 0,
        open: 0,
        ongoing: 0,
        completed: 0,
        participants: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const challengeData = await getByCreatorId(3, localStorage.getItem('_id'), localStorage.getItem('authToken'));
                const adminStats = await getAdminStats(localStorage.getItem('_id'), localStorage.getItem('authToken'));

                console.log("Stats:", adminStats);
                console.log("Challenge data:", challengeData);

                setStats(adminStats);
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
        <div className='flex flex-col gap-10 py-6 px-4 sm:px-8'>
            <div className='w-full flex flex-col sm:flex-row space-y-6 sm:space-y-0 justify-between items-center'>
                <div>
                    <h2 className='text-2xl text-center sm:text-start font-bold'>Welcome back {localStorage.getItem('name')},</h2>
                    <p className='text-gray-600 text-sm text-center sm:text-start'>Build Work Experience through Skills Challenges</p>
                </div>
                <Button className="bg-primary text-xs text-white">
                    <Eye className='text-white h-5 w-5' /> View Profile
                </Button>
            </div>
            <div className='w-full grid grid-cols-6 gap-6'>
                {isLoading ? (
                    <>
                        <AdminMetricCardSkeleton className='col-span-6 sm:col-span-3' />
                        <AdminMetricCardSkeleton className='col-span-6 sm:col-span-3' />
                        <AdminMetricCardSkeleton className='col-span-6 sm:col-span-3 lg:col-span-2' />
                        <AdminMetricCardSkeleton className='col-span-6 sm:col-span-3 lg:col-span-2' />
                        <AdminMetricCardSkeleton className='col-span-6 sm:col-span-6 lg:col-span-2' />
                    </>
                ) : (
                    <>
                        <AdminMetricCard className='col-span-6 sm:col-span-3' title="Total Challenges" amount={stats.total} rate={15} defaultTime='This Week' icon={FileText} />
                        <AdminMetricCard className='col-span-6 sm:col-span-3' title="Total Participants" amount={stats.participants} rate={15} defaultTime='This Week' icon={Users} />
                        <AdminMetricCard className='col-span-6 sm:col-span-3 lg:col-span-2' title="Completed Challenges" amount={stats.completed} rate={15} defaultTime='Last 30 Days' icon={FileText} />
                        <AdminMetricCard className='col-span-6 sm:col-span-3 lg:col-span-2' title="Open Challenges" amount={stats.open} rate={15} defaultTime='Last 30 Days' icon={FileText} />
                        <AdminMetricCard className='col-span-6 sm:col-span-6 lg:col-span-2' title="Ongoing Challenges" amount={stats.ongoing} rate={15} defaultTime='Last 30 Days' icon={FileText} />
                    </>
                )}
            </div>
            <div>
                <div className='w-full flex justify-between items-center text-sm mb-4'>
                    <p className='font-bold'>Recent Challenges</p>
                    <Link href="/admin/challenges" className='flex items-center text-primary'>
                        See all <ChevronRight className='h-6 w-6' />
                    </Link>
                </div>
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-4">
                        {[...Array(3)].map((_, index) => (
                            <ChallengeCardSkeleton key={index} />
                        ))}
                    </div>
                ) : challenges.length !== 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center gap-6 mt-4">
                        {challenges.slice(0, 3).map((challenge) => (
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