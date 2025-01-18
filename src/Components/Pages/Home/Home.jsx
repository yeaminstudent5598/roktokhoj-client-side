import React from 'react';
import Banner from './Banner';
import FeatureSection from './FeatureSection';
import ContactUs from './ContactUs';
import ExtraSection from './ExtraSection';

const Home = () => {
    return (
        <div>
            <Banner/>
            <FeatureSection/>
            <ContactUs/>
            <ExtraSection/>
        </div>
    );
};

export default Home;