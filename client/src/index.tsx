import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mantleTestnet, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { assertExists } from "./utils/assertExists";

const env = process.env.NEXT_PUBLIC_MUMBAI_RPC_ENDPOINT;
const { chains, publicClient } = configureChains(
  [mantleTestnet],
  //@ts-ignore
  [alchemyProvider({ apiKey: env }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "ModePay",
  projectId: "1ac6c697e8dfb792117061f61457d73a",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider
      chains={chains}
      theme={darkTheme({
        accentColor: "#806DFF",
        accentColorForeground: "white",
        borderRadius: "medium",
        fontStack: "system",
        overlayBlur: "small",
      })}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
