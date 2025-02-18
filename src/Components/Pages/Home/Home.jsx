import React from 'react';
import Banner from './Banner';
import FeatureSection from './FeatureSection';
import DonateSection from '../DonateSection/DonateSection';
import HelpSection from '../HelpSection/HelpSection';
import ImpactSection from '../ImpactSection/ImpactSection';
import MissionSection from '../MissionSectionf/MissionSection';
import LandingPage from '../LandingPage/LandingPage';
import BloodNotice from '../BloodNotice/BloodNotice';
// import ContactUs from './ContactUs';


const Home = () => {
    return (
        <div>
            <Banner/>
            <FeatureSection/>
            {/* <ContactUs/> */}
            <DonateSection/>
            <HelpSection/>
            <ImpactSection/>
            <MissionSection/>
            <LandingPage/>
            <BloodNotice/>
            
         
        </div>
    );
};

export default Home;