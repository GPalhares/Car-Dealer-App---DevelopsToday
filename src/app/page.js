'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import getYears from '@/utils/dates/getYear';
import getVehiclesMakers from './services/getVehiclesMakers';

export default function Home() {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await getVehiclesMakers();

        setVehicleMakes(response);
      } catch (error) {
        throw new Error(`Error fetching vehicle makes: ${error.message}`);
      }
    };
    fetchMakes();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Select Vehicle Make and Year</h1>

      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-gray-700">Vehicle Make:</label>
          <select
            className="mt-1 p-2 border border-gray-300 rounded w-40"
            value={selectedMake}
            onChange={(e) => setSelectedMake(e.target.value)}
          >
            <option value="">Select a make</option>
            {vehicleMakes.map((make) => (
              <option key={make.MakeId} value={make.MakeId}>
                {make.MakeName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Model Year:</label>
          <select
            className="mt-1 p-2 border border-gray-300 rounded w-40"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select a year</option>
            {getYears(2015).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Link href={`/result/${selectedMake}/${selectedYear}`} passHref>
        <button
          className="bg-blue-500 text-white px-20 py-2 rounded disabled:bg-gray-400"
          disabled={!selectedMake || !selectedYear}
        >
          Next
        </button>
      </Link>
    </div>
  );
}
