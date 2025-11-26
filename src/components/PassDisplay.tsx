import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

interface PassDisplayProps {
  passData: any;
  onBack: () => void;
}

const PassDisplay = ({ passData, onBack }: PassDisplayProps) => {
  const handleDownloadPDF = async () => {
    try {
      const passElement = document.getElementById("bus-pass-card");
      if (!passElement) return;

      const canvas = await html2canvas(passElement, {
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`DigitalPass_${passData.passNumber}.pdf`);
      
      toast.success("Pass downloaded successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download pass. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Your Digital Bus Pass
        </h2>
        <p className="text-muted-foreground">Valid for travel across Telangana</p>
      </div>

      {/* Bus Pass Card */}
      <Card
        id="bus-pass-card"
        className="p-8 shadow-medium border-2 border-primary/20 bg-card"
      >
        <div className="relative">
          {/* Header */}
          <div className="text-center mb-6 pb-6 border-b-2 border-primary/20">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-soft">
                <i className="bx bx-bus text-4xl text-white"></i>
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  DigitalPass
                </h3>
                <p className="text-sm text-muted-foreground">Telangana State Bus Pass</p>
              </div>
            </div>
            <div className="inline-block px-6 py-2 bg-success/10 border border-success/30 rounded-full">
              <p className="text-success font-bold">ACTIVE PASS</p>
            </div>
          </div>

          {/* Pass Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Photo and Personal Info */}
            <div className="md:col-span-1">
              {passData.photo && (
                <img
                  src={passData.photo}
                  alt="Student"
                  className="w-full aspect-square object-cover rounded-2xl border-4 border-primary/20 shadow-soft mb-4"
                />
              )}
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Pass Number</p>
                <p className="font-bold text-lg text-primary">{passData.passNumber}</p>
              </div>
            </div>

            {/* Details Columns */}
            <div className="md:col-span-2 space-y-6">
              {/* Personal Details */}
              <div>
                <h4 className="text-sm font-bold text-primary mb-3 flex items-center gap-2">
                  <i className="bx bx-user"></i>
                  Personal Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Full Name</p>
                    <p className="font-semibold">{passData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Mobile</p>
                    <p className="font-semibold">{passData.mobile}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-semibold text-sm">{passData.email}</p>
                  </div>
                </div>
              </div>

              {/* Education Details */}
              <div>
                <h4 className="text-sm font-bold text-secondary mb-3 flex items-center gap-2">
                  <i className="bx bx-book"></i>
                  Education Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground">College Name</p>
                    <p className="font-semibold">{passData.collegeName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Branch</p>
                    <p className="font-semibold">{passData.branch}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-semibold">{passData.collegeLocation}</p>
                  </div>
                </div>
              </div>

              {/* Travel Details */}
              <div>
                <h4 className="text-sm font-bold text-success mb-3 flex items-center gap-2">
                  <i className="bx bx-map"></i>
                  Travel Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">From</p>
                    <p className="font-semibold flex items-center gap-1">
                      <i className="bx bx-map-pin text-primary"></i>
                      {passData.fromAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">To</p>
                    <p className="font-semibold flex items-center gap-1">
                      <i className="bx bx-map-pin text-secondary"></i>
                      {passData.toAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Duration</p>
                    <p className="font-semibold">{passData.duration} Month(s)</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Issue Date</p>
                    <p className="font-semibold">
                      {new Date(passData.paymentDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="mt-6 pt-6 border-t-2 border-primary/20 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-2">Validity</p>
              <p className="font-bold text-lg text-success">
                {new Date(passData.paymentDate).toLocaleDateString()} - {" "}
                {new Date(
                  new Date(passData.paymentDate).setMonth(
                    new Date(passData.paymentDate).getMonth() + parseInt(passData.duration)
                  )
                ).toLocaleDateString()}
              </p>
            </div>
            <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center border-2 border-border">
              <i className="bx bx-qr text-4xl text-muted-foreground"></i>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 p-4 bg-muted/50 rounded-xl">
            <p className="text-xs text-center text-muted-foreground">
              This is a digitally generated bus pass. Please carry a valid ID card along with this pass.
              This pass is non-transferable and valid only for the mentioned route and duration.
            </p>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mt-8 justify-center">
        <Button
          onClick={handleDownloadPDF}
          className="gradient-primary text-white font-bold px-8 py-6 shadow-soft hover:shadow-medium transition-smooth"
        >
          <i className="bx bx-download text-xl mr-2"></i>
          Download Pass (PDF)
        </Button>
        <Button
          onClick={onBack}
          variant="outline"
          className="font-semibold px-8 py-6 border-2"
        >
          <i className="bx bx-arrow-back mr-2"></i>
          Back to Homepage
        </Button>
      </div>
    </motion.div>
  );
};

export default PassDisplay;
