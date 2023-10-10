import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const _ROOT = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

_ROOT.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </RecoilRoot>
);
