import { Link } from 'react-router-dom';


const Footer = (props) => {
  return (<footer className="footer bg3 mt-7 pt-6">
    <div className="grid-md-2 gap-5" style={{padding: '0 5vw 60px'}}>
      <div>
        <h3>Exampto</h3>
        <p className="txt2 fs-2 mt-2">India’s Trusted Platform for Exam based Battleground .Exampto Provides Gamified platform to Practice, 
          Compete and Win Real Cash from different exams oriented tests curated by TOP Educators. 
          Start your journey and Lets Showcase the world your Real talent.</p>
      </div>
      <div className="grid-md-2 gap-5">
        <div className="footer-section">
          <h5>Company</h5>
          <ul className="footer-links fs-2 mt-2">
            <li><Link to={'/'} >Home</Link></li>
            <li><Link to={'/about-us'} >About Us</Link></li>
            <li><Link to={'/privacy-policy'} >Privacy Policy</Link></li>
            <li><Link to={'/terms-and-conditions'} >Terms and Conditions</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h5>Help and Support</h5>
          <ul className="footer-links fs-2 mt-2">
            <li><Link to={'/'} >Contact Us</Link></li>
            <li><Link to={'/'} >Guidelines</Link></li>
            <li><Link to={'/'} >Refund Policy</Link></li>
            <li><Link to={'/'} >Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="copyright-area text-center p-4">
      <p className="grey fs-1">Copyright @ Exampto Pvt Ltd 2022. All rights reversed.</p>
    </div>
  </footer>);
}

export default Footer;