"use client";

import { useState, useEffect } from "react";
import MainNavbar from "@/components/MainNavbar";
import SearchNavbar from "@/components/SearchNavbar";
import { JobCard } from "@/components/JobCard";
import CreateJobForm from "@/components/CreateJobForm";

export default function Page() {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
    salary: [5000, 900000], // monthly salary range
  });

  // fetch all jobs from API
  const fetchJobs = async () => {
    const res = await fetch("/api/jobs", { cache: "no-store" });
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // local filtering
  const filteredJobs = jobs.filter((job) => {
    // search filter
    const matchesSearch =
      filters.search === "" ||
      job.jobTitle.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(filters.search.toLowerCase());

    // location filter
    const matchesLocation =
      filters.location === "" ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    // job type filter
    const matchesJobType =
      filters.jobType === "" ||
      job.jobType.toLowerCase() === filters.jobType.toLowerCase();

    // salary filter
    let jobSalary = 0;
    if (typeof job.lackPerAnnum === "string") {
      // extract number from "9 LPA"
      const match = job.lackPerAnnum.match(/(\d+(\.\d+)?)/);
      if (match) {
        jobSalary = parseFloat(match[1]) * 100000; // convert LPA → INR/year
      }
    } else if (typeof job.lackPerAnnum === "number") {
      jobSalary = job.lackPerAnnum;
    }

    // convert monthly filter to yearly range
    const minYearly = filters.salary[0] * 12;
    const maxYearly = filters.salary[1] * 12;

    const matchesSalary = jobSalary >= minYearly && jobSalary <= maxYearly;

    return matchesSearch && matchesLocation && matchesJobType && matchesSalary;
  });

  return (
    <>
      <MainNavbar onCreateJobClick={() => setShowForm(true)} />

      <SearchNavbar filters={filters} setFilters={setFilters} />

      <main className="p-6 flex flex-wrap justify-center gap-6 mt-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} {...job} />)
        ) : (
          <div className="text-gray-500">No jobs found</div>
        )}
      </main>

      {showForm && (
        <CreateJobForm
          onClose={() => setShowForm(false)}
          refreshJobs={fetchJobs}
        />
      )}
    </>
  );
}
