export interface Challenge {
    _id: string;
    title: string;
    duration: string;
    deadline: Date;
    imageUrl: File | string;
    skills: string[];
    seniority: string;
    prize: string;
    status: string;
    category: string;
    description: string;
    deliverables: string[];
    design: string[];
    requirements: string[];
    participants: number;
    contactEmail: string;
    note: string[];
    createdAt: string;
    updatedAt: string;
}