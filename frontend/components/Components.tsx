"use client"; // Needed if using Next.js App Router (app directory)

import { ChevronDown, FileText, MoveLeft, MoveUp } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setRole, type AuthState } from "@/lib/features/authentication/authSlice";
import { formatTitle } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Image from "next/image";

const role = localStorage.getItem("role");

export const ChallengeButton = ({ id, title }: { id: string; title: string }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const formattedTitle = formatTitle(title);
  const href = `/${role}/challenges/${id}/${formattedTitle}`;

  return (
    <Button className="bg-primary text-white text-xs py-0">
      <Link href={href}>View Challenge</Link>
    </Button>
  );
};


export const GoBackButton = () => {
  const router = useRouter();

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => router.back()}
    >
      <button
        className="p-1.5 border w-fit border-gray-200 rounded-lg flex items-center gap-2 hover:border-primary transition"
      >
        <MoveLeft className="w-3 h-3 text-gray-600" />
      </button>
      <p className='text-gray-600 mr-2'>Go Back</p>
    </div>
  );
};

export const StepIndicator = ({ number, text }: { number: number; text: string }) => {
  return (
    <div className="flex items-center gap-2">
      <p className="w-8 h-8 bg-primary text-white font-bold rounded-full border border-black flex items-center justify-center">
        {number}
      </p>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
};

export const MetricCard = ({ title, amount }: { title: string; amount: number }) => {
  return (
    <div className="bg-white flex justify-between items-center w-full border border-gray-200 rounded-md py-6 px-3">
      {/* Left Section */}
      <div className="flex text-sm gap-2">
        <div className="w-1 bg-primary rounded-lg"></div>
        <div>
          <p className="text-gray-600">{title}</p>
          <p className="font-bold">{amount}</p>
        </div>
      </div>

      {/* Right Section - Icon */}
      <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-2">
        <FileText className="text-primary h-5 w-5" />
      </div>
    </div>
  );
};

// Modify AdminMetricCard to accept the icon component directly
export const AdminMetricCard = ({
  title,
  amount,
  rate,
  defaultTime,
  className,
  icon: Icon, // The icon is now a component, not a string
}: {
  title: string;
  amount: number;
  rate: number;
  defaultTime: string;
  className?: string;
  icon: React.ElementType; // This will accept a React component
}) => {
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  const handleSelect = (item: string) => {
    setSelectedTime(item);
  };

  return (
    <div className={`bg-white w-full border border-gray-200 rounded-md pt-2 pb-6 px-4 ${className}`}>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex text-xs items-center ml-auto">
          {selectedTime}
          <ChevronDown className="ml-2 h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Time</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleSelect("This Week")}>This Week</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("Last 7 Days")}>Last 7 Days</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("Last 30 Days")}>Last 30 Days</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("Last 6 Months")}>Last 6 Months</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSelect("Last 12 Months")}>Last 12 Months</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="flex items-center text-xs gap-4 mt-2">
        {/* Right Section - Icon */}
        <div className="bg-blue-100 flex justify-center items-center rounded-full w-fit p-2">
          <Icon className="text-primary h-5 w-5" /> {/* Render the passed icon */}
        </div>

        {/* Left Section */}
        <div className="flex flex-col gap-1.5">
          <p className="text-gray-600">{title}</p>
          <div className="flex items-center gap-2">
            <p className="font-bold">{amount}</p>
            <p className="bg-blue-100 flex items-center text-[0.6rem] text-blue-600 px-1 rounded-full">
              <MoveUp className="h-2.5 w-2.5" />
              {rate}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export const FilterTab = ({ tab, label, count }: { tab: string; label: string; count: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTab = searchParams.get("tab") || "all";
  const isActive = currentTab === tab;

  const handleClick = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", tab);
    router.push(`/${role}/challenges?${newParams.toString()}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-fit flex items-center gap-2 text-xs border rounded-md p-2 transition ${isActive ? "bg-blue-100 border-[#FCD2C2]" : "bg-gray-100  border-gray-200"
        }`}
    >
      <FileText className="text-gray-400 h-4 w-4" />
      <p>{label}</p>
      <p className={`${isActive ? "bg-primary text-white" : "bg-gray-200"} rounded-full px-2`}>{count}</p>
    </button>
  );
};

export const ParticipantListItem = ({ name, speciality, image }: { name: string; speciality: string; image: string }) => {
  return (
    <div className="flex items-center gap-2 p-4 border-y border-gray-200">
      <div className="relative">
        <Image className="bg-gray-800 w-9 h-9 rounded-full object-cover" src={image} alt="profile" height={100} width={100} />
        <span className="bottom-0 left-6 absolute w-2.5 h-2.5 bg-[#04802E] rounded-full"></span>
      </div>
      <div className="text-xs">
        <p className='font-bold'>{name}</p>
        <p className='text-gray-600'>{speciality}</p>
      </div>
    </div>
  );
};