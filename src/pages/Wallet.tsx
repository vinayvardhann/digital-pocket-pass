import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Wallet = () => {
  const navigate = useNavigate();
  const [showPinEntry, setShowPinEntry] = useState(false);
  const [pin, setPin] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const walletBalance = 1000;

  const handleProceedToPay = () => {
    setShowPinEntry(true);
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handlePinDelete = () => {
    setPin(pin.slice(0, -1));
  };

  const handlePay = () => {
    if (pin.length === 4) {
      setShowPinEntry(false);
      setShowSuccess(true);
      
      // Process payment and save application
      setTimeout(() => {
        const applicationData = JSON.parse(localStorage.getItem("pendingApplication") || "{}");
        applicationData.status = "approved";
        applicationData.paymentDate = new Date().toISOString();
        applicationData.passNumber = `TS${Date.now().toString().slice(-8)}`;
        
        const applications = JSON.parse(localStorage.getItem("applications") || "[]");
        applications.push(applicationData);
        localStorage.setItem("applications", JSON.stringify(applications));
        localStorage.removeItem("pendingApplication");
        
        toast.success("Payment successful! Your pass is ready!");
        
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/homepage");
        }, 3000);
      }, 2000);
    } else {
      toast.error("Please enter a 4-digit PIN");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-soft">
              <i className="bx bx-wallet text-4xl text-white"></i>
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Digital Wallet
          </h1>
          <p className="text-muted-foreground">Complete your payment securely</p>
        </div>

        {/* Wallet Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-8 shadow-medium border-border/50 relative overflow-hidden">
            <div className="absolute inset-0 gradient-hero opacity-10"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-muted-foreground mb-2">Available Balance</p>
                  <h2 className="text-5xl font-bold text-foreground">
                    ₹{walletBalance}
                  </h2>
                </div>
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center shadow-soft">
                  <i className="bx bx-money text-4xl text-white"></i>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Amount</p>
                    <p className="text-2xl font-bold text-primary">₹500</p>
                  </div>
                  <i className="bx bx-bus text-3xl text-primary"></i>
                </div>

                <div className="flex items-center justify-between p-4 bg-success/10 rounded-xl border border-success/30">
                  <div>
                    <p className="text-sm text-success-foreground">Remaining Balance</p>
                    <p className="text-2xl font-bold text-success">₹{walletBalance - 500}</p>
                  </div>
                  <i className="bx bx-check-circle text-3xl text-success"></i>
                </div>
              </div>

              <Button
                onClick={handleProceedToPay}
                className="w-full gradient-hero text-white font-bold py-6 text-lg shadow-soft hover:shadow-medium transition-smooth"
              >
                <i className="bx bx-credit-card text-2xl mr-2"></i>
                Proceed to Pay
              </Button>
            </div>
          </Card>
        </motion.div>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/apply")}
            className="text-muted-foreground hover:text-foreground"
          >
            <i className="bx bx-arrow-back mr-2"></i>
            Back to Application
          </Button>
        </div>
      </div>

      {/* PIN Entry Dialog */}
      <Dialog open={showPinEntry} onOpenChange={setShowPinEntry}>
        <DialogContent className="max-w-sm bg-card">
          <div className="text-center py-4">
            <div className="inline-block mb-4">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center shadow-soft">
                <i className="bx bx-lock-alt text-3xl text-white"></i>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2">Enter PIN</h3>
            <p className="text-muted-foreground mb-6">Enter any 4-digit PIN to complete payment</p>

            {/* PIN Display */}
            <div className="flex justify-center gap-4 mb-8">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center text-2xl font-bold transition-smooth ${
                    pin.length > index
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-muted bg-muted/30"
                  }`}
                >
                  {pin.length > index ? "●" : ""}
                </div>
              ))}
            </div>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                <Button
                  key={digit}
                  onClick={() => handlePinInput(digit.toString())}
                  variant="outline"
                  className="h-14 text-xl font-bold hover:bg-primary hover:text-white transition-smooth"
                >
                  {digit}
                </Button>
              ))}
              <Button
                onClick={handlePinDelete}
                variant="outline"
                className="h-14 hover:bg-destructive hover:text-white transition-smooth"
              >
                <i className="bx bx-x text-2xl"></i>
              </Button>
              <Button
                onClick={() => handlePinInput("0")}
                variant="outline"
                className="h-14 text-xl font-bold hover:bg-primary hover:text-white transition-smooth"
              >
                0
              </Button>
              <Button
                onClick={handlePay}
                variant="outline"
                className="h-14 gradient-primary text-white hover:opacity-90 transition-smooth"
              >
                <i className="bx bx-check text-2xl"></i>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Animation Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-sm bg-card border-success">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 rounded-full bg-success flex items-center justify-center shadow-glow">
                <i className="bx bx-check text-6xl text-white"></i>
              </div>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl font-bold mb-2 text-success"
            >
              Payment Successful!
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-muted-foreground mb-6"
            >
              Your bus pass has been generated successfully
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex items-center justify-center gap-2 text-success"
            >
              <i className="bx bx-loader-circle bx-spin text-2xl"></i>
              <p className="font-medium">Redirecting to homepage...</p>
            </motion.div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Wallet;
