export function getAllMoods(baseUrl) {
    return fetch(baseUrl + 'moods/')
        .then((response) => {
            if (!response.ok) throw new Error('HTTP error: ' + response.status);
            return response.json();
        })
        .catch((error) => {
            console.error('Error getting moods: ', error);
            return [];
        });
}

export function getAllUsers(baseUrl) {
    return fetch(baseUrl + 'affirmation_users/')
        .then((response) => {
            if (!response.ok) throw new Error('HTTP error: ' + response.status);
            return response.json();
        })
        .catch((error) => {
            console.error('Error getting users:', error);
            return [];
        });
}

export function getUser(baseUrl, userId) {
    return fetch(baseUrl + 'affirmation_users/' + userId)
        .then((response) => {
            if (response.status === 404) {
                return null;
            }
            if (!response.ok) {
                throw new Error('Network error');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error getting user:', error);
            return null;
        });
}

export function deleteUser(baseUrl, apiKey, userId) {
    fetch(baseUrl + userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP error: ' + response.status);
            }
            return response.json();
        })
        .catch((error) => console.error(error));
}

export function createNewUser(baseUrl, apiKey, newUsername) {
    const data = {
        username: newUsername,
        affirmations: [],
    };

    return fetch(baseUrl + 'affirmation_users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('HTTP error: ' + response.status);
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error creating user:', error);
            return null;
        });
}

export async function resetAffirmations(baseUrl, apiKey, userId, username){
    const data = {
        id: userId,
        username: username,
        affirmations: []
    };
    return fetch(baseUrl + 'affirmation_users/' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) throw new Error('HTTP error: ' + response.status);
            return response.json();
        })
        .catch((error) => console.error(error));
}


export async function updateAffirmations(baseUrl, apiKey, userId, username, newAfirmations) {
    let user;
    try {
        user = await getUser(baseUrl, userId);
    } catch {
        return;
    }

    const oldAffirmations = user.affirmations || [];
    const updatedAffirmations = [...oldAffirmations, newAfirmations];

    const data = {
        id: userId,
        username: username,
        affirmations: updatedAffirmations,
    };

    return fetch(baseUrl + 'affirmation_users/' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': apiKey,
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            if (!response.ok) throw new Error('HTTP error: ' + response.status);
            return response.json();
        })
        .catch((error) => console.error(error));
}

export async function getUserByUsername(baseUrl, username) {
    const users = await getAllUsers(baseUrl);

    const normalized = username.trim();
    const match = users.find((u) => u.username === normalized);

    return match ?? null;
}

export async function getOrCreateUserByUsername(baseUrl, apiKey, username) {
    const users = await getAllUsers(baseUrl);
    const normalized = username.trim();

    const existing = users.find((u) => u.username === normalized);
    if (existing) return existing;

    return await createNewUser(baseUrl, apiKey, normalized);
}
