import { FaFacebookF, FaGooglePlusG, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Image from 'next/image'
import React from 'react'
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Footer() {
    return (
        <div className='bg-third px-14 py-6'>
            <div className='flex justify-between items-center pb-6 border-b border-gray-600'>
                <Image
                    src="/logo-2.svg"
                    alt="Umurava logo h-10 w-10"
                    width={40}
                    height={40}
                    priority
                />
                <div className='flex justify-center items-center gap-2'>
                    <div className="bg-white w-7 h-7 rounded-full flex justify-center items-center">
                        <FaFacebookF key="facebook" className="text-third text-sm" />
                    </div>
                    <div className="bg-white w-7 h-7 rounded-full flex justify-center items-center">
                        <FaGooglePlusG key="google" className="text-third text-sm" />
                    </div>
                    <div className="bg-white w-7 h-7 rounded-full flex justify-center items-center">
                        <FaLinkedinIn key="linkedin" className="text-third text-sm" />
                    </div>
                    <div className="bg-white w-7 h-7 rounded-full flex justify-center items-center">
                        <FaYoutube key="youtube" className="text-third text-sm" />
                    </div>
                </div>
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-auto py-6 border-b border-gray-600">
                <div className="flex flex-col gap-4">
                    <h2 className="text-white font-semibold">Our Address</h2>
                    <div className="flex items-center gap-2">
                        <Mail className="text-white w-3 h-3" />
                        <span className="text-xs font-thin text-gray-300">career@tickets.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="text-white w-3 h-3" />
                        <span className="text-xs font-thin text-gray-300">89 KG 14 Ave, Kigali</span>
                    </div>
                    <div className="flex items-end gap-2">
                        <Phone className="text-white w-3 h-3" />
                        <span className="text-xs font-thin text-gray-300">+250 700 000</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-white font-semibold">Quick Links</h2>
                    <Link href="#" className="text-xs font-thin text-gray-300">Home</Link>
                    <Link href="#" className="text-xs font-thin text-gray-300">Challenge & Hackathons</Link>
                    <Link href="#" className="text-xs font-thin text-gray-300">For Eductional Institutions</Link>
                    <Link href="#" className="text-xs font-thin text-gray-300">About Us</Link>
                    <Link href="#" className="text-xs font-thin text-gray-300">Contact Us</Link>
                </div>
                <div className="flex flex-col gap-4 w-72">
                    <h2 className="text-white font-semibold">Join our newsletter to keep up to date with us!</h2>
                    <div className="bg-white h-fit flex items-center p-1 pl-3 space-x-1 rounded-md">
                        <input className="h-8 w-full outline-none ring-0 focus:ring-0 focus:outline-none text-xs" type="email" name="email" id="email" placeholder="Email" />
                        <Button className="bg-primary text-xs text-white">Get Started</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 pt-4 text-gray-300 text-xs font-thin">
                <p>Copyright © All Rights Reserved SawaPay {new Date().getFullYear()}.</p>
                <p>Privacy Policy  | Terms and Conditions</p>
            </div>
        </div>
    )
}

export default Footer