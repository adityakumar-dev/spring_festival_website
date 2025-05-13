"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { LoadingBar } from "@/components/loading-bar"

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const images = [
    '/images/spring_festival/image1.jpg',
    '/images/spring_festival/image2.jpg',
    '/images/spring_festival/image3.jpg',
    '/images/spring_festival/image4.jpg',
  ];

  useEffect(() => {
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
    if (imagesLoaded) {
      setIsLoading(false);
    }
  }, [imagesLoaded]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
          <div
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/rajhbhawan.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        
        
        {/* New Modern Navigation Bar */}
        <nav className="bg-black/30 backdrop-blur-md shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <Image src="/images/emblem_white.svg" alt="Logo" width={40} height={40} className="w-10 h-10 brightness-0 invert" />
                <div className="flex flex-col">
                  <p className="text-sm text-white">राजभवन उत्तराखंड</p>
                  <h1 className="text-lg text-white font-bold">RAJBHAWAN UTTARAKHAND</h1>
                  <p className="text-xs text-yellow-400">Visitor & Entry Management System</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/about" className="text-white hover:text-yellow-400 transition-colors">About</Link>
                <Link href="/features" className="text-white hover:text-yellow-400 transition-colors">Features</Link>
                {/* <Link href="/events" className="text-white hover:text-yellow-400 transition-colors">Events</Link>
                <Link href="/gallery" className="text-white hover:text-yellow-400 transition-colors">Gallery</Link> */}
                <Link href="/vasontutsav2025" className="text-white hover:text-yellow-400 transition-colors">Past Events</Link>
                <Link href="/register" className="text-white hover:text-yellow-400 transition-colors">Temporary Registration</Link>
                {/* <Link href="/login" className="text-white hover:text-yellow-400 transition-colors">Login</Link> */}
                {/* <Link href="/register" className="bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-500 transition duration-300"> */}
                  {/* Register Now */}
                {/* </Link> */}
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pb-4 space-y-4">
                <Link href="/about" className="block text-white hover:text-yellow-400 transition-colors">About</Link>
                <Link href="/features" className="block text-white hover:text-yellow-400 transition-colors">Features</Link>
                {/* <Link href="/events" className="block text-white hover:text-yellow-400 transition-colors">Events</Link>
                <Link href="/gallery" className="block text-white hover:text-yellow-400 transition-colors">Gallery</Link> */}
                <Link href="/vasontutsav2025" className="block text-white hover:text-yellow-400 transition-colors">Past Events</Link>
                <Link href="/contact" className="block text-white hover:text-yellow-400 transition-colors">Contact</Link>
                {/* <Link href="/login" className="block text-white hover:text-yellow-400 transition-colors">Login</Link>
                <Link href="/register" className="block bg-yellow-600 text-white px-6 py-2 rounded-full hover:bg-yellow-500 transition duration-300 text-center">
                  Register Now
                </Link> */}
              </div>
            )}
          </div>
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-4">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-7xl font-bold mb-4 text-white animate-fade-in-down leading-tight">
              RAJ BHAWAN UTTARAKHAND
            </h1>
            <h2 className="text-2xl md:text-6xl mb-6 text-white animate-fade-in-down leading-tight">
              VISITOR & ENTRY MANAGEMENT SYSTEM
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-200 animate-fade-in-up max-w-3xl mx-auto">
              Experience the vibrant celebration of culture, tradition, and joy at the most prestigious event of Uttarakhand
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {/* <Link
                href="/register"
                className="bg-yellow-600 text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-lg md:text-xl hover:bg-yellow-500 transition duration-300 w-full md:w-auto shadow-lg hover:shadow-xl"
              >
                Register Now <span className="ml-2">→</span>
              </Link> */}
              <Link
                href="/vasontutsav2025"
                className="bg-transparent border-2 border-white text-white px-8 md:px-12 py-3 md:py-4 rounded-full text-lg md:text-xl hover:bg-white/10 transition duration-300 w-full md:w-auto"
              >
                Explore Spring Festival 2025
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 brightness-0 invert mb-4 md:mb-0">
              <Image src="/images/emblem_white.svg" alt="Government Logo" width={40} height={40} className="w-8 md:w-12" />
              <div className="flex flex-col">
                <p className="text-sm md:text-lg text-white">राजभवन उत्तराखंड</p>
                <h1 className="text-base md:text-xl text-white font-bold">RAJBHAWAN UTTARAKHAND</h1>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">&copy; 2025 All rights reserved.</p>
              <p className="text-sm text-gray-400">Developed by Uttarakhand Technical University</p>
              <div>
                <Link href="https://github.com/adityakumar-dev" className="text-white hover:text-yellow-400 transition-colors">Credits : adityakumar-dev</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

