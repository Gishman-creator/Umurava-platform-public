"use client";

import { use, useEffect, useState } from "react";
import { GoBackButton, ParticipantListItem } from '@/components/Components';
import { Button } from '@/components/ui/button';
import { BriefcaseBusiness, CalendarDays, DollarSign, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getChallenge } from '@/app/actions/challenges';
import { Challenge } from '@/app/types/challenge';
import { useParams } from "next/navigation";

function Page() {
    // Retrieve and normalize the id parameter
    const { id: paramId } = useParams();
    const id = Array.isArray(paramId) ? paramId[0] : paramId;
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  useEffect(() => {
    const fetchChallenge = async () => {
      if (!id) return;
      try {
        const challengeData = await getChallenge(id, localStorage.getItem('_id'));
        console.log("Challenge data:", challengeData);

        if (challengeData && Object.keys(challengeData).length === 0) {
          // If the fetched data is an empty object, treat it as a 404
          setChallenge(null);
        } else {
          setChallenge(challengeData);
        }
      } catch (error) {
        console.error("Error fetching challenge:", error);
        setChallenge(null); // In case of an error, treat it as a 404
      }
    };

    fetchChallenge();
  }, [id]);

  if (challenge === null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-2xl font-semibold">404</h1>
        <p className="mt-1 text-sm text-gray-600">
          The challenge your looking for could not be found.
        </p>
        <a
          href={`/admin/challenges`}
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
        <Link className='text-gray-600' href="/admin/challenges">Challenges & Hackathons /</Link>
        <p className='text-primary'>{challenge.title}</p>
      </div>
      <div className='flex justify-between items-start py-6 px-8'>
        <div className='bg-white p-4 pb-6 border border-gray-200 rounded-lg w-fit'>
          <Image
            src={typeof challenge.imageUrl === "string" ? challenge.imageUrl :
              (challenge.imageUrl instanceof Blob ? URL.createObjectURL(challenge.imageUrl) : '')}
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
              {challenge.requirements?.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>

            <h2 className='font-bold mt-6'>Product Design:</h2>
            <ul className='pl-4 list-disc text-gray-600 text-sm mt-2'>
              {challenge.design?.map((design, index) => (
                <li key={index}>{design}</li>
              ))}
            </ul>

            <h2 className='font-bold mt-6'>Deliverables:</h2>
            <ul className='pl-4 list-disc text-gray-600 text-sm mt-2'>
              {challenge.deliverables?.map((deliverable, index) => (
                <li key={index}>{deliverable}</li>
              ))}
            </ul>

            <h2 className='font-bold mt-6'>NOTE:</h2>
            <ul className='pl-4 list-disc text-gray-600 text-sm mt-2'>
              {challenge.note?.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className='space-y-6'>
          <div className='bg-white p-4 border border-gray-200 rounded-lg w-72'>
            <h2 className='font-bold'>Key Instructions:</h2>
            <p className='text-gray-600 text-xs mt-2'>
              You are free to schedule the clarification call with the team via this
            </p>
            <div className='flex items-center gap-2 mt-6'>
              <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-3">
                <Mail className="text-primary h-4 w-4" />
              </div>
              <div>
                <h2 className='font-semibold text-sm'>{challenge.contactEmail}</h2>
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

            <div className='flex items-center gap-2 pt-8'>
              <Button type="button" variant={'destructive'} className="bg-red-600 text-xs text-white w-full">Delete</Button>
              <Button type="submit" className="bg-primary text-xs text-white w-full">
                <Link href={`/admin/challenges/${challenge._id}/edit`}>Edit</Link>
              </Button>
            </div>
          </div>

          <div className='bg-white border border-gray-200 rounded-lg w-72'>
            <div className='flex items-center gap-2 p-4'>
              <h2 className='font-bold text-sm'>Participants:</h2>
              <span className='bg-primary text-white text-[0.6rem] rounded-full px-1'>250</span>
            </div>

            <ParticipantListItem name='Hilaire Sh' speciality='Product Designer' image='/image-6.png' />
            <ParticipantListItem name='Christian Manzi' speciality='UI/UX Designer' image='/image-6.png' />
            <ParticipantListItem name='Jolly Mutesi' speciality='Content Creator' image='/image-6.png' />
            <ParticipantListItem name='Dr. Samuel Smith' speciality='Mental Health Professional' image='/image-6.png' />

            <div className='p-4'>
              <Button className="bg-primary w-full text-xs text-white">View all</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
