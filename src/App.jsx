import LandingPage from "./LandingPage";
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <>
      <LandingPage />
      <Toaster position="top-right" />
    </>
  );
}