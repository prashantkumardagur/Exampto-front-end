
import Hbtn from "../../ui/Buttons/Hbtn";
import NewsletterForm from "./NewsletterForm";



const OtherSections = (props) => {
  return (<>
    <div className='home-features mt-7' id='features'>

      <div className="home-feature grid-md-2 gap-1">
        <div className="feature-image">
          <img src="/images/decoration/feature1.webp" alt='feature' className='ml-md-auto mr-md-7' />
        </div>
        <div className="feature-content">
          <h4 className='haccent'>Design & Layouts</h4>
          <h5 className='my-3'>Keep Things Simple With Tability Systems</h5>
          <p className='txt2 fs-4 mb-4'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant doloremque laudantium totam rem 
            aperiam eaque quae abillo inventore veritatis etquasi architecto beatae vitae dicta</p>
          <Hbtn to="/auth/signup" >Get Started</Hbtn>
        </div>
      </div>

      <div className="home-feature d-grid grid-md-2 gap-1">
        <div className="feature-content">
          <h4 className='haccent'>Well Combinations</h4>
          <h5 className='my-3'>Perfect Combination For Any Kind Of Device</h5>
          <p className='txt2 fs-4 mb-4'>But I must explain to you how all this mistaken idea of denouncing pleasure 
          praising pain was born and will give complete account the system, and expound the actual teachings of the 
          great explorer truth, the master-builder of human happiness.</p>
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
          <h4 className='haccent'>Design & Layouts</h4>
          <h5 className='my-3'>Keep Things Simple With Tability Systems</h5>
          <p className='txt2 fs-4 mb-4'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusant doloremque laudantium totam rem 
            aperiam eaque quae abillo inventore veritatis etquasi architecto beatae vitae dicta</p>
          <Hbtn to="/auth/signup" >Get Started</Hbtn>
        </div>
      </div>

    </div>

    <div className="home-feature-end p-relative mt-7">
      <img src="/images/decoration/laptop-feature.webp" alt="decoration" className='m-auto p-absolute' />
    </div>

    <div className='home-features d-none mt-6'>
      <div className="home-feature grid-md-2 gap-md-1">
        <div className="feature-image">
          <img src="/images/decoration/feature1.webp" alt='feature' className='ml-md-auto mr-md-7' />
        </div>
        <div className="feature-content">
          <h4 className='haccent'>Work Better Together</h4>
          <h5 className='my-3'>Simple Design Prototyping and collaboration</h5>
          <p className='txt2 fs-4 mb-2'>But I must explain to you how all this mistaken idea of denouncing pleasure 
          praising pain was born and will give complete account the system, and expound the actual teachings of the 
          great explorer truth, the master-builder of human happiness.</p>
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
          <h4 className="haccent">Customer Reviews</h4>
          <h5 className='my-3'>What our customers say about us?</h5>
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
        <h3 className="haccent pb-3">Smart Pricing Plans</h3>
        <h2>Appropriate Pricing Plans</h2>
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