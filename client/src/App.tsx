import React from "react";
import "./App.css";
import GroupChat from "./components/GroupChat";
import ChatUI from "./components/GroupChatUI";
import Landing from "./pages/landing";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai, sepolia, modeTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import Register from "./pages/register";

const { chains, publicClient } = configureChains(
  [modeTestnet],
  [
    alchemyProvider({ apiKey: "nGNX2rQ-BAd_erhkV5BCRFI_0FHnl1a3" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Mode Pay",
  projectId: "b20ec248fdbe746a0f8306abfacf7468",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({
            accentColor: "#353535",
            accentColorForeground: "#FFF",
            borderRadius: "medium",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <Router>
            <Routes>
              <Route path="/" Component={Landing} />
              <Route path="/register" Component={Register} />
              {/* <Route path="/contact" component={Contact} /> */}
            </Routes>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

{
  /* <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <h1 className="text-3xl font-bold underline text-red-600">
            Simple React Typescript Tailwind Sample
          </h1>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <GroupChat /> 
         <ChatUI />
      </div> */
}

export default App;
