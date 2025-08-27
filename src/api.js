const API_BASE = "https://jarvis-ai-backend-nu7x.onrender.com/accounts";

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
  try {
    const res = await fetch(`${API_BASE}/check-auth/`, {
      method: "GET",
      credentials: "include",
    });

    if (res.status === 401) return null; // not logged in
    if (!res.ok) throw new Error("Auth check failed");

    return await res.json();
  } catch (err) {
    console.error("checkAuth error:", err);
    return null;
  }
}

