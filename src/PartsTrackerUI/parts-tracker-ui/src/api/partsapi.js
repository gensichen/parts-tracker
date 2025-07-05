const API_BASE = "https://localhost:44349/api/Parts"; // Adjust for your backend

export async function getParts() {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function getPart(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  return res.json();
}

// Add create/edit/delete as needed
