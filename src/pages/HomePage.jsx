import NavBar from '../components/global/NavBar'
import HeroSection from "../components/global/Home/HeroSection";
import OtherSections from "../components/global/Home/OtherSections";
import Footer from '../components/global/Footer'



const HomePage = () => {


	return (<div className='home-page'>
		<NavBar home={true} />
		<HeroSection />
		<OtherSections />
		<Footer />
	</div>)
}

export default HomePage;