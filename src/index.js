import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';

import { AppContextProvider } from './store/AppContext';
import { AuthContextProvider } from './store/AuthContext';

import GlobalLoader from './components/ui/GlobalLoader';

const App = React.lazy(() => import('./App'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Suspense fallback={<GlobalLoader />}>
			<AppContextProvider>
				<AuthContextProvider>
					<App />
				</AuthContextProvider>
			</AppContextProvider>
		</Suspense>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
