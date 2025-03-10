export const getChallenge = async (id: string, creator_id: string | null) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/challenges/id/${id}/${creator_id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching challenge:", error);
        throw error;
    }
};

export async function getChallenges(limit?: number) {
    try {
        console.log('getting challenges')
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/challenges/${limit || ''}`);
        console.log('got challenges', response)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching challenges:', error);
        throw error;
    }
}

export const getByCreatorId = async (limit = 5, creator_id: string | null, authToken: string | null ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/challenges/creator_id/${creator_id}/${limit}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching challenges:", error);
        throw error;
    }
};

export const deleteChallenge = async (id: string | null, authToken: string | null ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/challenges/delete/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching challenges:", error);
        throw error;
    }
};

export const searchChallenges = async (query: string, creator_id: string | null) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/challenges/search?query=${query}&creator_id=${creator_id}`, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching challenges:", error);
        throw error;
    }
};

export const getChallengeStats = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/challenges/stats`, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching challenges:", error);
        throw error;
    }
};

export const getAdminStats = async (_id: string | null, authToken: string | null ) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/stats?_id=${_id}`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching challenges:", error);
        throw error;
    }
};
