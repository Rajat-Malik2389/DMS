const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function submitForm(endpoint, payload) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to submit form.");
  }

  return result;
}
