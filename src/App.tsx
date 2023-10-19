import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Recoil from 'recoil'
import * as Pages from '@/pages/_index'
import { SuspenseLoader } from "./components/loader/suspense-loader";
import { useGetMode } from "./api/services/mode";
import { mode } from "./store/mode";

function App() {

  const { data } = useGetMode()

  const setModeAtom = Recoil.useSetRecoilState(mode)

  useEffect(() => {
    if (data?.success) {
      setModeAtom(data.data.app_mode)
    }
  }, [data?.data.app_mode, data?.success, setModeAtom])

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

            {/* auth */}
            <Route path="login" element={<Pages.Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
