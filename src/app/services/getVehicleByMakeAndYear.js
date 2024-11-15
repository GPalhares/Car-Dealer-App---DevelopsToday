const getVehicleByMakeAndYear = async (makeId, year) => {
  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
    );

    if (!response.ok) {
      return [];
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return [];
    }

    const data = await response.json();

    return data?.Results || [];
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    return [];
  }
};

export default getVehicleByMakeAndYear;
