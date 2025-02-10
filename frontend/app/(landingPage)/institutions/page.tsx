import { StepIndicator } from '@/components/Components'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BriefcaseBusiness } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div>
            <div className='flex flex-col lg:flex-row lg:items-center justify-between lg:space-x-10 min-h-screen pt-20 pb-14 lg:py-0 px-5 sm:px-14'>
                <div className="lg:w-1/2">
                    <h2 className="font-bold text-2xl lg:text-3xl text-primary">
                        Accelerate Your Students and Traineess Employability and
                        Career Growth through Project-based Learning Solution
                    </h2>
                    <p className="mt-4 text-sm md:text-base text-gray-600">
                        We partner with Universities, Schools, and Trainining Institutions to
                        build the work experience of their students and trainees through project
                        based learning challenges and hackathons
                    </p>
                    <Button className="bg-primary text-xs text-white px-10 mt-4 lg:mt-10">Partner with us</Button>
                </div>
                <Image
                    src="/image-10.png"
                    alt="image-1"
                    className="object-cover lg:h-72 lg:w-[30rem] rounded-2xl mt-10 lg:mt-0 "
                    height={1000}
                    width={1000}
                />
            </div>
            <div className="bg-[#F9FAFB] flex flex-col items-center w-full px-5 sm:px-14 py-14">
                <h2 className="font-bold text-2xl text-center">
                    Key Offerings & Benefits:
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
                    <Card className="bg-primary text-white p-3">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Employability and Career Development Opportunities
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm text-gray-100">
                                Students gain hands-on experience working on real-world challenges and
                                help them build professional networks that increase their chances and
                                readiness of landing job opportunities and this lead to career advancement
                                and long-term succes.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white p-3">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Practical Application of Classroom Knowledge
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm text-gray-100">
                                The Skills Challenges bridge the gap between theoretical learning and
                                practical application, reinforcing what students learn in their academic courses.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white p-3">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Students & Trainees Engagement
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm text-gray-100">
                                Embed and incorporate Skills Challenges into your courses to give students and
                                trainees hands-on projects and practices that enhance their learning experience
                                and skills mastery. Competitive and project-based challenges keep students
                                motivated and actively engaged in their learning journey.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white p-3 lg:col-span-2">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Access to the Industry Experts & Mentors
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm text-gray-100">
                                Skills Challenges expose students to industry experts and mentors who offer
                                guidance, support, and insights on the trends of digital careers.
                                This can help students gain a deep understanding of their chosen field.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white p-3">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Skills Assessments
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-sm text-gray-100">
                                Embed our projects based tests and skills assessments directly into your curriculum.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex flex-col items-center gap-20 w-full px-5 sm:px-14 py-14">
                <h2 className="md:7/12 lg:w-5/12 font-bold text-2xl text-center">
                    Join a few Educational Institutions using Skills Challenges by Umurava
                </h2>
                <div className='w-full flex flex-col items-center'>
                    <div className='w-full lg:w-9/12 flex flex-wrap gap-y-8 justify-evenly'>
                        <Image src="/logos/logo-3.png" alt="logo-3" className="h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-4.png" alt="logo-4" className="h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-5.png" alt="logo-5" className="h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-6.png" alt="logo-6" className="object-contain h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-7.png" alt="logo-7" className="h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-8.png" alt="logo-8" className="h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-9.png" alt="logo-9" className="h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-10.png" alt="logo-10" className="h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-11.png" alt="logo-11" className="h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-12.png" alt="logo-12" className="object-contain h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-13.png" alt="logo-13" className="h-12 w-32" height={1000} width={1000} />
                        <Image src="/logos/logo-14.png" alt="logo-14" className="h-12 w-32" height={1000} width={1000} />
                    </div>
                    <Image src="/logos/logo-15.png" alt="logo-15" className="col-span-6 mx-auto mt-8 h-12 w-32" height={1000} width={1000} />
                </div>
            </div>
            <div className="flex flex-col items-center gap-20 w-full px-14 py-14">
                <h2 className="md:w-6/12 font-bold text-2xl text-center">
                    How Skills Challenges Program can Be Integrated into your Learning Institution.
                </h2>
                <div className='w-10/12 flex flex-col lg:flex-row justify-between items-center'>
                    <div className='space-y-4'>
                        <StepIndicator number={1} text="As Career Development and Job Readiness Program" />
                        <StepIndicator number={2} text="As Skills Assessments Method after a course or a term" />
                        <StepIndicator number={3} text="As extracurricular activities to complement academic courses" />
                        <StepIndicator number={4} text="As the portfolio of the Students" />
                        <StepIndicator number={5} text="As part of Capstone Projects or final-year assignments " />
                    </div>
                    <Image
                        src="/image-11.png"
                        alt="image-11"
                        className="object-cover mt-10 lg:mt-0"
                        height={400}
                        width={400}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-20 w-full px-14 py-14">
                <div className='bg-primary flex flex-col justify-center items-center gap-6 w-full rounded-2xl p-20'>
                    <h2 className="lg:w-8/12 md:w-4/12 font-bold text-white text-2xl text-center">
                        Ready to transform your learning institution?
                    </h2>
                    <Button className="bg-white text-xs font-bold text-primary px-12" variant="outline" asChild>
                        <Link href="/#">Let's Partner</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default page