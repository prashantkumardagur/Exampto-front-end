const HeroSection = () => {
  return (<div className="hero-section grid-lg-2 gap-5">
    <div style={{gridArea: "heroSectionImage"}}>
      <img src="/svg/hero.svg" alt="svg" className="ml-lg-auto" />
    </div>
    <div style={{gridArea: "heroSectionHeading"}}>
      <h1 className="w600">Online mock tests to boost your preparation</h1>
      <p className="txt2 mt-3 fs-2">Welcome to EXAMPTO - India’s Trusted Platform for Exam based Battleground .Exampto Provides Gamified platform 
        to Practice ,Compete and Win Real Cash from different exams oriented tests curated by TOP Educators .Start your 
        journey and Lets Showcase the world your Real talent .</p>
      <button className="btn primary mt-5">Register Now</button>
      <button className="btn secondary mt-5 ml-2">Login to dashboard</button>
    </div>
  </div>);
}

export default HeroSection;