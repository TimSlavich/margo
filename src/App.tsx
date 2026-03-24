import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ContactFormProvider } from "@/contexts/ContactFormContext";
import { FaqProvider } from "@/contexts/FaqContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <LanguageProvider>
    <ContactFormProvider>
    <FaqProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </FaqProvider>
    </ContactFormProvider>
  </LanguageProvider>
);

export default App;
