"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Mail,
  CreditCard,
  Building,
  UserCheck,
  CheckCircle,
  Download,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { api, RegisterData, url } from "@/services/api";
import { Spinner } from "@/components/ui/spinner";
import router, { useRouter } from "next/router";
import LoadingOverlay from "@/components/LoadingOverlay";

interface Institution {
  institution_id: number;
  name: string;
  created_at: string;
}

interface InstitutionAdmin {
  id: string;
  name: string;
  institutionId: string;
}

interface RegistrationResponse {
  user_id: string;
  name: string;
  email: string;
  qr_code: string;
  image_path: string;
  visitor_card_path: string;
  visitor_card: {
    path: string;
    url: string;
    generated_at: string;
  };
  is_student: boolean;
  is_instructor: boolean;
  institution_id: string;
  unique_id_type: string;
  unique_id: string;
}

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [institutionAdmins, setInstitutionAdmins] = useState<
    InstitutionAdmin[]
  >([]);
  const [selectedInstitution, setSelectedInstitution] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id_type: "",
    groupSize: "",
    idType: "aadhar",
    userType: "individual", // "individual", "institution_admin", "institution_student"
    institutionName: "",
    institutionId: "",
    photo: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [isLoadingOverlayOpen, setIsLoadingOverlayOpen] = useState(false);
  const [institution, setInstitution] = useState<Institution[]>([]);
  const [registrationData, setRegistrationData] = useState<RegistrationResponse | null>(null);
  const [groupSize, setGroupSize] = useState<number | "">(""); // Number of people in the group

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);


      // Ensure photo is not null before proceeding
      if (!formData.photo) {
        alert("Please upload a valid profile photo.");
        setIsSubmitting(false);
        setIsLoadingOverlayOpen(false);
        return;
      }
      if(formData.idType == ""){
        alert("Please select a valid id type");
        setIsSubmitting(false);
        setIsLoadingOverlayOpen(false);
        return;
      }
      if(formData.id_type == ""){
        alert("Please enter a valid id number");
        setIsSubmitting(false);
        setIsLoadingOverlayOpen(false);
        return;
      }
      if(formData.firstName == ""){
        alert("Please enter a valid first name");
          setIsSubmitting(false);
        setIsLoadingOverlayOpen(false);
        return;
      }
      if(formData.email == ""){
        alert("Please enter a valid email");
        setIsSubmitting(false);
        setIsLoadingOverlayOpen(false);
        return;
      }
      
      
      setIsLoadingOverlayOpen(true);
    setLoadingMessage("Checking email...");
    try {
      // Check email
      // let registerData = {};

      const emailResponse = await api.validateEmail(formData.email);
      if (emailResponse["exists"]) {
        alert("This email is already registered. Please use a different email.");
        return;
      }
      if(formData.userType === "instructor"){
      setLoadingMessage("Registering institution...");
      const groupResponse = await api.registerGroup({
        name: formData.institutionName,
        group_size: Number(formData.groupSize),
      });
      // registerData.institution_id = groupResponse.institution.id;
      if (!groupResponse) {
        alert("Failed to register group");
        return;
      }
      setLoadingMessage("Registering user...");
      const registerData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        userType: formData.userType as "individual" | "instructor",
        photo: formData.photo,
        unique_id_type: formData.idType,
        unique_id: formData.id_type,
        institution_id: groupResponse.institution.id,
        institutionName: formData.institutionName,
        groupSize: groupSize !== "" ? groupSize : undefined,
      };
     await api.register(registerData);
      alert("Registration successful!");
    }

   
      if(formData.userType === "individual"){
        // Proceed to register user
        setLoadingMessage("Registering user...");
      const registerData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        userType: formData.userType as "individual" | "instructor",
        photo: formData.photo,
        unique_id_type: formData.idType,
        unique_id: formData.id_type,
        institutionName: formData.institutionName,
        groupSize: groupSize !== "" ? groupSize : undefined,
      };
     await api.register(registerData);
      alert("Registration successful!");
    }
     

    } catch (error) {
      console.error("Registration failed:", error);
      alert(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
      setIsLoadingOverlayOpen(false);
    }
    setIsLoading(false);
    setIsSubmitting(false);
    setIsLoadingOverlayOpen(false);
  };

  const renderStep = () => {
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold">Spring Festival 2025 Registration Form</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
              placeholder="Enter first name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
              placeholder="Enter last name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
            placeholder="Enter email"
          />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700">
            ID Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
            {["aadhar", "pan", "driving_license", "passport", "voter_id"].map((type) => (
              <div
                key={type}
                className={`flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all ${
                  formData.idType === type
                    ? "bg-yellow-100 border-2 border-yellow-600"
                    : "bg-gray-50 border-2 border-transparent hover:bg-yellow-50"
                }`}
                onClick={() => setFormData({ ...formData, idType: type, id_type: "" })}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="idType"
                  value={type}
                  checked={formData.idType === type}
                  onChange={() => {}}
                />
                <label className="cursor-pointer capitalize">
                  {type.replace("_", " ")}
                </label>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {formData.idType.replace("_", " ").charAt(0).toUpperCase() + 
               formData.idType.replace("_", " ").slice(1)} Number
            </label>
            <div className="relative">
              <input
                name="id_type"
                value={formData.id_type}
                maxLength={
                  formData.idType === "aadhar" ? 12 :
                  formData.idType === "pan" ? 10 :
                  formData.idType === "passport" ? 8 :
                  formData.idType === "voter_id" ? 10 : 15
                }
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                placeholder={`Enter ${formData.idType.replace("_", " ")} number`}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">
                Select User Type
              </label>
              <Select
                name="userType"
                value={formData.userType}
                onValueChange={(value) =>
                  setFormData({ ...formData, userType: value })
                }
              >
                <SelectTrigger>
                  {formData.userType === "individual"
                    ? "Individual"
                    : formData.userType === "instructor"
                    ? "Group Leader"
                   
                    : "Select user type"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="instructor">Group Leader</SelectItem>
                </SelectContent>
              </Select>

              {(
                formData.userType === "instructor") && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Institution /Organization Name (Please always use unique group name )
                    </label>
                    <input
                      type="text"
                      value={formData.institutionName}
                      onChange={(e) =>
                        setFormData({ ...formData, institutionName: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                      placeholder="Enter institution name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Number of People in Group
                    </label>
                    <input
                      type="number"
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
                      placeholder="Enter number of people"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Profile Photo
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-yellow-200 focus:border-yellow-400"
              />
            </div>
            <div>
              <p>
               NOTE : "Please upload valid and latest profile picture"
              </p>
            </div>
            <div>
              <p>NOTE : "If your registration failed please switch to chrome browser or device and try again"</p>
            </div>
        {/* <div className="flex items-center justify-center">
          <h2 className="text-xl sm:text-sm font-semibold "></h2>
        </div> */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-yellow-600 text-white px-6 py-3 rounde-lg hover:bg-yellow-700 transition-colors disabled:bg-yellow-400 disabled:cursor-not-allowed flex items-center justify-center"
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
            {api.latest_visitor_card && (
            <div className="mt-4">
              <Link 
                href={api.base(api.latest_visitor_card)} 
                className="w-full flex items-center justify-center gap-2 bg-yellow-100 text-yellow-600 px-6 py-3 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Your Entry Pass
              </Link>
            </div>
            )}

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-6 sm:py-12">
      <LoadingOverlay isOpen={isLoadingOverlayOpen} message={loadingMessage} />
      <div className="container mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-4 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8">
          {renderStep()}

          {/* <div className="flex justify-between mt-6 sm:mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center text-yellow-600 hover:text-yellow-700 text-sm sm:text-base"
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Previous
              </button>
            )}
              {step < 3 ? (
                <button
                  onClick={async () => {
                    if(step === 1){
                      setIsLoading(true);

                      if(formData.email == ""){
                        alert("Please enter your email");
                        setIsLoading(false);
                        return;
                      }
                      if(formData.id_type == ""){
                        alert("Please enter your id number");
                        setIsLoading(false);
                        return;
                      }
                      if(formData.firstName == ""){
                        alert("Please enter your first name");
                        setIsLoading(false);
                        return;
                      }
                    var res = await api.validateEmail(formData.email);
                    console.log(res);
                    if(!res['exists']){
                      // setFormData({ ...formData, email: res.email });
                      setIsLoading(false);
                      setStep(step + 1);
                    }else{
                      alert("Please enter a valid email");
                      setIsLoading(false);
                      return;
                    }
                      
                    }
                    else if (step === 2) {
                      if (formData.userType === "instructor") {
                        setIsLoading(true);
                    
                        if (!formData.institutionName) {
                          alert("Please enter the institution name");
                          setIsLoading(false);
                          return;
                        }
                        if (Number(groupSize) <= 0) {
                          alert("Please enter a valid number of people in the group");
                          setIsLoading(false);
                          return;
                        }
                        
                        alert("Registering group with : " + formData.institutionName + " and " + groupSize + " people");
                        // Register the group first
                        const response = await api.registerGroup({
                          name: formData.institutionName,
                          group_size: Number(groupSize),
                        });
                        try{
                          console.log(response);
                          const id = response.institution.id;
                          setFormData({ ...formData, institutionId: id });
                          if(id){
                            setStep(step + 1);
                          }
                        setIsLoading(false);
                      if (!response) {
                        alert("Failed to register group");
                        return;
                      }
                      }catch(error){
                        console.error("Registration failed:", error);
                        alert(error instanceof Error ? error.message : "Registration failed");
                      }
                      setIsLoading(false);
                    }
                  }

                  // Proceed to the next step
                  // setStep(step + 1);
                }}
                className="ml-auto flex items-center bg-yellow-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-yellow-700"
              >
                <>
                  Next
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                </>
              </button>
            ) : null}
          </div> */}
        </div>
      </div>
    </div>
  );
}
