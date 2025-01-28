import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Banner = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://i.ibb.co.com/4KRPgfy/cover.png"
        alt="Blood donation"
      />
      {/* Content */}
      <div className="relative top-40 z-10 flex items-center h-full">
        <motion.div
          className="ml-8  text-left text-neutral-content max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }} // Fade-in effect
        >
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
          <div className="flex gap-4">
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
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
