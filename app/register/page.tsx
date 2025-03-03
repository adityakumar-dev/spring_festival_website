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
    idType: "aadhar",
    userType: "individual", // "individual", "institution_admin", "institution_student"
    institutionName: "",
    institutionId: "",
    photo: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  // const [isValidatingAadhar, setIsValidatingAadhar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [instructor, setInstructor] = useState<Instructor[]>([]);
  const [institution, setInstitution] = useState<Institution[]>([]);
  const [registrationData, setRegistrationData] = useState<RegistrationResponse | null>(null);

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
  useEffect(() => {
    console.log(formData.institutionName);
  }, [formData]);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!formData.photo) {
        alert("Please select a profile photo");
        return;
      }

      const registerData: RegisterData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        userType: formData.userType as "individual" | "instructor" | "student",
        photo: formData.photo,
        unique_id_type: formData.idType,
        unique_id: formData.id_type,
        institution_id: formData.institutionId,
      };

      console.log('Submitting data:', registerData);

     await api.register(registerData);
    
    } catch (error) {
      console.error("Registration failed:", error);
      alert(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (isLoading) {
      return <Spinner />;
    }
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Basic Information</h2>
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
            <div className="flex items-center justify-center">
              <h2 className="text-xl sm:text-sm font-semibold mb-4 sm:mb-6">If your registration failed please switch to chrome browser or device and try again</h2>
            </div>
           
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">User Type</h2>
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
                    ? "Instructor"
                    : formData.userType === "student"
                    ? "Student"
                    : "Select user type"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Individual</SelectItem>
                  <SelectItem value="instructor">Group Leader</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>

              {(formData.userType === "student" ||
                formData.userType == "instructor") && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Select Institution
                    </label>
                    <Select
                      value={formData.institutionId || ""}
                      onValueChange={(value) => {
                        // console.log("Selected value:", value);

                        const selectedInst = institutions.find(
                          (inst) => inst.institution_id.toString() === value
                        );
                        // console.log("Found institution:", selectedInst);
                        if (selectedInst) {
                          setSelectedInstitution(value);
                          setFormData((prev) => ({
                            ...prev,
                            institutionId: value,
                            institutionName: selectedInst.name,
                          }));
                          console.log(
                            formData.institutionId +
                              " " +
                              formData.institutionName
                          );
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        {formData.institutionName || "Select an institution"}
                      </SelectTrigger>
                      <SelectContent>
                        {institutions.map((institution) => (
                          <SelectItem
                            key={institution.institution_id.toString()}
                            value={institution.institution_id.toString()}
                          >
                            {institution.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
                <div className="flex items-center justify-center">
              <h2 className="text-xl sm:text-sm font-semibold ">If your registration failed please switch to chrome browser or device and try again</h2>
            </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">
              Upload Your Image
            </h2>

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
            <div className="flex items-center justify-center">
              <h2 className="text-xl sm:text-sm font-semibold ">If your registration failed please switch to chrome browser or device and try again</h2>
            </div>
          </div>
        );

     

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white py-6 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center text-yellow-600 hover:text-yellow-700 mb-4 sm:mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-8">
          <div className="mb-6 sm:mb-8">
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
            <div className="flex justify-between text-xs sm:text-sm">
              <span className={step >= 1 ? "text-yellow-600" : "text-gray-400"}>
                Basic Info
              </span>
              <span className={step >= 2 ? "text-yellow-600" : "text-gray-400"}>
                User Type
              </span>
              <span className={step >= 3 ? "text-yellow-600" : "text-gray-400"}>
                Complete Registration
              </span>
            </div>
          </div>

          {renderStep()}

          <div className="flex justify-between mt-6 sm:mt-8">
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
                 if (step == 1) {
                    try {
                      setIsLoading(true);
                  
                  if(formData.idType == ""){
                    alert("Please select an ID type");
                    return;
                  }
                  if(formData.idType == "aadhar"){
                    if(formData.id_type.length != 12){
                      alert("Please enter a valid 12-digit Aadhar number");
                      return;
                    }
                  }
                  if(formData.idType == "pan"){
                    if(formData.id_type.length != 10){
                      alert("Please enter a valid 10-digit PAN number");
                      return;
                    }
                  }
                  if(formData.idType == "driving_license"){
                    if(formData.id_type.length != 15){
                      alert("Please enter a valid 15-digit Driving License number");
                      return;
                    }
                  }
                  if(formData.idType == "passport"){
                    if(formData.id_type.length != 8){
                      alert("Please enter a valid 8-digit Passport number");
                      return;
                    }
                  }
                  if(formData.idType == "voter_id"){
                    if(formData.id_type.length != 10){
                      alert("Please enter a valid 10-digit Voter ID number");
                      return;
                    }
                  }
      const emailResponse = await api.validateEmail(
                          formData.email
                        );
                        //  alert(emailResponse)
                        if (emailResponse["exists"] === false) {
                          console.log("Email done");
                          try {
                            console.log("Fetching institutions");
                            const response = await api.getInstitutions();
                            // const institutionsData = await response.json();

                            console.log('Institution data:', response[0]);
                            const institutionData = response.map((inst: any) => ({
                              institution_id: inst.institution_id,
                              name: inst.name,
                              created_at: inst.created_at,
                            }));
                            setInstitutions(institutionData);
                          
                          } catch (error) {
                            console.error('Error fetching institutions:', error);
                            alert('Failed to fetch institutions. Please try again.');
                          }
                          setStep(step + 1);
                        } else {
                          alert(
                            "This email is already registered. Please use a different email."
                          );
                        }
                      
                    } catch (error) {
                      console.error("Error validating :", error);
                      alert("Error : " + error);
                    } finally {
                      setIsLoading(false);
                    }
                    return;
                  } else if (
                    step == 2 &&
                    (formData.userType == "student" || formData.userType == "instructor") &&
                    formData.institutionId == "" &&
                    formData.institutionName == ""
                  ) {
                    alert("Please Choose an institution");
                    return;
                  } else {
                    console.log(formData.institutionId);

                    setStep(step + 1);
                  }
                }}
                // disabled={isValidatingAadhar}
                className="ml-auto flex items-center bg-yellow-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-yellow-700 disabled:bg-yellow-400 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                 
                  <>
                    Next
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                  </>
                
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
