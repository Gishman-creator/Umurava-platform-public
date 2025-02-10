"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation";
import { BulletPointTextarea } from "@/components/ui/bullet-point-textarea";
import ImageUpload from "./ImageUpload";
import { Textarea } from "@/components/ui/textarea";
import { Challenge } from "@/app/types/challenge";
import Link from "next/link";

interface ChallengeFormProps {
    initialData?: Challenge;
    onSubmit: (data: any) => void;
    isSubmitting: boolean;
    error: string;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({ initialData, onSubmit, isSubmitting, error }) => {
    const router = useRouter();

    const [formData, setFormData] = React.useState({
        title: initialData?.title || "",
        imageUrl: initialData?.imageUrl || "",
        deadline: initialData?.deadline ? new Date(initialData.deadline).toISOString().split("T")[0] : "",
        duration: initialData?.duration || "",
        skills: initialData?.skills || [],
        seniority: initialData?.seniority || "",
        category: initialData?.category || "",
        description: initialData?.description || "",
        contactEmail: initialData?.contactEmail || "",
        prize: initialData?.prize || "",
        deliverables: initialData?.deliverables || [],
        requirements: initialData?.requirements || [],
        design: initialData?.design || [],
        note: initialData?.note || [],
    });

    const challengeCategories = [
        "Web Design", "App Development", "Data Science", "Cybersecurity", "Blockchain", "AI & Machine Learning", "Cloud Computing", "Game Development", "UI/UX Design", "IoT", "Open Source", "Hardware Hacking", "Embedded Systems", "AR/VR Development"
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBulletChange = (name: string, value: string[]) => {
        console.log(`Updating ${name}:`, value);
        setFormData((prev) => ({
            ...prev,
            [name]: [...value] // Ensure a new array is created
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {

        // console.log(formData)

        e.preventDefault();

        const formattedData = {
            title: formData.title,
            imageUrl: formData.imageUrl,
            deadline: formData.deadline,
            duration: formData.duration,
            skills: Array.isArray(formData.skills) ? formData.skills : [], // Ensure array
            seniority: formData.seniority,
            category: formData.category,
            description: formData.description,
            contactEmail: formData.contactEmail,
            prize: formData.prize,
            deliverables: Array.isArray(formData.deliverables) ? formData.deliverables : [],
            requirements: Array.isArray(formData.requirements) ? formData.requirements : [],
            design: Array.isArray(formData.design) ? formData.design : [],
            note: Array.isArray(formData.note) ? formData.note : [],
        };

        onSubmit(formattedData);
    };

    return (
        <div className="flex justify-center items-center py-6 px-8">
            <form onSubmit={handleSubmit} className="bg-white px-6 py-6 border border-gray-200 rounded-lg w-fit">
                <div className="w-[30rem] space-y-6">
                    <div>
                        {initialData && (
                            <h2 className="text-center text-lg font-bold">Edit a Challenge</h2>
                        )}
                        <h2 className="text-gray-600 text-sm text-center mb-8">Fill out these details to build your broadcast</h2>
                    </div>

                    <div className="grid min-w-full max-w-sm items-center gap-1.5">
                        <ImageUpload
                            onImageUpload={(file) => {
                                console.log("Image file......................:", file);
                                setFormData({ ...formData, imageUrl: file }); // Store the file object directly
                            }}
                            currentImage={formData.imageUrl instanceof File ? formData.imageUrl.name : typeof formData.imageUrl === "string" ? formData.imageUrl : URL.createObjectURL(formData.imageUrl)} // Display the file name if it's a file
                        />
                    </div>

                    <div className="grid min-w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="title">Challenge/Hackathon Title</Label>
                        <Input type="text" id="title" name="title" placeholder="Enter title" value={formData.title} onChange={handleChange} required />
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="deadline">Deadline</Label>
                            <input className="py-1.5 px-3 rounded-md border border-gray-200 focus-visible:outline-none focus-visible:border-[#FA9874]" type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} required />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="duration">Duration</Label>
                            <Input type="text" id="duration" name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="prize">Money Prize</Label>
                            <Input type="text" id="prize" name="prize" placeholder="$150 - $400" value={formData.prize} onChange={handleChange} required />
                        </div>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="contactEmail">Contact Email</Label>
                            <Input type="email" id="contactEmail" name="contactEmail" placeholder="Email" value={formData.contactEmail} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="space-y-2 w-full">
                            <Label htmlFor="specialization">Challenge Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => {
                                    setFormData({ ...formData, category: value })
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your challenge category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {challengeCategories.map((spec) => (
                                        <SelectItem className="py-2 hover:bg-gray-100" key={spec.toLowerCase().replace(/\s+/g, "-")} value={spec.toLowerCase()}>
                                            {spec}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 w-full">
                            <Label htmlFor="specialization">Seniority</Label>
                            <Select
                                value={formData.seniority}
                                onValueChange={(value) => {
                                    setFormData({ ...formData, seniority: value })
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your challenge seniority" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem className="py-2 hover:bg-gray-100" value="Beginner">Beginner</SelectItem>
                                    <SelectItem className="py-2 hover:bg-gray-100" value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem className="py-2 hover:bg-gray-100" value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid min-w-full gap-1.5">
                        <Label htmlFor="description">Project Brief</Label>
                        <Textarea className="min-h-[200px]" id="description" name="description" placeholder="Enter text here..." value={formData.description} onChange={handleChange} />
                        <p className="text-xs text-gray-600">Keep this simple of 250 character</p>
                    </div>

                    <div className="grid min-w-full gap-1.5">
                        <Label htmlFor="requirements">Product Requirements</Label>
                        <BulletPointTextarea
                            value={formData.requirements}
                            onChange={(newRequirements) => handleBulletChange("requirements", newRequirements)}
                        />
                        <p className="text-xs text-gray-600">Keep this simple of 500 character</p>
                    </div>

                    <div className="grid min-w-full gap-1.5">
                        <Label htmlFor="design">Product Design</Label>
                        <BulletPointTextarea
                            value={formData.design}
                            onChange={(newDesign) => handleBulletChange("design", newDesign)}
                        />
                        <p className="text-xs text-gray-600">Keep this simple of 500 character</p>
                    </div>

                    <div className="grid min-w-full gap-1.5">
                        <Label htmlFor="deliverables">Deliverables</Label>
                        <BulletPointTextarea
                            value={formData.deliverables}
                            onChange={(newDeliverables) => handleBulletChange("deliverables", newDeliverables)}
                        />
                        <p className="text-xs text-gray-600">Keep this simple of 500 character</p>
                    </div>

                    <div className="grid min-w-full gap-1.5">
                        <Label htmlFor="skills">Skills needed</Label>
                        <BulletPointTextarea
                            value={formData.skills}
                            onChange={(newSkills) => handleBulletChange("skills", newSkills)}
                        />
                        <p className="text-xs text-gray-600">Keep this simple of 200 character</p>
                    </div>

                    <div className="grid min-w-full gap-1.5">
                        <Label htmlFor="note">Note</Label>
                        <BulletPointTextarea
                            value={formData.note}
                            onChange={(newNote) => handleBulletChange("note", newNote)}
                        />
                        <p className="text-xs text-gray-600">Keep this simple of 200 character</p>
                    </div>

                    <div className="flex flex-col items-center gap-6 pt-8">
                        { error && (<p className="text-red-500 text-xs">{error}</p>)}
                        <div className='flex items-center gap-6 w-full'>
                            <Button type="button" variant={'outline'} className="border-primary text-xs text-primary w-2/5" onClick={() => router.back()}>Cancel</Button>
                            <Button disabled={isSubmitting} type="submit" className="bg-primary text-xs text-white w-full">
                                {isSubmitting ? "Submitting..." : initialData ? "Update Challenge" : "Create Challenge"}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ChallengeForm;
