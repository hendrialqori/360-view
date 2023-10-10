import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import * as Pages from '@/pages/_index'
import { SuspenseLoader } from "./components/loader/suspense-loader";

function App() {
  return (
    <Suspense
      fallback={<SuspenseLoader />}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Pages.Home />} />
            <Route path="tour/:idTour" element={<Pages.Tour />} />
            <Route path="list-tour" element={<Pages.Tours />} />
            <Route path="editor/:idTour" element={<Pages.Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
