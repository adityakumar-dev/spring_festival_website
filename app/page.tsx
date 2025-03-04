"use client"

import Link from "next/link"
import Image from "next/image"
import { Users, ShieldCheck, Calendar, CheckCircle } from "lucide-react"
import { HowItWorks } from "./landing/how-it-works"
import { useState, useEffect } from "react"
import { LoadingBar } from "@/components/loading-bar"
import { GroupRegisterDialog } from '@/components/GroupRegisterDialog'

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const images = [
    '/images/spring_festival/image1.jpg',
    '/images/spring_festival/image2.jpg',
    '/images/spring_festival/image3.jpg',
    '/images/spring_festival/image4.jpg',
    // '/images/spring_festival/image5.jpg',

    // Add all your spring festival images here
  ];

  useEffect(() => {
    // Load all images
    const loadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    // Only set loading to false when images are loaded
    if (imagesLoaded) {
      setIsLoading(false);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading Raj Bhawan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <LoadingBar />
      <header className="w-full relative bg-cover bg-center h-screen">
        {images.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
        <nav className="bg-transparent shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold flex items-center gap-2 mb-4 md:mb-0">
              <div className="flex flex-row items-center gap-2 brightness-0 invert" >
                <Image src="/images/emblem_white.svg" alt="Logo" width={40} height={40} className="w-8 md:w-12" />
                <div className="flex flex-col">
                  <p className="text-sm md:text-lg text-white">राजभवन उत्तराखंड</p>
                  <h1 className="text-lg md:text-2xl text-white font-bold">RAJBHAWAN UTTARAKHAND</h1>
                </div>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Navigation Links */}
            <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 w-full md:w-auto bg-black/50 md:bg-transparent p-4 md:p-0 absolute md:relative top-full left-0 md:top-auto`}>
              <button
                onClick={() => {
                  scrollToSection('how-it-works');
                  setMobileMenuOpen(false);
                }}
                className="text-white font-semibold hover:text-blue-200 transition-colors w-full md:w-auto text-center py-2 md:py-0"
              >
                Guide
              </button>
              <button
                onClick={() => {
                  scrollToSection('features');
                  setMobileMenuOpen(false);
                }}
                className="text-white font-semibold hover:text-blue-200 transition-colors w-full md:w-auto text-center py-2 md:py-0"
              >
                Features
              </button>
              <button
                onClick={() => {
                  scrollToSection('faq');
                  setMobileMenuOpen(false);
                }}
                className="text-white font-semibold hover:text-blue-200 transition-colors w-full md:w-auto text-center py-2 md:py-0"
              >
                FAQ
              </button>
              <Link
                href="/register"
                className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl w-full md:w-auto text-center"
              >
                Register
              </Link>
            </div>
          </div>
        </nav>
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-4 mt-16 md:mt-0">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-2xl md:text-7xl font-bold mb-4 text-white animate-fade-in-down leading-tight">
              RAJ BHAWAN UTTARAKHAND
            </h1>
            <h1 className="text-xl md:text-6xl mb-4 text-white animate-fade-in-down leading-tight">
              SPRING FESTIVAL 2025
            </h1>
            <p className="text-lg md:text-xl mb-8 md:mb-16 text-gray-200 animate-fade-in-up max-w-3xl mx-auto">
              Get ready to celebrate a vibrant season of joy!
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="bg-yellow-600 text-white px-8 md:px-12 py-3 md:py-5 rounded-full text-lg md:text-xl hover:bg-blue-700 transition duration-300 w-full md:w-auto shadow-lg hover:shadow-xl"
              >
                Register Now <span className="ml-2">→</span>
              </Link>
              <Link
                href="/admin"
                className="bg-yellow-600 text-white px-8 md:px-12 py-3 md:py-5 rounded-full text-lg md:text-xl hover:bg-blue-700 transition duration-300 w-full md:w-auto shadow-lg hover:shadow-xl"
              >
                Admin Login <span className="ml-2">→</span>
              </Link>
            </div>

            {/* <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
              <button
                onClick={() => setIsGroupDialogOpen(true)}
                className="bg-yellow-600 text-white px-8 md:px-12 py-3 md:py-5 rounded-full text-lg md:text-xl hover:bg-blue-700 transition duration-300 w-full md:w-auto shadow-lg hover:shadow-xl"
              >
                Register Group/Institute <span className="ml-2">→</span>
              </button>
            </div> */}
          </div>
        </div>
      </header>

      <section id="how-it-works" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#F3FCE9' }}>
        {/* White Tile Background Pattern */}
        <div className="absolute inset-0 opacity-[0.19]">
          <div className="grid grid-cols-8 h-full">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border border-white bg-white"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Register Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Register</h3>
              <p className="text-gray-700 mb-4">Create your account and complete your profile with necessary details for Rajbhawan services</p>
             
            </div>

            {/* Response Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Response</h3>
              <p className="text-gray-700 mb-4">Successfully Reigstered with qr code and email response</p>
              
            </div>

            {/* Verify Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Verify</h3>
              <p className="text-gray-700 mb-4">Scan qr and complete facial recognition along with adhar card </p>
             
            </div>

            {/* Attend Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300 border border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Attend</h3>
              <p className="text-gray-700 mb-4">Enjoy seamless entry and exit with our advanced security system</p>
             
            </div>

          </div>
        </div>
      </section>

      <section id="features" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#F3FCE9' }}>
        {/* White Tile Background Pattern */}
        <div className="absolute inset-0 opacity-[0.19]">
          <div className="grid grid-cols-8 h-full">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border border-white bg-white"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-blue-600 mb-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">QR Code Integration</h3>
              <p className="text-gray-700 mb-4">Unique QR codes for quick and secure event check-ins</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-blue-600 mb-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Email Response</h3>
              <p className="text-gray-700 mb-4">Get email response after registration</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-blue-600 mb-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Facial Recognition</h3>
              <p className="text-gray-700 mb-4">Advanced facial recognition for enhanced security</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-blue-600 mb-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Group Management</h3>
              <p className="text-gray-700 mb-4">Efficient handling of institution groups and admins</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-blue-600 mb-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Adhar Card Integration</h3>
              <p className="text-gray-700 mb-4">Check adhar card details and verify</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-blue-600 mb-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-time Analytics</h3>
              <p className="text-gray-700 mb-4">Instant insights into event attendance and flow</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 relative overflow-hidden" style={{ backgroundColor: '#F3FCE9' }}>
        {/* White Tile Background Pattern */}
        <div className="absolute inset-0 opacity-[0.19]">
          <div className="grid grid-cols-8 h-full">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border border-white bg-white"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>

          {/* Registration FAQs */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Registration Process</h3>
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h4 className="text-lg font-medium text-gray-800 mb-2">How can I register for the event?</h4>
                <p className="text-gray-600">You can register by clicking the "Register Now" button at the top of the page. The registration process is simple and takes only a few minutes to complete.</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Can I modify my registration details after submission?</h4>
                <p className="text-gray-600">No, once submitted, registration details cannot be modified. Please ensure all information is correct before submitting.</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Can I bring a group or family members with a single registration?</h4>
                <p className="text-gray-600">Each visitor must register individually. For institutional groups (schools, colleges, organizations), a designated group leader can complete a single registration on behalf of the entire group.</p>
              </div>
            </div>
          </div>

          {/* Entry & Verification FAQs */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Entry & Verification</h3>
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Do I need to carry an ID proof for entry?</h4>
                <p className="text-gray-600">Yes, a valid Government-issued ID (Aadhaar, Voter ID, Driving License, Passport, organization id card/ school id card) is required for verification at the entry.(However the id card issued by institution is considered as valid)</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h4 className="text-lg font-medium text-gray-800 mb-2">What is the AI-powered visitor verification system?</h4>
                <p className="text-gray-600">Our system uses AI-based identity verification to ensure a secure and seamless entry process. It verifies visitor details and cross-checks with provided documents.</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h4 className="text-lg font-medium text-gray-800 mb-2">How long does verification take at the entry gate?</h4>
                <p className="text-gray-600">The AI-powered verification is quick, taking only a few seconds per visitor please cooperate in your intent.</p>
              </div>
            </div>
          </div>

          {/* General FAQs */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">General Questions</h3>
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Is there an entry fee?</h4>
                <p className="text-gray-600">No, the entry to the event is free. However, registration is mandatory. which can be done before coming to the event or on spot</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h4 className="text-lg font-medium text-gray-800 mb-2">Can I register on the spot at Raj Bhawan?</h4>
                <p className="text-gray-600">Yes, but to avoid inconvenience it is better to pre-register and avoid hassle.</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h4 className="text-lg font-medium text-gray-800 mb-2">I did not receive a confirmation email after registration. What should I do?</h4>
                <p className="text-gray-600">Check your spam/junk folder in mail box. If you still don't receive it, try re-registering or contact by email.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between md:items-center">
            {/* Left section */}
            <div className="flex items-center gap-3 brightness-0 invert justify-center md:justify-start">
              <div>
                <Image src="/images/emblem_white.svg" alt="Government Logo" width={40} height={40} className="w-8 md:w-12" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm md:text-lg text-white">राजभवन उत्तराखंड</p>
                <h1 className="text-base md:text-xl text-white font-bold">RAJBHAWAN UTTARAKHAND</h1>
              </div>
            </div>

            {/* Center section */}
            <div className="text-center order-3 md:order-2">
              <p className="text-sm md:text-base text-gray-400">&copy; 2025 All rights reserved.</p>
              <p className="text-sm md:text-base text-gray-400">Developed by Uttarakhand Technical University</p>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3 justify-center md:justify-end order-2 md:order-3">
              <div className="text-center md:text-right">
                <p className="text-xs md:text-sm text-gray-400">Powered by</p>
                <div className="flex flex-col">
                  <p className="text-sm md:text-lg text-white font-semibold">Veer Madho Singh Bhandari</p>
                  <p className="text-sm md:text-lg text-white font-semibold">Uttarakhand Technical University</p>
                </div>
              </div>
              <Image
                src="/images/utu-logo.png"
                alt="Organization Logo"
                width={60}
                height={60}
                className="w-12 md:w-20 -mt-2 md:mt-0"
              />
            </div>
          </div>
        </div>
      </footer>

      <GroupRegisterDialog 
        isOpen={isGroupDialogOpen}
        onClose={() => setIsGroupDialogOpen(false)}
      />
    </div>
  )
}

