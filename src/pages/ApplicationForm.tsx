import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";

const telanganaLocations = [
  "Hyderabad", "Secunderabad", "Warangal", "Nizamabad", "Karimnagar", 
  "Khammam", "Ramagundam", "Mahbubnagar", "Nalgonda", "Adilabad",
  "Suryapet", "Siddipet", "Miryalaguda", "Jagtial", "Mancherial",
  "Nirmal", "Kamareddy", "Nagarkurnool", "Medak", "Vikarabad"
];

const ApplicationForm = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);
  const [showVerification, setShowVerification] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  
  const [formData, setFormData] = useState({
    // Section 1: Personal Details
    fullName: "",
    mobile: "",
    email: "",
    photo: "",
    
    // Section 2: Education Details
    collegeName: "",
    branch: "",
    collegeLocation: "",
    
    // Section 3: Bus Pass Details
    fromAddress: "",
    toAddress: "",
    duration: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Photo size should be less than 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhotoPreview(base64String);
        setFormData(prev => ({ ...prev, photo: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateSection1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.photo) {
      newErrors.photo = "Please upload your photo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSection2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.collegeName.trim()) {
      newErrors.collegeName = "College name is required";
    }

    if (!formData.branch.trim()) {
      newErrors.branch = "Branch/Specialization is required";
    }

    if (!formData.collegeLocation) {
      newErrors.collegeLocation = "College location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSection3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fromAddress) {
      newErrors.fromAddress = "From address is required";
    }

    if (!formData.toAddress) {
      newErrors.toAddress = "To address is required";
    }

    if (formData.fromAddress === formData.toAddress) {
      newErrors.toAddress = "From and To addresses cannot be the same";
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentSection === 1 && validateSection1()) {
      setCurrentSection(2);
    } else if (currentSection === 2 && validateSection2()) {
      setCurrentSection(3);
    } else if (currentSection === 3 && validateSection3()) {
      setShowVerification(true);
    }
  };

  const handleProceed = () => {
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
    
    // Save application data
    const applicationData = {
      ...formData,
      userId: user.id,
      applicationId: Date.now().toString(),
      status: "pending",
      appliedAt: new Date().toISOString()
    };
    
    localStorage.setItem("pendingApplication", JSON.stringify(applicationData));
    setShowVerification(false);
    navigate("/wallet");
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-soft">
              <i className="bx bx-file text-4xl text-white"></i>
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Bus Pass Application
          </h1>
          <p className="text-muted-foreground">Fill in your details to apply for a bus pass</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3].map((section) => (
            <div key={section} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-smooth ${
                  currentSection >= section
                    ? "gradient-primary text-white shadow-soft"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {section}
              </div>
              {section < 3 && (
                <div
                  className={`w-12 h-1 ${
                    currentSection > section ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="p-6 md:p-8 shadow-medium border-border/50">
          <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            {/* Section 1: Personal Details */}
            {currentSection === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="border-b border-border pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <i className="bx bx-user"></i>
                    Section 1: Personal Details
                  </h2>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-medium">
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile" className="font-medium">
                    Mobile Number <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleChange("mobile", e.target.value)}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    className={errors.mobile ? "border-destructive" : ""}
                  />
                  {errors.mobile && (
                    <p className="text-sm text-destructive">{errors.mobile}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">
                    Email ID <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo" className="font-medium">
                    Upload Passport Size Photo <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className={errors.photo ? "border-destructive" : ""}
                  />
                  {photoPreview && (
                    <div className="mt-4">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-xl border-2 border-primary shadow-soft"
                      />
                    </div>
                  )}
                  {errors.photo && (
                    <p className="text-sm text-destructive">{errors.photo}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Section 2: Education Details */}
            {currentSection === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="border-b border-border pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-secondary flex items-center gap-2">
                    <i className="bx bx-book"></i>
                    Section 2: Education Details
                  </h2>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collegeName" className="font-medium">
                    College Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="collegeName"
                    value={formData.collegeName}
                    onChange={(e) => handleChange("collegeName", e.target.value)}
                    placeholder="Enter your college name"
                    className={errors.collegeName ? "border-destructive" : ""}
                  />
                  {errors.collegeName && (
                    <p className="text-sm text-destructive">{errors.collegeName}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch" className="font-medium">
                    Branch / Specialization <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="branch"
                    value={formData.branch}
                    onChange={(e) => handleChange("branch", e.target.value)}
                    placeholder="e.g., Computer Science, Mechanical"
                    className={errors.branch ? "border-destructive" : ""}
                  />
                  {errors.branch && (
                    <p className="text-sm text-destructive">{errors.branch}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collegeLocation" className="font-medium">
                    College Location <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.collegeLocation}
                    onValueChange={(value) => handleChange("collegeLocation", value)}
                  >
                    <SelectTrigger className={errors.collegeLocation ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select college location" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-popover">
                      {telanganaLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.collegeLocation && (
                    <p className="text-sm text-destructive">{errors.collegeLocation}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Section 3: Bus Pass Details */}
            {currentSection === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="border-b border-border pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-success flex items-center gap-2">
                    <i className="bx bx-bus"></i>
                    Section 3: Bus Pass Details
                  </h2>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fromAddress" className="font-medium">
                    From Address <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.fromAddress}
                    onValueChange={(value) => handleChange("fromAddress", value)}
                  >
                    <SelectTrigger className={errors.fromAddress ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select starting location" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-popover">
                      {telanganaLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.fromAddress && (
                    <p className="text-sm text-destructive">{errors.fromAddress}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toAddress" className="font-medium">
                    To Address <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.toAddress}
                    onValueChange={(value) => handleChange("toAddress", value)}
                  >
                    <SelectTrigger className={errors.toAddress ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select destination" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 bg-popover">
                      {telanganaLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.toAddress && (
                    <p className="text-sm text-destructive">{errors.toAddress}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="font-medium">
                    Duration of Pass (Months) <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => handleChange("duration", value)}
                  >
                    <SelectTrigger className={errors.duration ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="1">1 Month</SelectItem>
                      <SelectItem value="3">3 Months</SelectItem>
                      <SelectItem value="6">6 Months</SelectItem>
                      <SelectItem value="12">12 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.duration && (
                    <p className="text-sm text-destructive">{errors.duration}</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              {currentSection > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentSection(currentSection - 1)}
                  className="flex-1"
                >
                  <i className="bx bx-arrow-back mr-2"></i>
                  Previous
                </Button>
              )}
              <Button
                type="submit"
                className="flex-1 gradient-primary text-white font-bold py-6"
              >
                {currentSection === 3 ? "Review Application" : "Next"}
                <i className="bx bx-arrow-back bx-rotate-180 ml-2"></i>
              </Button>
            </div>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/homepage")}
            className="text-muted-foreground hover:text-foreground"
          >
            <i className="bx bx-home mr-2"></i>
            Back to Homepage
          </Button>
        </div>
      </div>

      {/* Verification Dialog */}
      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              <i className="bx bx-check-circle mr-2"></i>
              Verify Your Details
            </DialogTitle>
            <DialogDescription>
              Please review all information before proceeding to payment
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Personal Details */}
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-bold mb-3 text-primary">Personal Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {photoPreview && (
                  <div className="col-span-2">
                    <img
                      src={photoPreview}
                      alt="Student"
                      className="w-24 h-24 object-cover rounded-xl border-2 border-primary"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-semibold">{formData.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mobile</p>
                  <p className="font-semibold">{formData.mobile}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">{formData.email}</p>
                </div>
              </div>
            </div>

            {/* Education Details */}
            <div className="border-b border-border pb-4">
              <h3 className="text-lg font-bold mb-3 text-secondary">Education Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">College Name</p>
                  <p className="font-semibold">{formData.collegeName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <p className="font-semibold">{formData.branch}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{formData.collegeLocation}</p>
                </div>
              </div>
            </div>

            {/* Bus Pass Details */}
            <div>
              <h3 className="text-lg font-bold mb-3 text-success">Bus Pass Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-semibold">{formData.fromAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-semibold">{formData.toAddress}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold">{formData.duration} Month(s)</p>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleProceed}
            className="w-full gradient-hero text-white font-bold py-6"
          >
            <i className="bx bx-check-double text-xl mr-2"></i>
            Proceed to Payment
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationForm;
