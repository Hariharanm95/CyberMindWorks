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
      <div className="max-w-7xl mx-auto flex items-center py-4 px-6 gap-6 w-full ">

        {/* Search Input */}
        <div className="flex items-center gap-2 w-[334px] text-[#686868]">
          <FiSearch size={18} />
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            value={filters.search}
            onChange={(e) => setFilters((f: any) => ({ ...f, search: e.target.value }))}
            className="outline-none w-full text-xs text-[#686868]"
          />
        </div>
        <div className="h-6 w-px bg-gray-300"></div>

        {/* Preferred Location */}
        <div className="flex items-center gap-2 w-[334px] text-[#686868]">
          <FiMapPin size={18} />
          <select 
            value={filters.location}
            onChange={(e) => setFilters((f: any) => ({ ...f, location: e.target.value }))}
            className="outline-none w-full bg-transparent text-xs text-[#686868]"
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
        <div className="flex items-center gap-2 w-[334px] text-[#686868]">
          <FiUsers size={18} />
          <select 
            value={filters.jobType}
            onChange={(e) => setFilters((f: any) => ({ ...f, jobType: e.target.value }))}
            className="outline-none w-full bg-transparent text-xs text-[#686868]"
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
        <div className="w-[248.5px]">
          {/* Label + Values side by side */}
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-black">Salary Per Month</div>
            <div className="text-xs text-black">
              ₹{(filters.salary[0] / 1000).toFixed(0)}k - ₹{(filters.salary[1] / 1000).toFixed(0)}k
            </div>
          </div>

          {/* Fixed width Range bar */}
          <div style={{ width: "248.5px" }}>
            <Range
              step={STEP}
              min={MIN}
              max={MAX}
              values={filters.salary}
              onChange={(values) => setFilters((f: any) => ({ ...f, salary: values }))}
              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  className="h-0.5 rounded"
                  style={{
                    width: "100%",
                    background: `linear-gradient(
                      to right,
                      #d1d5db ${(filters.salary[0] - MIN) / (MAX - MIN) * 100}%,
                      black ${(filters.salary[0] - MIN) / (MAX - MIN) * 100}%,
                      black ${(filters.salary[1] - MIN) / (MAX - MIN) * 100}%,
                      #d1d5db ${(filters.salary[1] - MIN) / (MAX - MIN) * 100}%
                    )`,
                  }}
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => {
                  const { key, ...rest } = props;
                  return (
                    <div
                      key={key}
                      {...rest}
                      className="h-3 w-3 bg-white border-4 border-black rounded-full cursor-pointer"
                    />
                  );
                }}

            />
          </div>
        </div>

      </div>
    </div>
  );
}
