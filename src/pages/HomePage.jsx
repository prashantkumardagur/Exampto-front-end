import { useContext } from "react";

import AppContext from "../store/AppContext";
import AuthContext from "../store/AuthContext";

import { downloadSolutionAPI } from "../api/editor";
import { downloadFile } from "../lib/downloadFile";



const HomePage = () => {
	const { token } = useContext(AuthContext);
	const { setModel, showAlert } = useContext(AppContext);

	// Example model handler
	const handleModel = () => {
		setModel({
			heading: "Download Solution?",
			text: "Download the solution file of a random exam for testing.",
			onContinue : async () => { 
				let response = await downloadSolutionAPI(token, '62ab03c7b3a1a9ae40ed2c2b');
				if (response.type === 'application/pdf') {
					downloadFile(response, 'solution.pdf');
				} else { 
					showAlert('Error downloading solution.');
				}
			},
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
		<button className="btn primary" onClick={handleModel}>Primary</button>
	</>)
}

export default HomePage;