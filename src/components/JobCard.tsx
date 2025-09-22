"use client";
import React from "react";
import { FaBuilding, FaUser, FaLayerGroup } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";


interface JobCardProps {
  jobTitle: string;
  companyName: string;
  location: string;
  locationType: string;
  experience?: string;
  jobType: string;
  lackPerAnnum: string;
  jobDescription: string;
  requirements: string;
  responsibilities?: string;
  applicationDeadline?: string | null; 
  createdAt?: string | Date;
}


function timeAgo(dateString: string | Date) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = now.getTime() - past.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return years === 1 ? "1 year ago" : `${years} years ago`;
  if (months > 0) return months === 1 ? "1 month ago" : `${months} months ago`;
  if (weeks > 0) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  if (days > 0) return days === 1 ? "1 day ago" : `${days} days ago`;
  if (hours > 0) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  if (minutes > 0) return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  return "Just now";
}

function getDomainFromCompanyName(companyName: string): string {
  // Basic naive way: take last word, make lowercase, add .com
  // You can customize or provide domains in your data for better accuracy
  const parts = companyName.trim().split(" ");
  const lastPart = parts[parts.length - 1].toLowerCase();
  return lastPart + ".com";
}


export const JobCard = ({
  jobTitle,
  companyName,
  location,
  locationType,
  jobType,
  lackPerAnnum,
  experience,
  jobDescription,
  requirements,
  responsibilities,
  applicationDeadline,
  createdAt,
}: JobCardProps) => {
  const domain = getDomainFromCompanyName(companyName);
  const logoUrl = `https://logo.clearbit.com/${domain}`;
  const [imgError, setImgError] = React.useState(false);
  const initials = companyName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);

  return (
    <div className="relative w-[326px] h-[340px] bg-white rounded-xl overflow-hidden shadow-md p-4">
      {/* Company Placeholder */}
      <div className="w-[63px] h-[62px] flex items-center justify-center bg-gray-200 rounded-[13px] overflow-hidden">
        {!imgError ? (
          <img
            src={logoUrl}
            alt={`${companyName} logo`}
            className="object-contain w-full h-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-blue-600 text-white font-bold text-2xl rounded-[13px]">
            {initials}
          </div>
        )}
      </div>

      {/* Job Title */}
      <div className="mt-6 font-bold text-black text-lg">{jobTitle}</div>

      {/* Company with building icon */}
      <div className="flex items-center gap-1 text-gray-500 text-xs">
        <FaBuilding size={12} />
        <span>{companyName}</span>
      </div>

      {/* Info Row with icons */}
      <div className="flex gap-1 mt-4 text-gray-600 text-xs">
        <span className="flex items-center gap-1">
          <FaUser size={12} />
          {experience}
        </span>
        <span> | </span>
        <span className="flex items-center gap-1">
          <MdLocationOn size={14} />
          {location}
        </span>
        <span> | </span>
        <span className="flex items-center gap-1">
          <FaLayerGroup size={12} />
          {lackPerAnnum}
        </span>
      </div>

      {/* Posted Time */}
      <div className="absolute top-4 right-4 bg-blue-100 px-2 py-1 rounded-[4px] text-xs text-black">
        {createdAt ? timeAgo(createdAt) : "Posted Recently"}
      </div>

{/* Description */}
<ul className="mt-4 text-gray-600 text-xs list-disc pl-5 marker:text-gray-600">
  {(jobDescription.length > 80
    ? jobDescription.slice(0, 80) + "..."
    : jobDescription
  )
    .split(". ")
    .filter(Boolean)
    .map((desc, idx) => (
      <li key={idx} className="whitespace-normal leading-snug">
        {desc.trim()}.
      </li>
    ))}
</ul>

{/* Requirements */}
<ul className="mt-2 text-gray-600 text-xs list-disc pl-5 marker:text-gray-600">
  {(requirements.length > 80
    ? requirements.slice(0, 80) + "..."
    : requirements
  )
    .split(". ")
    .filter(Boolean)
    .map((req, idx) => (
      <li key={idx} className="whitespace-normal leading-snug">
        {req.trim()}.
      </li>
    ))}
</ul>


      {/* Apply Button */}
<button
  className="absolute text-xs bottom-4 left-4 w-[284px] text-white font-bold py-3 rounded-[10px] hover:bg-[#008FCC] transition"
  style={{
    background: "#00AAFF",
    border: "1px solid #00AAFF",
  }}
>
  Apply Now
</button>

    </div>
  );
};