const API_BASE = "http://localhost:8000/accounts";

export async function askAI(prompt) {
  const res = await fetch(`${API_BASE}/ask-ai/`, {
    method: "POST",
    credentials: "include", // send cookies
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!res.ok) throw new Error("AI request failed");
  return await res.json();
}

export async function checkAuth() {
  const res = await fetch(`${API_BASE}/check-auth/`, {
    method: "GET",
    credentials: "include"
  });
  if (!res.ok) return null;
  return await res.json();
}
