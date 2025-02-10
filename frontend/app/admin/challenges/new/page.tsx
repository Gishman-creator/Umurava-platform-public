'use client';
import React, { useState } from "react";
import ChallengeForm from "../../_components/ChallengeForm";
import { GoBackButton } from "@/components/Components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Challenge } from "@/app/types/challenge";
import { formatTitle } from "@/lib/utils";

function NewChallengePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const authToken = localStorage.getItem("authToken");
  const creator_id = localStorage.getItem("_id");

  const router = useRouter();

  const handleCreate = async (data: any) => {
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
      const response = await fetch(`${BASE_URL}/api/challenges`, {
        method: "POST",
        body: formData,
        headers: {
          'Authorization': `Bearer ${authToken}`,  // Add Authorization header with the token
        }
      });

      if (!response.ok) {
        throw new Error("Failed to create challenge");
      }

      const result: Challenge = await response.json();
      console.log("Challenge created successfully:", result);

      // Navigate to the challenge detail page after successful update
      router.push(`/admin/challenges/${result._id}/${formatTitle(result.title)}`);
    } catch (error) {
      const err = error as Error;
      console.error("Error creating challenge:", error);
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
        <p className='text-primary'>Create New Challenge</p>
      </div>
      <ChallengeForm onSubmit={handleCreate} isSubmitting={isSubmitting} error={error} />
    </div>
  );
}

export default NewChallengePage;
