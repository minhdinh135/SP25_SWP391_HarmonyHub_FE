import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import {
  addQualification,
  registerMember,
  registerTherapist,
} from "@/api/accountApi";
import SelectRoleStep from "./components/SelectRoleStep";
import BasicInfoStep from "./components/BasicInfoStep";
import TherapistDetailsStep from "./components/TherapistDetailsStep";
import Stepper from "@/components/Stepper";
import { uploadFile } from "@/api/cloudinaryApi";

const SignUp = () => {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "123456789",
    relationshipGoal: "Marry",
    birthdate: "2003-03-04",
    gender: 1,
    bio: "Looking for a partner",
    avatarUrl: "",
    yearsOfExperience: 0,
  });
  const [qualifications, setQualifications] = useState([
    { degree: 1, image: null, specialtyId: 1 },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const getMemberSteps = () => ["Select Role", "Basic Information"];
  const getTherapistSteps = () => [
    "Select Role",
    "Basic Information",
    "Professional Details",
  ];

  const getCurrentSteps = () => {
    if (!selectedRole) return getMemberSteps();
    return selectedRole === "Member" ? getMemberSteps() : getTherapistSteps();
  };

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    console.log("Id:", id);
    console.log("Value:", value);
  };

  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index][field] = value;
    setQualifications(updatedQualifications);

    // Update the parent form data
    handleInputChange({
      target: {
        id: "qualifications",
        value: updatedQualifications,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setIsLoading(true);
      if (selectedRole === "Member") {
        const payload = {
          avatarUrl: formData.avatarUrl || "",
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          relationshipGoal: formData.relationshipGoal,
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthdate: formData.birthdate,
          gender: formData.gender,
          bio: formData.bio,
        };
        await registerMember(payload);
      } else {
        const payload = {
          avatarUrl: formData.avatarUrl || "",
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          yearsOfExperience: Number(formData.yearsOfExperience),
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthdate: formData.birthdate,
          gender: formData.gender,
          bio: formData.bio,
        };

        console.log("Payload: ", payload);
        console.log("Qualifications: ", qualifications);

        await registerTherapist(payload);

        for (const qualification of qualifications) {
          console.log("Qualification in loop:", qualification);
          const imageUrl = await uploadFile(qualification.image);
          const qualificationPayload = {
            email: formData.email,
            degree: qualification.degree,
            imageUrl: imageUrl,
            specialtyId: qualification.specialtyId,
          };
          console.log("qualificationPayload:", qualificationPayload);
          await addQualification(qualificationPayload);
        }
      }
      toast.success("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-[#F6F4F0] via-[#F0F4F6] to-[#F4F0F6] relative overflow-hidden">
      {/* Decorative Blurred Circles */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#79D7BE]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#2E5077]/20 rounded-full blur-3xl"></div>
      {/* Left Side - Welcome Section */}
      <div className="w-full md:w-1/3 bg-[#2E5077] text-white p-8 flex flex-col justify-center items-center relative z-10">
        <div className="max-w-md space-y-6">
          <div className="relative">
            <img
              src="https://damonashworthpsychology.com/wp-content/uploads/2021/12/250f2-pexels-photo-4101143.jpeg?w=1568"
              alt="Decorative workspace"
              className="rounded-lg shadow-xl w-full object-cover aspect-video transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#2E5077]/30 rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              Create an Account
            </h1>
            <p className="text-gray-300">
              Join our community and start your personal growth journey today.
            </p>
          </div>
        </div>
      </div>
      {/* Right Side - Registration Form */}
      <div className="w-full md:w-2/3 flex items-center justify-center p-8 relative z-10">
        <Card className="w-full max-w-xl shadow-2xl border-none">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold text-[#2E5077]">
              {selectedRole ? `Sign Up as ${selectedRole}` : "Sign Up"}
            </CardTitle>
            <CardDescription>
              {selectedRole
                ? `Complete the registration process (${currentStep}/${getCurrentSteps().length})`
                : "Choose your role to begin"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Stepper
              steps={getCurrentSteps()}
              initialStep={currentStep}
              onStepChange={setCurrentStep}
            >
              <SelectRoleStep handleRoleSelection={handleRoleSelection} />
              <BasicInfoStep
                selectedRole={selectedRole}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
              />
              {selectedRole === "Therapist" && (
                <TherapistDetailsStep
                  formData={formData}
                  qualifications={qualifications}
                  setQualifications={setQualifications}
                  handleQualificationChange={handleQualificationChange}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                />
              )}
            </Stepper>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <p className="text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#79D7BE] hover:text-[#2E5077] font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>{" "}
    </div>
  );
};

export default SignUp;
