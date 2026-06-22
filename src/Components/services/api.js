export async function fetchData() {
  const url = "https://api.spacexdata.com/v4/launches";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Respsone status: ${response.status}`);
  }
  return response.json();
}

export async function fetchSpecificData(id) {
  const url = `https://api.spacexdata.com/v4/launches/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Respsone status: ${response.status}`);
  }
  return response.json();
}

export async function fetchRocketDetails(id) {
  const url = `https://api.spacexdata.com/v4/rockets/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Respsone status: ${response.status}`);
  }
  return response.json();
}
