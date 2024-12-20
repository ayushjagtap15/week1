import { backendUrl } from "./config";

const handleResponse = async (response) => {
    let responseBody;
    try {
        // Attempt to read the response body
        responseBody = await response.text();
    } catch (error) {
        throw new Error("Failed to read the response body.");
    }

    // Check if the response is OK (status code 2xx)
    if (!response.ok) {
        // Try to parse the body as JSON, fallback to text
        try {
            const errorData = JSON.parse(responseBody);
            const errorMessage = errorData.message || JSON.stringify(errorData);
            throw new Error(`HTTP ${response.status}: ${errorMessage}`);
        } catch {
            throw new Error(`HTTP ${response.status}: ${responseBody}`);
        }
    }

    // Attempt to parse as JSON for successful responses
    try {
        return JSON.parse(responseBody);
    } catch (error) {
        throw new Error("Failed to parse response as JSON.");
    }
};


const getToken = () => {
    try {
        const match = document.cookie.match(/(?:^|;\s*)token\s*=\s*([^;]+)/);
        if (!match) {
            throw new Error("Token not found");
        }
        return match[1];
    } catch (error) {
        console.error("Error retrieving token:", error.message);
        return null;
    }
};

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await handleResponse(response);
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
    }

    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    return await handleResponse(response);
};

export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken();
    if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
    }

    const response = await fetch(backendUrl + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await handleResponse(response);
};