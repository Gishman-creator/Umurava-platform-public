import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BriefcaseBusiness, FileText, Medal, TrendingUp } from "lucide-react";
import { CarouselComponent } from "./_components/Carousel";
import { Badge } from "@/components/ui/badge";
import ChallengeCard from "../../components/ChallengeCard";
import Link from "next/link";
import { TestimonialCarouselComponent } from "./_components/TestimonialCarousel";
import { getChallenges } from "../actions/challenges";
import { Challenge } from "../types/challenge";

export default async function Home() {

    const challenges: Challenge[] = await getChallenges(3);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-10 min-h-screen pt-20 pb-14 md:py-0 px-5 sm:px-14">
                <div className="sm:w-4/5 md:w-2/5">
                    <h2 className="font-bold text-3xl text-primary">Build Work Experience Through Skills Challenges Program</h2>
                    <p className="mt-4 text-sm lg:text-base text-gray-600">
                        Enhance your Employability and Accelerate your Carrer Growth
                        by Working on Hands-on Projects and Hackathons from various Businesses and Organizations.
                    </p>
                    <Button className="bg-primary text-xs text-white px-10 mt-10">Get Started</Button>
                </div>
                <div className="md:w-1/2 flex md:items-center md:justify-end mt-8 md:mt-0 gap-2">
                    <Image
                        src="/image.png"
                        alt="image-1"
                        className=" rounded-3xl h-72 w-52 sm:h-80 sm:w-60 lg:h-96 lg:w-72 overflow-hidden"
                        height={400}
                        width={240}
                    />
                    <Image
                        src="/image-1.png"
                        alt="image-1"
                        className="object-cover rounded-3xl h-72 w-40 sm:h-80 sm:w-52 lg:h-96 lg:w-60 overflow-hidden"
                        height={400}
                        width={240}
                    />
                </div>
            </div>
            <div className="bg-[#F9FAFB] flex flex-col items-center w-full px-5 sm:px-14 py-14">
                <h2 className=" md:w-6/12 font-bold text-3xl text-center">
                    Experience a New Way of Building Work Experience
                </h2>
                <p className="mt-4 md:w-5/12 text-sm text-center text-gray-600">
                    Join Skills Challenges Program to accelerate your carrer growth
                    and become part of Africa's lagest workforce of digital professionals.
                </p>
                <div className="grid grid-cols-1 grid-rows-[auto_1fr_1fr] md:grid-cols-2 md:grid-rows-[auto_1fr] sm:w-10/12 gap-4 mt-20">
                    <Card className="bg-primary text-white p-3 md:col-span-2">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Build a Strong Portfolio and Hands-on Experience
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="w-9/12">
                                Tackle real-world projects through challenges and hackathons that mirror
                                real world challenges faced by businesses and organizations. Therefore, showcase your
                                skills and accomplishments to potential employers and clients through a portfolio of completed projects.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white p-3">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Enhance Your Employment Path
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="w-11/12">
                                Elop the in-demand skills and build a strong portfolio to increase your
                                chances of landing your dream job or contract.
                            </CardDescription>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary text-white p-3">
                        <CardHeader>
                            <BriefcaseBusiness className="bg-white text-primary w-12 h-12 p-4 rounded-md mb-2" />
                            <CardTitle className="text-xl mt-6">
                                Earn Recognition and Prizes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>
                                Earn both Money and Knowledge Prizes by participating in various contests and
                                competitions by working on real world projects and hackathons from our partner
                                companies & organizations.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="flex flex-col items-center w-full px-5 md:px-14 py-14">
                <div className="bg-primary grid grid-cols-2 md:grid-cols-4 gap-y-10 rounded-2xl text-white py-14 w-full">
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold">1</h1>
                        <p className="text-xs">Year</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold">500 +</h1>
                        <p className="text-xs">Challenges completed</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold">10K +</h1>
                        <p className="text-xs">Users</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold">6 +</h1>
                        <p className="text-xs">Countries</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-14 w-full p-5 sm:px-14 py-14">
                <div className="flex flex-col items-center">
                    <h2 className="md:w-8/12 font-bold text-3xl text-center">
                        Skills Challenges Cover various in-demand skills and Careers for the digital economy
                    </h2>
                    <p className="mt-4 w-5/12 text-sm text-center text-gray-600">
                        Explore the projects that various talents are working on.
                    </p>
                </div>
                <div className="flex flex-col gap-4 w-8/12">
                    <div className="flex justify-center gap-6">
                        <Button className='bg-primary text-white text-xs w-fit col-span-2'>UI/UX Design</Button>
                        <Button className='bg-light-gray hover:text-white text-gray-500 text-xs w-fit col-span-2'>Data Science</Button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Button className='bg-light-gray hover:text-white text-gray-500 text-xs w-fit'>Graphic Design</Button>
                        <Button className='bg-light-gray hover:text-white text-gray-500 text-xs w-fit'>Data Analysis & Research</Button>
                        <Button className='bg-light-gray hover:text-white text-gray-500 text-xs w-fit'>Animation</Button>
                        <Button className='bg-light-gray hover:text-white text-gray-500 text-xs w-fit'>Videography & Photography</Button>
                    </div>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Button className='bg-light-gray hover:text-white text-gray-500 text-xs w-fit'>Data Science</Button>
                        <Button className='bg-light-gray hover:text-white text-gray-500 text-xs w-fit'>AI & Maching Learning</Button>
                        <Button className='bg-light-gray hover:text-white text-gray-500 text-xs w-fit'>Web3</Button>
                        <Button className='bg-light-gray hover:text-white text-gray-500 text-xs w-fit'>Digital Marketing & Communications</Button>
                    </div>
                </div>
                <div className="w-full">
                    <CarouselComponent />
                </div>
            </div>
            <div className="flex flex-col items-center gap-14 w-full px-5 sm:px-14 py-14">
                <div className="flex flex-col items-center">
                    <h2 className="md:w-8/12 font-bold text-3xl text-center">
                        Explore Challenges & Hackathons
                    </h2>
                    <p className="mt-4 md:w-7/12 text-sm text-center text-gray-600">
                        Join Skills Challenges Program to accelerate your career growth and become
                        part of Africa's largest workforce of digital professionals.
                    </p>
                </div>

                {/* Challenge Card */}

                {challenges.length !== 0 ? (
                    <div className="grid grid-cols-3 gap-6 mt-4">
                        {challenges.slice(0, 3).map((challenge) => (
                            <ChallengeCard key={challenge._id} challenge={challenge} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-1 text-center text-sm text-gray-600">
                        No challenges were found!
                    </p>
                )}

                <Button className="border-primary text-xs text-primary px-12" variant="outline" asChild>
                    <Link href="/#">View More</Link>
                </Button>
            </div>
            <div className="bg-[#F9FAFB] flex flex-col items-center gap-14 w-full px-5 sm:px-14 py-14">
                <div className="flex flex-col items-center">
                    <h2 className="md:w-8/12 font-bold text-3xl text-center">
                        What else can I gain from participating in Skills Challenges ?
                    </h2>
                    <p className="mt-4 md:w-7/12 text-sm text-center text-gray-600">
                        Join Skills Challenges Program to accelerate your career growth
                        and become part of Africa's largest workforce of digital professionals.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row items-center gap-4 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-2">
                        <Card className="border-none shadow-none py-0">
                            <CardHeader className="py-0">
                                <BriefcaseBusiness className="bg-primary text-white w-12 h-12 p-4 rounded-md mb-2" />
                                <CardTitle className="text-sm mt-6">
                                    Enhance Your Employment Path
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 text-xs mt-2">
                                    Network with other talented individuals and learn from their experiences.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-none">
                            <CardHeader className="py-0">
                                <FileText className="bg-primary text-white w-12 h-12 p-4 rounded-md mb-2" />
                                <CardTitle className="text-sm mt-6">
                                    Earn Recognition and Prizes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 text-xs mt-2">
                                    Gain valuable experience and knowledge to advance your career in the digital economy.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-none">
                            <CardHeader className="py-0">
                                <TrendingUp className="bg-primary text-white w-12 h-12 p-4 rounded-md mb-2" />
                                <CardTitle className="text-sm mt-6">
                                    Personal Growth
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 text-xs mt-2">
                                    Challenge yourself, learn new skills, and expand your professional network.
                                </CardDescription>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-none">
                            <CardHeader className="py-0">
                                <Medal className="bg-primary text-white w-12 h-12 p-4 rounded-md mb-2" />
                                <CardTitle className="text-sm mt-6">
                                    Learn from Industry Experts
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-gray-600 text-xs mt-2">
                                    Access valuable insights and guidance from experienced
                                    professionals in the digital careers fields and spaces.
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </div>
                    <Image
                        src="/image-5.png"
                        alt="image-1"
                        className="object-cover mt-6 lg:mt-0"
                        height={400}
                        width={400}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-14 w-full py-14">
                <div className="w-full px-5 sm:px-14">
                    <h2 className="md:w-7/12 lg:w-5/12 font-bold text-3xl">
                        Users are in Love with Skills Challenges Program
                    </h2>
                    <p className="mt-4 md:w-7/12 lg:w-5/12 text-sm text-gray-600">
                        See what our clients say about working with us.
                        Their success speaks for our dedication and expertise.
                    </p>
                </div>
                <div className="w-full flex justify-start px-5 md:px-0 md:pl-16">
                    <TestimonialCarouselComponent />
                </div>
            </div>
            <div className="bg-[#F9FAFB] flex flex-col items-center gap-14 w-full py-14 px-5 md:px-14">
                <div className="flex justify-center items-center">
                    <h2 className="font-bold text-3xl text-center">
                        How to Get Started
                    </h2>
                </div>
                <div className="md:w-10/12 grid grid-cols-1 sm:grid-cols-2 grid-rows-6 gap-5">
                    <div className="bg-white flex flex-col justify-between border rounded-md overflow-hidden row-span-3 sm:col-start-1">
                        <div className="space-y-4 p-4">
                            <Badge variant="card2">Step 1</Badge>
                            <h2 className="text-sm font-bold pl-3">Sign up on Umurava Platform</h2>
                            <p className="text-xs font-thin text-gray-600 pl-3">
                                Submit your completed project for evaluation.
                            </p>
                        </div>
                        <Image
                            src="/image-7.png"
                            alt="image-8"
                            className="h-24 w-48 mt-auto ml-auto"
                            height={400}
                            width={400}
                        />
                    </div>
                    <div className="bg-white flex flex-col justify-between border rounded-md overflow-hidden row-span-3 sm:col-start-1">
                        <div className="space-y-4 p-4">
                            <Badge variant="card2">Step 2</Badge>
                            <h2 className="text-sm font-bold pl-3">Browse Open Challenges</h2>
                            <p className="text-xs font-thin text-gray-600 pl-3">
                                Explore the range of challenges and hackathons
                                and choose one that aligns with your interests and career goals.
                            </p>
                        </div>
                        <Image
                            src="/image-8.png"
                            alt="image-8"
                            className="h-24 w-48 mt-4 ml-auto"
                            height={400}
                            width={400}
                        />
                    </div>
                    <div className="bg-white border rounded-md pb-6 sm:pb-0 sm:row-start-1 sm:row-end-3 sm:col-start-2">
                        <div className="space-y-4 p-4">
                            <Badge variant="card2">Step 3</Badge>
                            <h2 className="text-sm font-bold pl-3">Register and Participate</h2>
                            <p className="text-xs font-thin text-gray-600 pl-3">
                                Sign up for the challenge and start working on the project.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white border rounded-md pb-6 sm:pb-0 sm:row-start-3 sm:row-end-5 sm:col-start-2">
                        <div className="space-y-4 p-4">
                            <Badge variant="card2">Step 4</Badge>
                            <h2 className="text-sm font-bold pl-3">Submit your work</h2>
                            <p className="text-xs font-thin text-gray-600 pl-3">
                                Submit your completed project for evaluation.
                            </p>
                        </div>
                    </div>
                    <div className="bg-white border rounded-md pb-6 sm:pb-0 sm:row-span-2 sm:col-start-2">
                        <div className="space-y-4 p-4">
                            <Badge variant="card2">Step 5</Badge>
                            <h2 className="text-sm font-bold pl-3">Receive Feedback and Recognition</h2>
                            <p className="text-xs font-thin text-gray-600 pl-3">
                                Get feedback on your work and celebrate your achievements.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-14 w-full py-14 px-5 sm:px-14">
                <div className="bg-primary flex flex-col md:flex-row justify-between items-center w-full py-10 px-5 sm:px-14 rounded-2xl">
                    <Image
                        src="/image-9.png"
                        alt="image-1"
                        className="object-cover h-72 w-72 mb-4 md:mb-0"
                        height={1000}
                        width={1000}
                    />
                    <Card className="border-none shadow-none md:w-1/2 h-fit text-white">
                        <CardHeader>
                            <CardTitle>
                                Ready to Unlock Your Career Potential Today!
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-gray-100 text-sm font-thin">
                                Join a challenge or a hackathon to gain valuable work experience,
                                build an impressive portofolio and increase your chances to land
                                job opportunities and accelerate your career growth
                            </CardDescription>
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-white text-xs font-bold text-primary px-12" variant="outline" asChild>
                                <Link href="/#">View More</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
