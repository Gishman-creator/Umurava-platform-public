"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Upload, ArrowRight, ArrowLeft, User2, Check, X } from "lucide-react"
import Image from "next/image"

interface FormData {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  role: string
  specialization: string
  profileImage: File | null
}

interface PasswordRequirements {
  length: boolean
  uppercase: boolean
  lowercase: boolean
  number: boolean
  special: boolean
}

const STORAGE_KEY = "signupFormData"

export default function SignupForm() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "",
    specialization: "",
    profileImage: null,
  })
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "",
    specialization: "",
  })
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  })
  const [error, setError] = useState<string | null>(null)

  const specializations = [
    "Software Developer",
    "UI/UX Designer",
    "Data Scientist",
    "Product Manager",
    "Digital Marketer",
    "Business Analyst",
    "DevOps Engineer",
    "Cloud Architect",
    "Cybersecurity Specialist",
    "Machine Learning Engineer",
    "Blockchain Developer",
    "Mobile App Developer",
    "Quality Assurance Engineer",
    "Technical Writer",
    "System Administrator",
    "Network Engineer",
    "Database Administrator",
    "Game Developer",
    "AR/VR Developer",
    "Artificial Intelligence Engineer",
  ];

  useEffect(() => {
    const storedData = localStorage.getItem(STORAGE_KEY)
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setFormData((prevData) => ({
        ...prevData,
        ...parsedData,
      }))
      setStep(parsedData.email ? parsedData.step : 1)

      // Reapply password validation after restoring session storage
      if (parsedData.password) {
        setPasswordRequirements({
          length: parsedData.password.length >= 8,
          uppercase: /[A-Z]/.test(parsedData.password),
          lowercase: /[a-z]/.test(parsedData.password),
          number: /[0-9]/.test(parsedData.password),
          special: /[^A-Za-z0-9]/.test(parsedData.password),
        });
      }
    }

    const urlStep = Number.parseInt(searchParams?.get("step") || "0", 10);
    if (urlStep === 2 && storedData && JSON.parse(storedData).email) {
      setStep(urlStep);
    } else {
      setStep(1);
      updateURL(1);
    }
  }, [searchParams])

  useEffect(() => {
    const dataToStore = {
      ...formData,
      step,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore))
  }, [formData, step])

  const updateURL = (newStep: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("step", newStep.toString());
    router.push(`/signup?${params.toString()}`);
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Selected file:", file);  // Check if the file is correctly picked
      setFormData({ ...formData, profileImage: file });
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const validateFirstStep = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    } else {
      newErrors.email = ""
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (!Object.values(passwordRequirements).every(Boolean)) {
      newErrors.password = "Password does not meet all requirements"
      isValid = false
    } else {
      newErrors.password = ""
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    } else {
      newErrors.confirmPassword = ""
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNextStep = () => {
    if (validateFirstStep()) {
      updateURL(2)
      setStep(2)
    }
  }

  const validateSecondStep = () => {
    let isValid = true
    const newErrors = { ...errors }

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required"
      isValid = false
    } else {
      newErrors.fullName = ""
    }

    if (!formData.role) {
      newErrors.role = "Role is required"
      isValid = false
    } else {
      newErrors.role = ""
    }

    if (!formData.specialization) {
      newErrors.specialization = "Specialization is required"
      isValid = false
    } else {
      newErrors.specialization = ""
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validateSecondStep()) return;

    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("name", formData.fullName);
      formDataToSend.append("specialty", formData.specialization.toLowerCase());
      formDataToSend.append("role", formData.role.toLowerCase());
      formDataToSend.append("isEmailVerified", "false"); // Add email verification flag

      if (formData.profileImage) {
        formDataToSend.append("profileImage", formData.profileImage);
      }

      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        body: formDataToSend,
      });
      console.log(response)

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        throw new Error(data.error || data.message || "Registration failed");
      }

      // Clear form data from local storage
      localStorage.removeItem(STORAGE_KEY);

      // Show success message before redirect
      setMessage("Registration successful! Please check your email for verification.");

      // Redirect to unverified page after a short delay
      router.push("/unverified");

    } catch (error) {
      const err = error as Error;
      console.error("Signup error:", error);
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <Progress value={step === 1 ? 50 : 100} className="w-full bg-gray-100" />
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              // Step 1: Credentials
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (errors.email) validateFirstStep()
                    }}
                    required
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => {
                      const newPassword = e.target.value
                      setFormData({ ...formData, password: newPassword })
                      setPasswordRequirements({
                        length: newPassword.length >= 8,
                        uppercase: /[A-Z]/.test(newPassword),
                        lowercase: /[a-z]/.test(newPassword),
                        number: /[0-9]/.test(newPassword),
                        special: /[^A-Za-z0-9]/.test(newPassword),
                      })
                      if (errors.password) validateFirstStep()
                    }}
                    required
                    className={errors.password ? "border-red-500" : ""}
                  />
                  <div className="space-y-1 text-sm">
                    <p
                      className={`flex items-center ${passwordRequirements.length ? "text-green-500" : "text-gray-500"}`}
                    >
                      {passwordRequirements.length ? (
                        <Check size={16} className="mr-1" />
                      ) : (
                        <X size={16} className="mr-1" />
                      )}
                      At least 8 characters
                    </p>
                    <p
                      className={`flex items-center ${passwordRequirements.uppercase ? "text-green-500" : "text-gray-500"}`}
                    >
                      {passwordRequirements.uppercase ? (
                        <Check size={16} className="mr-1" />
                      ) : (
                        <X size={16} className="mr-1" />
                      )}
                      At least one uppercase letter
                    </p>
                    <p
                      className={`flex items-center ${passwordRequirements.lowercase ? "text-green-500" : "text-gray-500"}`}
                    >
                      {passwordRequirements.lowercase ? (
                        <Check size={16} className="mr-1" />
                      ) : (
                        <X size={16} className="mr-1" />
                      )}
                      At least one lowercase letter
                    </p>
                    <p
                      className={`flex items-center ${passwordRequirements.number ? "text-green-500" : "text-gray-500"}`}
                    >
                      {passwordRequirements.number ? (
                        <Check size={16} className="mr-1" />
                      ) : (
                        <X size={16} className="mr-1" />
                      )}
                      At least one number
                    </p>
                    <p
                      className={`flex items-center ${passwordRequirements.special ? "text-green-500" : "text-gray-500"}`}
                    >
                      {passwordRequirements.special ? (
                        <Check size={16} className="mr-1" />
                      ) : (
                        <X size={16} className="mr-1" />
                      )}
                      At least one special character
                    </p>
                  </div>
                  {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value })
                      if (errors.confirmPassword) validateFirstStep()
                    }}
                    required
                    className={errors.confirmPassword ? "border-red-500" : ""}
                  />
                  {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                </div>
                <Button type="button" onClick={handleNextStep} className="w-full bg-primary text-white">
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : (
              // Step 2: Personal Information
              <div className="space-y-4">
                <div className="space-y-4">
                  <Label className="block text-center">Profile Photo</Label>
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-gray-200">
                      {photoPreview ? (
                        <Image
                          src={photoPreview || "/placeholder.svg"}
                          alt="Profile preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-50">
                          <User2 className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <Label
                        htmlFor="photo-upload"
                        className="cursor-pointer inline-flex items-center gap-2 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Upload className="h-4 w-4" />
                        Upload Photo
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value })
                      if (errors.fullName) validateSecondStep()
                    }}
                    required
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => {
                      setFormData({ ...formData, role: value })
                      if (errors.role) validateSecondStep()
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem className="py-2 hover:bg-gray-100" value="talent">Talent</SelectItem>
                      <SelectItem className="py-2 hover:bg-gray-100" value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.role === "talent" && (
                    <p className="text-xs text-gray-600 mt-2">
                      As a Talent, you will have the opportunity to participate in various challenges.
                      You can showcase your skills, collaborate with others, and compete for exciting prizes.
                    </p>
                  )}
                  {formData.role === "admin" && (
                    <p className="text-xs text-gray-700 mt-2">
                      As an Admin, you will have full control over creating and managing challenges
                      on the platform. You can design your own challenges, set deadlines, define prize ranges,
                      and manage participants.
                    </p>
                  )}
                  {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialization">Specialization</Label>
                  <Select
                    value={formData.specialization}
                    onValueChange={(value) => {
                      setFormData({ ...formData, specialization: value })
                      if (errors.specialization) validateSecondStep()
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem className="py-2 hover:bg-gray-100" key={spec.toLowerCase().replace(/\s+/g, "-")} value={spec.toLowerCase()}>
                          {spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.specialization && <p className="text-sm text-red-500 mt-1">{errors.specialization}</p>}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      updateURL(1)
                      setStep(1)
                    }}
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary text-white" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Create Account"}
                  </Button>
                </div>
              </div>
            )}
            {error && (<p className="text-sm text-red-500 text-center">{error}</p>)}
            {message && (<p className="text-sm text-primary text-center">{message}</p>)}
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}