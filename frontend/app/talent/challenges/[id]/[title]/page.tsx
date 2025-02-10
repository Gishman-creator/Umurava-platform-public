'use client'
import { GoBackButton } from '@/components/Components'
import { Button } from '@/components/ui/button'
import { BriefcaseBusiness, CalendarDays, DollarSign, Mail } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import { getChallenge } from '@/app/actions/challenges';
import { Challenge } from '@/app/types/challenge';
import { useParams } from 'next/navigation'

async function Page() {
  // Retrieve and normalize the id parameter
  const { id: paramId } = useParams();
  const id = Array.isArray(paramId) ? paramId[0] : paramId;

  if (!id) return;
  const challenge: Challenge = await getChallenge(id, null); // Find the challenge data by ID

  if (!challenge) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-semibold">404</h1>
        <p className="mt-1 text-sm text-gray-600">
          The challenge your looking for could not be found.
        </p>
        <a
          href={`/talent/challenges`}
          className="mt-6 text-sm text-blue-500 hover:underline"
        >
          Go back
        </a>
      </div>
    ); // In case the challenge ID does not exist
  }

  return (
    <div>
      <div className='bg-white flex text-sm items-center gap-2 px-8 py-3 border-y border-gray-200'>
        <GoBackButton />
        <Link className='text-gray-600' href="/talent/challenges">Challenges & Hackathons /</Link>
        <p className='text-primary'>{challenge.title}</p>
      </div>
      <div className='flex justify-between items-start py-6 px-8'>
        <div className='bg-white p-4 pb-6 border border-gray-200 rounded-lg w-fit'>
          <Image
            src={typeof challenge.imageUrl === "string" ? challenge.imageUrl : URL.createObjectURL(challenge.imageUrl)}
            alt="challenge image"
            className="object-cover h-72 w-[30rem] rounded-lg"
            height={1000}
            width={1000}
          />
          <div className='w-[30rem]'>
            <h2 className='font-bold mt-6'>Project Brief: {challenge.title}</h2>
            <p className='text-gray-600 text-sm mt-2'>{challenge.description}</p>

            <h2 className='font-bold mt-6'>Tasks:</h2>
            <h2 className='font-bold mt-2'>Product Requirements:</h2>
            <ul className='pl-4 list-disc text-gray-600 text-sm mt-2'>
              {challenge.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>

            <h2 className='font-bold mt-6'>Product Design:</h2>
            <ul className='pl-4 list-disc text-gray-600 text-sm mt-2'>
              {challenge.design.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>

            <h2 className='font-bold mt-6'>Deliverables:</h2>
            <ul className='pl-4 list-disc text-gray-600 text-sm mt-2'>
              {challenge.deliverables.map((deliverable, index) => (
                <li key={index}>{deliverable}</li>
              ))}
            </ul>

            <h2 className='font-bold mt-6'>NOTE:</h2>
            <ul className='pl-4 list-disc text-gray-600 text-sm mt-2'>
              {challenge.note.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className='bg-white p-4 border border-gray-200 rounded-lg w-72'>
          <h2 className='font-bold'>Key Instructions:</h2>
          <p className='text-gray-600 text-sm mt-2'>
            You are free to schedule the clarification call with the team via this
          </p>
          <div className='flex items-center gap-2 mt-6'>
            <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-3">
              <Mail className="text-primary h-4 w-4" />
            </div>
            <div>
              <h2 className='font-bold text-sm'>{challenge.contactEmail}</h2>
              <p className='text-gray-600 text-sm'>Contact Email</p>
            </div>
          </div>
          <div className='flex items-center gap-2 mt-4'>
            <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-3">
              <BriefcaseBusiness className="text-primary h-4 w-4" />
            </div>
            <div>
              <h2 className='font-bold text-sm capitalize'>{challenge.category}</h2>
              <p className='text-gray-600 text-sm'>Challenge Category</p>
            </div>
          </div>
          <div className='flex items-center gap-2 mt-4'>
            <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-3">
              <CalendarDays className="text-primary h-4 w-4" />
            </div>
            <div>
              <h2 className='font-bold text-sm'>{challenge.duration}</h2>
              <p className='text-gray-600 text-sm'>Duration</p>
            </div>
          </div>
          <div className='flex items-center gap-2 mt-4'>
            <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-3">
              <DollarSign className="text-primary h-4 w-4" />
            </div>
            <div>
              <h2 className='font-bold text-sm'>{challenge.prize}</h2>
              <p className='text-gray-600 text-sm'>Money Prize</p>
            </div>
          </div>
          <Button className="bg-primary w-full text-xs text-white mt-6">Submit your work</Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
