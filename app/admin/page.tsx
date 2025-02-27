"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { api } from "@/services/api";

interface AdminCredentials {
  username: string;
  password: string;
}

interface AppUser {
  username: string;
  password: string;
  user_password: string;
  name: string;
  email: string;
  unique_id_type: string;
  unique_id: string;
  photo: File | null;
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<AdminCredentials & AppUser>({
    username: "",
    password: "",
    user_password: "",
    name: "",
    email: "",
    unique_id_type: "aadhar",
    unique_id: "",
    photo: null,
  });

  useEffect(() => {
    console.log('Form data changed:', {
      ...formData,
      photo: formData.photo ? 'File selected' : 'No file'
    });
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files[0]) {
        setFormData(prev => ({
          ...prev,
          photo: fileInput.files![0]
        }));
      }
      return;
    }

    // For all other inputs, directly update the state
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if(formData.photo == null){
        alert("Please upload a profile photo")
        return;
      }
      console.log("Form data : ", formData)
      const response = await api.createAppUser({
        admin_name: formData.username,
        admin_password: formData.password,
        user_name: formData.name,
        user_password: formData.user_password,
        user_email: formData.email,
        // aadhar_number: formData.unique_id,
        'unique_id_type': formData.unique_id_type,
        'unique_id': formData.unique_id,
        profile_picture: formData.photo
      });

      if(response === true) {
        alert("Registration successful");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed : " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if(isLoading){
      return <Spinner />
    }
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Admin Credentials</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">User Password</label>
                <input
                  type="password"
                  name="user_password"
                  value={formData.user_password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                  placeholder="Enter User Password"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">ID Type</label>
                <select
                  name="unique_id_type"
                  value={formData.unique_id_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                  required
                >
                  <option value="aadhar">Aadhar</option>
                  <option value="pan">PAN</option>
                  <option value="driving_license">Driving License</option>
                  <option value="passport">Passport</option>
                  <option value="voter_id">Voter ID</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">ID Number</label>
                <input
                  type="text"
                  name="unique_id"
                  value={formData.unique_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                  placeholder={`Enter your ${formData.unique_id_type.replace('_', ' ').toUpperCase()} number`}
                  maxLength={formData.unique_id_type === 'aadhar' ? 12 : undefined}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Profile Photo</label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">Confirm Registration</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Please review your information before submitting.</p>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors disabled:bg-yellow-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    <span className="ml-2">Registering...</span>
                  </>
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-12">
      <div className="container mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex-1 h-2 rounded-full mx-2 ${
                    stepNumber <= step ? "bg-yellow-600" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm">
              <span className={step >= 1 ? "text-yellow-600" : "text-gray-400"}>
                Admin Credentials
              </span>
              <span className={step >= 2 ? "text-yellow-600" : "text-gray-400"}>
                Personal Info
              </span>
              <span className={step >= 3 ? "text-yellow-600" : "text-gray-400"}>
                Confirm
              </span>
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => {
                  formData.photo = null;
                  setStep(step - 1);
                }}
                className="flex items-center text-yellow-600 hover:text-yellow-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
            )}
            {step < 3 && (
              <button
                onClick={() => {
                  if(step == 1){
                    setIsLoading(true)
                    try{
                      api.verifyAdmin(formData.username, formData.password).then((res) => {
                        if(res){
                          setStep(step + 1)
                        }else{
                          alert("Invalid admin credentials")
                        }
                      })
                    }catch(e){
                      console.log(e)
                      alert("Invalid admin credentials")
                    }finally{
                      setIsLoading(false)
                    }
                  }
                  if(step == 2){
                    console.log(formData.photo)
                    console.log("Formdata : ", formData.photo == null)
                    if(formData.photo == null){
                      alert("Please upload a profile photo")
                      return;
                    }
                    setStep(step + 1)
                  }
                  if(step == 3){
                  }
                }}
                className="ml-auto flex items-center bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


