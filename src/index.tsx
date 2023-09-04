import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PrivyProvider } from '@privy-io/react-auth';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrivyProvider 
        appId="clm4c6m5q018el20fe3zw1hwp"
        config={{
          appearance: {
            accentColor:"#6A6FF5",
            theme:"#FFFFFF",
            showWalletLoginFirst: true,
            logo:"https://xmtp.org/img/logomark.svg"
          },
          loginMethods:["wallet", "email", "google", "twitter", "discord", "github"],
          embeddedWallets:{
            createOnLogin:"users-without-wallets",
            requireUserPasswordOnCreate:false
          },
        }}>
      <App />
    </PrivyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
