import Link from 'next/link';
import { Suspense } from 'react';
import getVehicleByMakeAndYear from '@/app/services/getVehicleByMakeAndYear';
import getVehiclesMakers from '@/app/services/getVehiclesMakers';
import getYears from '@/utils/dates/getYear';

export async function generateStaticParams() {
  const makeIds = await getVehiclesMakers();
  const years = getYears(2015);

  const params = [];
  makeIds.forEach((make) => {
    years.forEach((year) => {
      params.push({ makeId: make.MakeId.toString(), year: year.toString() });
    });
  });

  return params;
}

export default async function ResultPage({ params }) {
  const { makeId, year } = await params;

  const vehicleModels = await getVehicleByMakeAndYear(makeId, year);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold">
          {vehicleModels && `${vehicleModels.length} `}Available Models
        </h1>

        {vehicleModels && vehicleModels.length > 0 && (
          <p className="text-lg mt-4">
            Vehicle make: {vehicleModels && vehicleModels[0]?.Make_Name}
          </p>
        )}

        <p className="text-lg mb-4">Model year: {year}</p>

        <ul className="w-3/4 max-w-lg bg-white rounded-lg shadow-md p-4">
          {vehicleModels.length > 0 ? (
            vehicleModels.map((model, index) => (
              <li
                key={`model-${index}-${model.Model_ID}`}
                className="border-b last:border-0 border-gray-200 py-2"
              >
                {model.Model_Name}
              </li>
            ))
          ) : (
            <li className="text-gray-600">No models found</li>
          )}
        </ul>

        <Link href={`/`} passHref>
          <button className="bg-blue-500 text-white px-20 py-2 rounded disabled:bg-gray-400 mt-4">
            Another Search
          </button>
        </Link>
      </div>
    </Suspense>
  );
}
