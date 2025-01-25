import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Banner = () => {
  return (
    <div className="hero">
      <img
        className="min-h-screen"
        src="https://i.ibb.co.com/8DFQYrf/DALL-E-2025-01-23-12-02-50-A-modern-and-sleek-website-banner-design-for-a-blood-donation-platform-na.png"
        alt="Blood donation"
      />
      <div className="hero-overlay"></div>
      <motion.div
        className="hero-content text-center text-neutral-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }} // Fade-in effect
      >
        <div className="max-w-xl">
          <motion.h1
            className="mb-5 text-5xl font-bold"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            SMS-based platform to connect blood searchers with donors
          </motion.h1>
          <motion.p
            className="mb-5"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Rokto is a real-time free platform to help blood searchers connect
            voluntary blood donors around Bangladesh.
          </motion.p> 
          <div className="flex justify-center gap-4">
            {/* Updated Link for Join as a Donor */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/dashboard">
                <button className="btn btn-primary">Join as a Donor</button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/search">
                <button className="btn btn-secondary">Search Donors</button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
