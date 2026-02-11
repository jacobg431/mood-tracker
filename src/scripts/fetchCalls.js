export function getAllMoods(baseUrl) {
    let jsonData;
    fetch(baseUrl + 'moods/')
        .then((response) => response.json())
        .then((result) => (jsonData = result))
        .catch((error) => {
            console.error('Error getting moods: ', error);
        });

    return jsonData;
}

export function getAllUsers(baseUrl) {
    return fetch(baseUrl + 'affirmation_users/')
        .then((response) => {
            if (!response.ok) throw new Error('HTTP error: ' + response.status);
            console.log(response);
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

export function updateAffirmations(baseUrl, apiKey, userId, username, newAfirmations) {
    let jsonData;
    const data = {
        id: userId,
        username: username,
        affirmations: newAfirmations,
    };

    fetch(baseUrl, {
        method: 'PUT',
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
        .then((result) => (jsonData = result))
        .catch((error) => console.error(error));

    return jsonData;
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
