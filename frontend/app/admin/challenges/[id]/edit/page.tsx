'use client';
import React, { use, useEffect, useState } from "react";
import ChallengeForm from "@/app/admin/_components/ChallengeForm";
import { GoBackButton } from "@/components/Components";
import Link from "next/link";
import { getChallenge } from "@/app/actions/challenges";
import { Challenge } from "@/app/types/challenge";
import { useParams, useRouter } from "next/navigation";
import { formatTitle } from "@/lib/utils";


function EditChallengePage() {
    // Retrieve and normalize the id parameter
    const { id: paramId } = useParams();
    const id = Array.isArray(paramId) ? paramId[0] : paramId;
    
    const [challenge, setChallenge] = useState<Challenge | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const creator_id = localStorage.getItem("_id");
    const authToken = localStorage.getItem("authToken");

    const router = useRouter();

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
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [id]);

    if (loading) {
        return null;
    }

    if (!challenge) {
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

    const handleUpdate = async (data: any) => {
        setIsSubmitting(true);
        setError("");
        // Create a FormData object to handle the file upload
        const formData = new FormData();

        // Append the non-file data
        Object.keys(data).forEach((key) => {
            if (key !== "imageUrl") {
                if (Array.isArray(data[key])) {
                    formData.append(key, JSON.stringify(data[key])); // Convert arrays to JSON strings
                } else {
                    formData.append(key, data[key]);
                }
            }
        });

        // Append the file (assuming the file input is named "imageUrl" in the form)
        if (data.imageUrl) {
            formData.append("challengeImage", data.imageUrl);
        }

        formData.append("creator_id", creator_id || "");

        // Log the FormData entries
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        // API call to create the challenge
        try {
            const response = await fetch(`${BASE_URL}/api/challenges/edit/${id}`, {
                method: "PATCH",
                body: formData,
                headers: {
                    'Authorization': `Bearer ${authToken}`,  // Add Authorization header with the token
                }
            });

            if (!response.ok) {
                throw new Error("Failed to update challenge");
            }

            const result: Challenge = await response.json();
            console.log("Challenge updated successfully:", result);

            // Navigate to the challenge detail page after successful update
            router.push(`/admin/challenges/${result._id}/${formatTitle(result.title)}`);
        } catch (error) {
            const err = error as Error;
            console.error("Error updating challenge:", error);
            setError(err.message);
        } finally {
            setIsSubmitting(false); // Stop submitting
        }
    };

    return (
        <div>
            <div className='bg-white flex text-sm items-center gap-2 px-8 py-3 border-y border-gray-200'>
                <GoBackButton />
                <Link className='text-gray-600' href="/admin/challenges">Challenges & Hackathons /</Link>
                <p className='text-gray-600'>Edit Challenge /</p>
                <p className='text-primary'>{challenge.title}</p>
            </div>
            <ChallengeForm initialData={challenge} onSubmit={handleUpdate} isSubmitting={isSubmitting} error={error} />
        </div>
    );
}

export default EditChallengePage;
