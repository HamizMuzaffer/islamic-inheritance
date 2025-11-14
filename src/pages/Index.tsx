import { useEffect, useState } from "react";
import { translations } from "@/translations";
import { LanguageSelector } from "@/components/LanguageSelector";
import { QuranVerse } from "@/components/QuranVerse";
import { InheritanceForm } from "@/components/InheritanceForm";
import { ResultsTable } from "@/components/ResultsTable";
import { calculateInheritance, InheritanceInput, Heir } from "@/utils/inheritanceCalculator";


const Index = () => {

  useEffect(() => {
    const language = localStorage.getItem('preferredLanguage') || localStorage.setItem('preferredLanguage', 'english');
    if (language) {
      setCurrentLanguage(language);
    }
  }, []);
  const [currentLanguage, setCurrentLanguage] = useState('english');
  const [heirs, setHeirs] = useState<Heir[]>([]);
  const [netEstate, setNetEstate] = useState(0);
  
  const translation = translations[currentLanguage];
  const isRTL = ['urdu', 'arabic'].includes(currentLanguage);

  const handleCalculate = (data: InheritanceInput) => {
    const calculatedHeirs = calculateInheritance(data);
    setHeirs(calculatedHeirs);
    setNetEstate(data.totalAssets - data.financialLiabilities);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {translation.appTitle}
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto rounded-full"></div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quran Verse - Left Column */}
          <div className="lg:col-span-3">
            <QuranVerse translation={translation} isRTL={isRTL} />
          </div>

          {/* Form - Center Column */}
          <div className="lg:col-span-6">
            <InheritanceForm 
              translation={translation} 
              onCalculate={handleCalculate}
              isRTL={isRTL}
            />
            
            {/* Results */}
            {heirs.length > 0 && (
              <ResultsTable 
                translation={translation}
                heirs={heirs}
                netEstate={netEstate}
                isRTL={isRTL}
              />
            )}
          </div>

          {/* Language Selector - Right Column */}
          <div className="lg:col-span-3">
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
