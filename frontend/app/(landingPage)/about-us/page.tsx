import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BriefcaseBusiness } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function page() {
    return (
        <div>
            <div className='flex flex-col md:flex-row items-center justify-between space-x-10 min-h-screen pt-20 pb-14 lg:py-0 px-5 sm:px-14 lg:px-28'>
                <div className="md:w-1/2">
                    <h2 className="font-bold text-3xl text-primary">
                        Our Story
                    </h2>
                    <p className="mt-4 text-gray-600">
                        With 3 years of experience matching African digital talents to local and
                        global job markets, we still remain with a big number of jobs that remain unfilled
                        due to the lack of experienced African Talents.
                    </p>
                    <p className="mt-4 text-gray-600">
                        Driven by our mission to place skilled and professional digital talent,
                        we created Skills Challenges as a project-based learning solution
                        for talents to gain real-world experience, solve problems, and build
                        portfolios so that they become ready for global job markets.
                    </p>
                </div>
                <Image
                    src="/image-12.png"
                    alt="image-12"
                    className="object-cover h-[24rem] w-[26rem] rounded-2xl mt-10 md:mt-0"
                    height={4000}
                    width={4000}
                />
            </div>
            <div className="bg-[#F9FAFB] flex flex-col items-center space-x-4 w-full px-5 sm:px-14 py-14">
                <h2 className="md:w-6/12 font-bold text-3xl text-center">
                    Why we are solving this problem
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-[auto_1fr] lg:w-10/12 gap-4 mt-20">
                    <Card className="bg-primary text-white p-3 md:col-span-2">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Bridging the Experience Gap
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="w-9/12">
                                Many talents acquired theoretical knowledge and are rejected from jobs
                                because they lack work experience and are not able to put in actions what
                                they acquired in the schools.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white p-3">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Bridging Education and Employment
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="w-11/12">
                                Traditional education doesn't always prepare talents for the demands of the
                                tech and digital economy and we are providing in-demand skills through Skills Challenges.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white p-3">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Preparing Talents for Global Job Markets
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                We are ensuring that African talents shine globally and that's why we are
                                equipping them with global technical experience and standout globally.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-between md:space-x-10 min-h-screen p-5 sm:px-14 lg:px-28 py-14'>
                <div className="md:w-1/2">
                    <h2 className="font-bold text-3xl text-primary">
                        Skills Challenges Program is built on the Umurava Talent Marketplace Platform
                    </h2>
                    <p className="mt-4 text-gray-600">
                        A Project-based Learning Solution aimed at providing young and senior talents
                        with an opportunity to showcase their skills to real-world projects and
                        challenges from our partner companies and organizations.
                    </p>
                    <p className="mt-4 text-gray-600">
                        Umurava Skills Challenges enables young talents to build a portfolio
                        and experience that increases their readiness to access job opportunities and projects.
                    </p>
                    <Button className="bg-primary text-xs text-white px-10 mt-10">Get Started</Button>
                </div>
                <Image
                    src="/image-13.png"
                    alt="image-13"
                    className="object-cover h-[24rem] w-[26rem] rounded-2xl ml-auto mt-10 md:mt-0"
                    height={4000}
                    width={4000}
                />
            </div>
        </div>
    )
}

export default page