
import Hbtn from "../../ui/Buttons/Hbtn";
import NewsletterForm from "./NewsletterForm";



const OtherSections = (props) => {
  return (<>
    <div className='home-features' id='features' style={{marginTop: "10vw"}}>

      <div className="home-feature grid-md-2 gap-3">
        <div className="feature-image">
          <img src="/images/decoration/ChooseandCompete.png" alt='feature' className='ml-md-auto mr-md-6' />
        </div>
        <div className="feature-content">
          <h4 className='haccent'>Choose and Compete</h4>
          <h5 className='my-3'>Get the chance to Earn while you Learn</h5>
          <p className='txt2 fs-4 mb-4'>Choose any Public Contest Based on your favourite Subject or Exam and win 
            contest money with Live tracking of your Performance.</p>
          <Hbtn to="/auth/signup" >Get Started</Hbtn>
        </div>
      </div>

      <div className="home-feature d-grid grid-md-2 gap-3">
        <div className="feature-content">
          <h4 className='haccent'>Challenge Zone</h4>
          <h5 className='my-3'>Customized contests for every subjects</h5>
          <p className='txt2 fs-4 mb-4'>Challenge your friends and find out if they are smart enough to beat you 
          in your favorite subject.</p>
          <Hbtn to="/auth/signup" >Get Started</Hbtn>
        </div>
        <div className="feature-image">
          <img src="/images/decoration/ChallengeZone.png" alt='feature' className='mr-md-auto ml-md-6' />
        </div>
      </div>

      <div className="home-feature grid-md-2 gap-3">
        <div className="feature-image">
          <img src="/images/decoration/PracticeWithAnalysis.png" alt='feature' className='ml-md-auto mr-md-6' />
        </div>
        <div className="feature-content">
          <h4 className='haccent'>Practice with Analysis</h4>
          <h5 className='my-3'>Keep Practicing with personalized analysis</h5>
          <p className='txt2 fs-4 mb-4'>Get Unlimited free Practice contest for any Exam/Subjects and get 
          Personalized analysis of your Performance.</p>
          <Hbtn to="/auth/signup" >Get Started</Hbtn>
        </div>
      </div>

    </div>

    <div className="home-feature-end p-relative mt-md-8">
      <img src="/svg/data.svg" alt="decoration" className='m-auto p-absolute' />
    </div>

    <div className='home-features d-none mt-6'>
      <div className="home-feature grid-md-2 gap-md-3">
        <div className="feature-image">
          <img src="/images/decoration/feature1.webp" alt='feature' className='ml-md-auto mr-md-5' />
        </div>
        <div className="feature-content">
          <h4 className='haccent'>Choose and Compete</h4>
          <h5 className='my-3'>Simple Design Prototyping and collaboration</h5>
          <p className='txt2 fs-4 mb-2'>Choose any Public Contest Based on your favourite Subject or Exam and win 
          contest money with Live tracking of your Performance.</p>
          <ul className='txt2 fs-4 mb-4'>
            <li><span>Unlimited design possibility</span></li>
            <li><span>Beautiful mobile apps</span></li>
            <li><span>Easy project management</span></li>
          </ul>
          <Hbtn to="/auth/signup" >Get Started</Hbtn>
        </div>
      </div>
    </div>


    <div className="home-features mt-5">
      <div className="home-feature d-grid grid-md-2 gap-md-1" style={{marginBottom: '60px'}}>
        <div className="feature-content">
          <h4 className="haccent">Who are you?</h4>
          <h5 className='my-3'>Become the Superstar of your favorite subject.</h5>
          <div className="d-grid quoted gap-2">
            <img src="/images/decoration/left-quote.png" alt="quote" />
            <p className="txt2 fs-4 mb-2 w500">
            Exampto gives you the chance to become the Superstar of your favorite subject. 
            Let the whole country that you are the OG!
            </p>
          </div>
        </div>
        <div className="feature-image review-image-parent p-relative">
          <div className="review-image-div p-relative ml-md-auto">
            <img src="/images/banner1.png" alt="banner" className='review-image' />
          </div>
        </div>
      </div>
    </div>

    <div className="home-plans-section text-center p-relative">
      <div className="home-plans-decoration p-absolute"></div>
      <div className="home-plans-content p-relative">
        <h3 className="haccent pb-3">Hall of Fame</h3>
        <h2>Our previous Achievers</h2>
        <div className="home-plans my-6 d-grid">
          <div>
            <img src="/images/profile1.jpg" alt="achiever" />
            <h6>Virat Thakur</h6>
            <p>What attracted me is the power of the platform with an amazing variety of contests, connections, 
              and learning opportunities to help grow, unleash potential and succeed. I am preparing for SBI and 
              IBPS PO. This platform boosted my confidence when I started earning money for my good performance 
              in the exams.</p>
          </div>
          <div>
            <img src="/images/decoration/winner1.jpeg" alt="achiever" />
            <h6 style={{color: 'white'}}>Are you the next<br/><span style={{fontSize: "2em"}}>Champion?</span></h6>          </div>
          <div>
            <img src="/images/profile2.jpg" alt="achiever" />
            <h6>Shubham Mishra</h6>
            <p>This platform is engaging and interactive to build relevant knowledge which will help you in 
              preparing for competitive exams. I love the array of personalized contests and analyses to help 
              improve the participant’s performance.</p>
          </div>
        </div>
      </div>
    </div>

    <div className="home-ending text-center p-relative">
      <h4>Ready to start learning?</h4>
      <h5 className="w500 mt-4">Don’t miss our new updates</h5>
      <NewsletterForm />
      <img src="/images/decoration/newsletter-human.webp" alt="decoration" className="p-absolute d-mob-none" />
      <img src="/images/decoration/rocket.webp" alt="decoration" className="p-absolute d-mob-none" />
    </div>
  </>);
}

export default OtherSections;