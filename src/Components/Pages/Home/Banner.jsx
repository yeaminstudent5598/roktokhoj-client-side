import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="hero">
      <img
        className="min-h-screen"
        src="https://i.ibb.co.com/3Nvr3pb/blood-donation-rkto-1-scaled-e1613380226989.jpg"
        alt="Blood donation"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-5xl font-bold">
            SMS-based platform to connect blood searchers with donors
          </h1>
          <p className="mb-5">
            Rokto is a real-time free platform to help blood searchers connect
            voluntary blood donors around Bangladesh.
          </p>
          <div className="flex justify-center gap-4">
            {/* Updated Link for Join as a Donor */}
            <Link to="/signUp">
              <button className="btn btn-primary">Join as a Donor</button>
            </Link>
            <Link to="/search">
              <button className="btn btn-secondary">Search Donors</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
