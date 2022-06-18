import { useContext } from "react";

import AppContext from "../store/AppContext";

const HomePage = () => {
	const { setModel, hideModel, showAlert } = useContext(AppContext);

	const handleModel = () => {
		setModel({
			heading: "Model Heading",
			text: "Model Content lorem ipsum des content.",
			onContinue : () => { console.log('Continue'); hideModel(); },
			onCancel : () => { console.log('Cancel'); hideModel(); }
		})
	}

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