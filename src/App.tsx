import { useState } from "react";
import { MainPage, SearchPage, NextDaysPage } from "./pages";
import { Route, Routes } from "react-router-dom";
import ApiProvider from "./contexts/ApiProvider";
import MeteoProvider from "./contexts/MeteoContext";
import LocalisationProvider from "./contexts/LocalisationContext";

function App() {
  
  return (
    <div className="max-w-md w-full min-h-screen bg-white/30 text-[#303345]">
      <ApiProvider>
        <LocalisationProvider>
          <MeteoProvider>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/next_days" element={<NextDaysPage />} />
            </Routes>
          </MeteoProvider>
        </LocalisationProvider>
      </ApiProvider>
    </div>
  );
}

export default App;
