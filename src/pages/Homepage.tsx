import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";
import PassDisplay from "@/components/PassDisplay";

const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showPass, setShowPass] = useState(false);
  const [passData, setPassData] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      
      // Check if user has an approved pass
      const applications = JSON.parse(localStorage.getItem("applications") || "[]");
      const userPass = applications.find(
        (app: any) => app.userId === userData.id && app.status === "approved"
      );
      if (userPass) {
        setPassData(userPass);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleShowPass = () => {
    if (passData) {
      setShowPass(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center shadow-medium">
                <i className="bx bx-bus text-3xl text-white"></i>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                DigitalPass
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="font-semibold"
            >
              <i className="bx bx-log-out mr-2"></i>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!showPass ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Welcome Message */}
            <div className="mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="w-24 h-24 rounded-3xl gradient-hero flex items-center justify-center shadow-glow animate-float">
                  <i className="bx bx-user-circle text-6xl text-white"></i>
                </div>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-foreground">Welcome, </span>
                <span className="bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent">
                  {user?.fullName}!
                </span>
              </h2>
              
              <p className="text-xl text-muted-foreground mb-8">
                Ready to embark on your journey across Telangana?
              </p>
            </div>

            {/* Bus Themed Environment */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative overflow-hidden rounded-3xl gradient-hero p-16 mb-12 shadow-medium"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-white/30 animate-float"></div>
                <div className="absolute bottom-0 right-1/4 w-48 h-48 rounded-full bg-white/20 animate-float" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-white/15 animate-float" style={{ animationDelay: "2s" }}></div>
              </div>
              
              <div className="relative z-10">
                <i className="bx bx-bus-school text-8xl text-white mb-6 inline-block"></i>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Your Digital Bus Pass System
                </h3>
                <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
                  Apply for your bus pass, make secure payments, and download your digital pass - all in one place!
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 min-w-[150px]">
                    <i className="bx bx-time text-3xl text-white mb-2"></i>
                    <p className="text-white font-semibold">Quick Apply</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 min-w-[150px]">
                    <i className="bx bx-wallet text-3xl text-white mb-2"></i>
                    <p className="text-white font-semibold">Secure Payment</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 min-w-[150px]">
                    <i className="bx bx-download text-3xl text-white mb-2"></i>
                    <p className="text-white font-semibold">Instant Pass</p>
                  </div>
                </div>

                {passData ? (
                  <div className="space-y-4">
                    <div className="bg-success/20 backdrop-blur-sm border-2 border-success rounded-2xl p-6 inline-block">
                      <div className="flex items-center gap-3 text-white">
                        <i className="bx bx-check-circle text-4xl"></i>
                        <div className="text-left">
                          <p className="text-2xl font-bold">Pass Generated!</p>
                          <p className="text-white/90">Your bus pass is ready to use</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 justify-center">
                      <Button
                        size="lg"
                        onClick={handleShowPass}
                        className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-10 py-6 rounded-2xl shadow-medium hover:shadow-glow transition-smooth hover:scale-105"
                      >
                        <i className="bx bx-id-card text-2xl mr-2"></i>
                        Show My Pass
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => navigate("/apply")}
                    className="bg-white text-primary hover:bg-white/90 font-bold text-lg px-12 py-8 rounded-2xl shadow-medium hover:shadow-glow transition-smooth hover:scale-105"
                  >
                    <i className="bx bx-rocket text-3xl mr-3"></i>
                    Apply for Bus Pass
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Info Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="gradient-card p-6 rounded-2xl shadow-soft border border-border/50">
                <i className="bx bx-user text-4xl text-primary mb-3"></i>
                <h4 className="text-xl font-bold mb-2">Your Profile</h4>
                <p className="text-muted-foreground">{user?.email}</p>
                <p className="text-muted-foreground">{user?.mobile}</p>
              </div>
              
              <div className="gradient-card p-6 rounded-2xl shadow-soft border border-border/50">
                <i className="bx bx-shield-alt-2 text-4xl text-success mb-3"></i>
                <h4 className="text-xl font-bold mb-2">Secure & Safe</h4>
                <p className="text-muted-foreground">Your data is encrypted and protected</p>
              </div>
              
              <div className="gradient-card p-6 rounded-2xl shadow-soft border border-border/50">
                <i className="bx bx-support text-4xl text-secondary mb-3"></i>
                <h4 className="text-xl font-bold mb-2">24/7 Support</h4>
                <p className="text-muted-foreground">We're here to help you anytime</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <PassDisplay 
            passData={passData} 
            onBack={() => setShowPass(false)}
          />
        )}
      </main>
    </div>
  );
};

export default Homepage;
