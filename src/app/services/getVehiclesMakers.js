const getVehiclesMakers = async () => {
  const response = await fetch(
    'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json',
  );
  const data = await response.json();

  return data?.Results || [];
};

export default getVehiclesMakers;
