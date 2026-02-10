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

export function getUser(baseUrl, userId) {
    let jsonData;
    fetch(baseUrl + 'affirmation_users/' + userId)
        .then((response) => response.json())
        .then((result) => (jsonData = result))
        .catch((error) => {
            console.error('Error getting users: ', error);
        });

    return jsonData;
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
    let jsonData;
    const data = {
        username: newUsername,
        affirmations: [],
    };

    fetch(baseUrl, {
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
        .then((result) => (jsonData = result))
        .catch((error) => console.error(error));

    return jsonData;
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
