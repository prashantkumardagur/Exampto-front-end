import IconHolder from '../../ui/IconHolder';
import Hbtn from '../../ui/Buttons/Hbtn';



const HeroSection = () => {
  return (
    <div className="hero-section p-relative">

      <div className="hero-content p-relative">
        <h1 className='w500'>Are you the Next Champion?!</h1>
        <p className='fs-4 my-5'>Welcome to EXAMPTO - India’s Trusted Platform for Exam-based Battleground. 
        We provide a Gamified platform to Practice, Compete and Win Real Cash from different exams that TOP 
        Educators curate. Start your journey with us. Let us showcase your Talent.
        </p>
        <div className="hero-btn d-md-flex align-center">
          <Hbtn to="/auth/signup" className="mr-3" >Sign Up Now</Hbtn>
          <a href='#features' className="hbtn t-2 htype2 d-inflex mt-2 mt-md-1 ml-4 ml-md-1">
            View Features 
            <IconHolder icon="east" color="white" className="ml-2" />
          </a>
        </div>
      </div>
            
      <div className="hero-decoration">
        <div className="gradient-circle p-absolute"></div>
        <img src="/svg/HeroImage.svg" alt='decoration' className='hero-image-1 p-absolute' />
        <img src="/images/decoration/product-star.png" alt='decoration' className='p-absolute hero-image-2' />
      </div>

    </div>
  );
}

export default HeroSection;