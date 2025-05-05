"use client"

import Link from "next/link"
import Image from "next/image"
import { Users, ChartBar, Calendar, CheckCircle, UserCheck, QrCode, Clock, Building } from "lucide-react"
import { useState, useEffect } from "react"
import { LoadingBar } from "@/components/loading-bar"

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
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
          <p className="mt-4 text-lg font-semibold text-gray-700">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <LoadingBar />
      
      {/* Hero Section with Success Metrics */}
      <section className="relative bg-cover bg-center h-screen">
        {images.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${image}")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: currentImageIndex === index ? 1 : 0,
            }}
          />
        ))}
        
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Spring Festival 2024 Success Story</h1>
          <p className="text-xl md:text-2xl mb-12 text-center max-w-3xl">
            Transforming Visitor Management with Advanced Technology
          </p>
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">15,000+</div>
              <div className="text-lg">Total Registrations</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-lg">Successful Entries</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">2.5s</div>
              <div className="text-lg">Avg. Verification Time</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">100+</div>
              <div className="text-lg">Institution Groups</div>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Success Section */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: '#F3FCE9' }}>
        <div className="absolute inset-0 opacity-[0.19]">
          <div className="grid grid-cols-8 h-full">
            {[...Array(64)].map((_, i) => (
              <div key={i} className="border border-white bg-white"></div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Implementation Success</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Visitor Management</h3>
              <p className="text-gray-700">Successfully processed over 15,000 visitors with automated verification</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <QrCode className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">QR Integration</h3>
              <p className="text-gray-700">Zero-error rate in QR code scanning and validation</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <Clock className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Processing Time</h3>
              <p className="text-gray-700">Reduced entry verification time from 5 minutes to 2.5 seconds</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <Building className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Institution Management</h3>
              <p className="text-gray-700">Managed 100+ institutions with group registration system</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <UserCheck className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Security Verification</h3>
              <p className="text-gray-700">100% accuracy in visitor verification with AI-based system</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-white">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white flex items-center justify-center">
                <ChartBar className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Real-time Analytics</h3>
              <p className="text-gray-700">Live monitoring and analytics of visitor flow and demographics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Implementation Results */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Previous Implementation Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Registration Statistics</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Total Registrations</span>
                  <span className="font-semibold">15,742</span>
                </li>
                <li className="flex justify-between">
                  <span>Individual Visitors</span>
                  <span className="font-semibold">12,453</span>
                </li>
                <li className="flex justify-between">
                  <span>Group Registrations</span>
                  <span className="font-semibold">3,289</span>
                </li>
                <li className="flex justify-between">
                  <span>Institution Groups</span>
                  <span className="font-semibold">127</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">System Performance</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span>Average Processing Time</span>
                  <span className="font-semibold">2.5 seconds</span>
                </li>
                <li className="flex justify-between">
                  <span>QR Scan Success Rate</span>
                  <span className="font-semibold">99.9%</span>
                </li>
                <li className="flex justify-between">
                  <span>Face Recognition Accuracy</span>
                  <span className="font-semibold">98.5%</span>
                </li>
                <li className="flex justify-between">
                  <span>System Uptime</span>
                  <span className="font-semibold">99.99%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between md:items-center">
            <div className="flex items-center gap-3 brightness-0 invert justify-center md:justify-start">
              <div>
                <Image src="/images/emblem_white.svg" alt="Government Logo" width={40} height={40} className="w-8 md:w-12" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm md:text-lg text-white">राजभवन उत्तराखंड</p>
                <h1 className="text-base md:text-xl text-white font-bold">RAJBHAWAN UTTARAKHAND</h1>
              </div>
            </div>

            <div className="text-center order-3 md:order-2">
              <p className="text-sm md:text-base text-gray-400">&copy; 2025 All rights reserved.</p>
              <p className="text-sm md:text-base text-gray-400">Developed by Uttarakhand Technical University</p>
            </div>

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
    </div>
  );
}
