"use client";
import React from "react";
import { FiSearch, FiMapPin, FiUsers } from "react-icons/fi";
import { Range } from "react-range";

interface SearchNavbarProps {
  filters: {
    search: string;
    location: string;
    jobType: string;
    salary: number[];
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export default function SearchNavbar({ filters, setFilters }: SearchNavbarProps) {
  const STEP = 5000;
  const MIN = 5000;
  const MAX = 900000;

  return (
    <div className="bg-white shadow-sm h-45 flex items-end pb-3">
      <div className="max-w-7xl mx-auto flex items-center py-4 px-6 gap-6 text-gray-700 w-full">
        
        {/* Search Input */}
        <div className="flex items-center gap-2 w-64">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            value={filters.search}
            onChange={(e) => setFilters((f: any) => ({ ...f, search: e.target.value }))}
            className="outline-none w-full text-sm"
          />
        </div>
        <div className="h-6 w-px bg-gray-300"></div>

        {/* Preferred Location */}
        <div className="flex items-center gap-2 w-48">
          <FiMapPin size={18} />
          <select 
            value={filters.location}
            onChange={(e) => setFilters((f: any) => ({ ...f, location: e.target.value }))}
            className="outline-none w-full bg-transparent text-sm"
          >
            <option value="">Preferred Location</option>
            <option>Bangalore</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Remote</option>
          </select>
        </div>
        <div className="h-6 w-px bg-gray-300"></div>

        {/* Job Type */}
        <div className="flex items-center gap-2 w-40">
          <FiUsers size={18} />
          <select 
            value={filters.jobType}
            onChange={(e) => setFilters((f: any) => ({ ...f, jobType: e.target.value }))}
            className="outline-none w-full bg-transparent text-sm"
          >
            <option value="">Job type</option>
            <option>Full_Time</option>
            <option>Part_Time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>
        <div className="h-6 w-px bg-gray-300"></div>

        {/* Salary Slider */}
        <div className="flex items-center gap-3 flex-1">
          <div className="text-sm">Salary Per Month</div>
          <div className="text-sm text-gray-500">
            ₹{(filters.salary[0] / 1000).toFixed(0)}k - ₹{(filters.salary[1] / 1000).toFixed(0)}k
          </div>
          <div className="flex-1 px-4">
            <Range
              step={STEP}
              min={MIN}
              max={MAX}
              values={filters.salary}
              onChange={(values) => setFilters((f: any) => ({ ...f, salary: values }))}
              renderTrack={({ props, children }) => (
                <div
                  {...props} // ✅ no key destructuring
                  className="h-1 w-full rounded"
                  style={{
                    background: `linear-gradient(
                      to right,
                      #d1d5db ${(filters.salary[0] - MIN) / (MAX - MIN) * 100}%,
                      black ${(filters.salary[0] - MIN) / (MAX - MIN) * 100}%,
                      black ${(filters.salary[1] - MIN) / (MAX - MIN) * 100}%,
                      #d1d5db ${(filters.salary[1] - MIN) / (MAX - MIN) * 100}%
                    )`
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props} // ✅ no key destructuring
                  className="h-4 w-4 bg-black rounded-full cursor-pointer"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
