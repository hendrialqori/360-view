import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import * as Pages from '@/pages/_index'

function App() {
  return (
    <Suspense fallback={<>load ...</>}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Pages.Home />} />
            <Route path="editor/:idTour" element={<Pages.Editor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
