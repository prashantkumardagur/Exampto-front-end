
import Hbtn from "../../ui/Buttons/Hbtn";
import NewsletterForm from "./NewsletterForm";



const OtherSections = (props) => {
  return (<>
    <div className='home-features' id='features' style={{marginTop: "30vw"}}>

      <div className="home-feature grid-md-2 gap-1">
        <div className="feature-image">
          <img src="/images/decoration/feature1.webp" alt='feature' className='ml-md-auto mr-md-7' />
        </div>
        <div className="feature-content">
          <h4 className='haccent'>Choose and Compete</h4>
          <h5 className='my-3'>Get the chance to Earn while you Learn</h5>
          <p className='txt2 fs-4 mb-4'>Choose any Public Contest Based on your favourite Subject or Exam and win 
            contest money with Live tracking of your Performance.</p>
          <Hbtn to="/auth/signup" >Get Started</Hbtn>
        </div>
      </div>

      <div className="home-feature d-grid grid-md-2 gap-1">
        <div className="feature-content">
          <h4 className='haccent'>Challenge Zone</h4>
          <h5 className='my-3'>Customized contests for every subjects</h5>
          <p className='txt2 fs-4 mb-4'>Decide your subject and  Challenge your friend/group for 1V1/Team 
          match. We will arrange Customized contest according to Subject.</p>
          <Hbtn to="/auth/signup" >Get Started</Hbtn>
        </div>
        <div className="feature-image">
          <img src="/images/decoration/feature2.webp" alt='feature' className='mr-md-auto ml-md-7' />
        </div>
      </div>

      <div className="home-feature grid-md-2 gap-1">
        <div className="feature-image">
          <img src="/images/decoration/feature1.webp" alt='feature' className='ml-md-auto mr-md-7' />
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
      <img src="/images/decoration/laptop-feature.webp" alt="decoration" className='m-auto p-absolute' />
    </div>

    <div className='home-features d-none mt-6'>
      <div className="home-feature grid-md-2 gap-md-1">
        <div className="feature-image">
          <img src="/images/decoration/feature1.webp" alt='feature' className='ml-md-auto mr-md-7' />
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
          <h5 className='my-3'>You can be the superstar of your favorite subject</h5>
          <div className="d-grid quoted gap-2">
            <img src="/images/decoration/left-quote.png" alt="quote" />
            <p className="txt2 fs-4 mb-2 w500">
              You might be famous in your home, school or city but exmpto gives you the chance to become superstar of 
              subject and let the whole country know who are the real talented superstars whom they should follow.
            </p>
          </div>
        </div>
        <div className="feature-image review-image-parent p-relative">
          <div className="review-image-div p-relative ml-md-auto">
            <div className="review-circle p-absolute"></div>
            <img src="/images/decoration/right-quote.png" alt="quote" className='review-quote p-absolute' />
            <div className="review-decoration">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="review-persons">
              <img src="/images/person.jpg" alt="person" />
              <img src="/images/person.jpg" alt="person" />
              <img src="/images/person.jpg" alt="person" />
              <img src="/images/person.jpg" alt="person" />
              <img src="/images/person.jpg" alt="person" />
            </div>
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
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>

    <div className="home-ending text-center p-relative">
      <h4>Ready to start learning?</h4>
      <h5 className="w500 mt-4">Enter your email for an invite!</h5>
      <NewsletterForm />
      <img src="/images/decoration/newsletter-human.webp" alt="decoration" className="p-absolute d-mob-none" />
      <img src="/images/decoration/rocket.webp" alt="decoration" className="p-absolute d-mob-none" />
    </div>
  </>);
}

export default OtherSections;