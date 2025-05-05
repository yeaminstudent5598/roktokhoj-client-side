import React from 'react';
import { Link } from 'react-router-dom';

const DonateSection = () => {
  return ( 
    <div className="px-10 grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
      <div className=" mb-4">
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <div className="donate_img">
              <img src="https://i.ibb.co.com/9kvTr6xb/r1.jpg" alt="Donate" className="w-full h-64 object-cover" />
            </div>
            <div className="">
              <span><img src="d1.png" alt="Icon" className="mx-auto hover:bg-red-600 p-4 absolute left-0 right-0 top-60 text-black bg-black" /></span>
              <div className='pt-14'>
              <a href="#">
                <h5 className="text-xl font-semibold mt-2">Become a Donor</h5>
              </a>
              <p className="text-sm text-gray-500 mt-2">
                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give.
              </p>
              </div>
            </div>
            <Link to="/dashboard/create-donation-request" className="btn btn-primary mt-4 w-full">Read More</Link>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <div className="donate_img">
              <img src="https://i.ibb.co.com/s9MrWzxJ/r2.jpg" alt="Blood Donation" className="w-full h-64 object-cover" />
            </div>
            <div className="donate_content">
              <span><img src="https://i.ibb.co.com/hJJNZQZ9/d2.png" alt="Icon" className="mx-auto hover:bg-red-600 bg-black p-4 absolute left-0 right-0 top-60" /></span>
             <div className='pt-14'>
             <a href="#">
                <h5 className="text-xl font-semibold mt-2">Why Give Blood?</h5>
              </a>
              <p className="text-sm text-gray-500 mt-2">
                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give.
              </p>
             </div>
            </div>
            <Link to="/blog" className="btn btn-primary mt-4 w-full">Read More</Link>
          </div>
        </div>
      </div>

      <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
        <div className="card w-full bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <div className="donate_img">
              <img src="https://i.ibb.co.com/BKyxNdLS/r3.jpg" alt="Donations Help" className="w-full h-64 object-cover" />
            </div>
            <div className="donate_content">
              <span><img src="https://i.ibb.co.com/TxTZ8QjZ/d3.png" alt="Icon" className="mx-auto bg-black absolute left-0 right-0 top-60 hover:bg-red-600 p-4" /></span>
              <div className='pt-14'>
              <a href="#">
                <h5 className="text-xl font-semibold mt-2">How Donations Help?</h5>
              </a>
              <p className="text-sm text-gray-500 mt-2">
                But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give.
              </p>
              </div>
            </div>
            <Link to="/blog" className="btn btn-primary mt-4 w-full">Read More</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonateSection;