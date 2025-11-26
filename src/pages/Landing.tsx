import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "bx-time-five",
      title: "Quick & Easy",
      description: "Apply for your bus pass in just minutes with our simple online process"
    },
    {
      icon: "bx-shield-alt-2",
      title: "100% Digital",
      description: "No paper forms, no long queues. Everything happens online securely"
    },
    {
      icon: "bx-wallet",
      title: "Digital Wallet",
      description: "Pay safely with our integrated digital wallet system"
    },
    {
      icon: "bx-download",
      title: "Instant Download",
      description: "Get your bus pass immediately after approval as a digital PDF"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl gradient-hero flex items-center justify-center shadow-medium">
              <i className="bx bx-bus text-3xl text-white"></i>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              DigitalPass
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="w-24 h-24 rounded-3xl gradient-hero flex items-center justify-center shadow-glow animate-float">
              <i className="bx bx-bus-school text-5xl text-white"></i>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent">
              Your Journey Starts Here,
            </span>
            <br />
            <span className="text-foreground">Students!</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get your Telangana State Student Bus Pass in minutes. Travel smart, travel hassle-free!
          </p>

          <Button
            size="lg"
            onClick={() => navigate("/register")}
            className="gradient-hero text-white font-bold text-lg px-10 py-6 rounded-2xl shadow-medium hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            <i className="bx bx-rocket text-2xl mr-2"></i>
            Apply for New Pass
          </Button>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="gradient-card p-6 rounded-2xl shadow-soft border border-border/50 hover:shadow-medium transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-soft">
                <i className={`bx ${feature.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bus Themed Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative overflow-hidden rounded-3xl gradient-hero p-12 text-center shadow-medium"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/30 animate-float"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/20 animate-float" style={{ animationDelay: "1s" }}></div>
          </div>
          
          <div className="relative z-10">
            <i className="bx bx-map text-7xl text-white/90 mb-4 inline-block"></i>
            <h3 className="text-4xl font-bold text-white mb-4">
              Travel Across Telangana
            </h3>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Connect to any destination within Telangana State with our comprehensive bus pass system. 
              From Hyderabad to Warangal, from Karimnagar to Nizamabad - we've got you covered!
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahbubnagar"].map((city) => (
                <span
                  key={city}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Already have an account?</p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/login")}
            className="font-semibold border-2 hover:border-primary hover:text-primary transition-smooth"
          >
            Login Here
          </Button>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            © 2024 DigitalPass. Making student travel easier across Telangana.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
