import { useContext } from "react";

import AppContext from "../store/AppContext";



const HomePage = () => {
	const { setModel, showAlert } = useContext(AppContext);

	// Example model handler
	const handleModel = () => {
		setModel({
			heading: "Model Heading",
			text: "Model Content lorem ipsum des content.",
			onContinue : () => { console.log('Continue'); },
		})
	}

	// Example alert handler
	const handleAlert = () => {
		showAlert("Alert Content lorem ipsum des content.");
	}



	return (<>
		<h1 className="pb-2">This is Homepage</h1>
		<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse optio molestiae, sunt eos laudantium 
				voluptatum consequuntur quasi sapiente vitae dolor!</p>
		<button className="btn primary" onClick={handleAlert}>Primary</button>
	</>)
}

export default HomePage;