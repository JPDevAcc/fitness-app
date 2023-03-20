import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter as Router } from 'react-router-dom';
import { UserProvider } from './contexts/User';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
		<UserProvider>
			<Router>
				<App />
			</Router>
		</UserProvider>
  </React.StrictMode>
);