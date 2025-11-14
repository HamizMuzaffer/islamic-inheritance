import { translations } from "@/translations";
import { Button } from "@/components/ui/button";

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages = [
  { code: 'english', name: 'English', flag: '🇬🇧' },
  { code: 'urdu', name: 'اردو', flag: '🇵🇰' },
  { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'bangla', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'arabic', name: 'العربية', flag: '🇸🇦' },
  { code: 'bahasa', name: 'Bahasa', flag: '🇮🇩' },
  { code: 'malay', name: 'Melayu', flag: '🇲🇾' },
  { code: 'french', name: 'Français', flag: '🇫🇷' },
];

export const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const handleLanguageChange = (language: string) => {
    localStorage.setItem('preferredLanguage', language);
    onLanguageChange(language);
  }
  return (
    <div className="bg-card rounded-lg p-6 border border-border h-fit sticky top-6">
      <h3 className="text-lg font-semibold mb-4 text-accent">Languages</h3>
      <div className="space-y-2">
        {languages.map((lang) => (
          <Button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            variant={currentLanguage === lang.code ? "default" : "secondary"}
            className="w-full justify-start text-left transition-all"
          >
            <span className="text-xl mr-3">{lang.flag}</span>
            <span className="font-medium">{lang.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
