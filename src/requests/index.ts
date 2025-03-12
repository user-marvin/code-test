export const fetchApi = async () => {
  try {
    const response = await fetch("https://api.spacexdata.com/v3/launches");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch SpaceX data:", err);
  }
};
