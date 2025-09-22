"use client";

import React, { useState } from "react";

interface CreateJobFormProps {
  onClose: () => void;
  refreshJobs: () => Promise<void>;
}

export default function CreateJobForm({ onClose, refreshJobs }: CreateJobFormProps) {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    locationType: "ONSITE",
    jobType: "FULL_TIME",
    lackPerAnnum: "",
    experience: "",
    jobDescription: "",
    requirements: "",
    responsibilities: "",
    applicationDeadline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          applicationDeadline: new Date(formData.applicationDeadline), // Convert string to Date
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create job");
      }

      console.log("Job created successfully!");
      await refreshJobs(); // ✅ reload jobs list

      onClose(); // close modal after success
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg w-[848px] h-[779px] flex flex-col overflow-hidden"
      >
        {/* Scrollable content */}
        <div
          className="p-6 flex-1 overflow-y-auto rounded-2xl"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 transparent",
          }}
        >
          <style jsx>{`
            /* Thin custom scrollbar for WebKit browsers */
            div::-webkit-scrollbar {
              width: 4px;
            }
            div::-webkit-scrollbar-track {
              background: transparent;
            }
            div::-webkit-scrollbar-thumb {
              background-color: #cbd5e1;
              border-radius: 20px;
            }
            div::-webkit-scrollbar-thumb:hover {
              background-color: #94a3b8;
            }
          `}</style>

          <h2 className="text-xl flex justify-center font-semibold mb-10 mt-5">
            Create Job Opening
          </h2>

          
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black"
          >
            ✕
          </button>

          {/* Job Title & Company Name side by side */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium mb-1">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Full Stack Developer"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Amazon, Microsoft, Swiggy"
                className="w-full border border-gray-200 text-xs rounded-xl px-3 py-2"
              />
            </div>
          </div>


          {/* Location & Location Type */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Bangalore"
                className="w-full border border-gray-200 text-xs rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Location Type
              </label>
              <select
                name="locationType"
                value={formData.locationType}
                onChange={handleChange}
                className="w-full border border-gray-200 text-xs rounded-xl px-3 py-2"
              >
                <option value="ONSITE">Onsite</option>
                <option value="REMOTE">Remote</option>
                <option value="HYBRID">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Job Type & Salary */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-xs font-medium mb-1">Job Type</label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border border-gray-200 text-xs rounded-xl px-3 py-2"
              >
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
                <option value="INTERNSHIP">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1">
                Salary (in LPA)
              </label>
              <input
                type="text"
                name="lackPerAnnum"
                value={formData.lackPerAnnum}
                onChange={handleChange}
                placeholder="12"
                className="w-full border border-gray-200 text-xs rounded-xl px-3 py-2"
              />
            </div>
          </div>

          {/* Experience */}
          <div className="mb-6">
            <label className="block text-xs font-medium mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="2-4 years"
              className="w-full text-xs border border-gray-200 rounded-xl px-3 py-2"
            />
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <label className="block text-xs font-medium mb-1">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Describe the role..."
              rows={3}
              className="w-full border border-gray-200 text-xs rounded-xl px-3 py-2"
            />
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <label className="block text-xs font-medium mb-1">Requirements</label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="List requirements..."
              rows={3}
              className="w-full border border-gray-200 text-xs rounded-xl px-3 py-2"
            />
          </div>

          {/* Responsibilities */}
          <div className="mb-6">
            <label className="block text-xs font-medium mb-1">
              Responsibilities
            </label>
            <textarea
              name="responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
              placeholder="List responsibilities..."
              rows={3}
              className="w-full border border-gray-200 text-xs rounded-xl px-3 py-2"
            />
          </div>

          {/* Application Deadline */}
          <div className="mb-6">
            <label className="block text-xs font-medium mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="w-full border border-gray-200 text-xs rounded-xl px-3 py-2"
            />
          </div>
        </div>

        {/* Fixed footer */}
        <div className="px-6 py-4 flex text-xs justify-between bg-white rounded-b-2xl">
          <button
            type="button"
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Publish »
          </button>
        </div>
      </form>
    </div>
  );
}
