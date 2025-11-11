import { Translation } from "@/translations";

interface QuranVerseProps {
  translation: Translation;
  isRTL: boolean;
}

export const QuranVerse = ({ translation, isRTL }: QuranVerseProps) => {
  return (
    <div className="bg-card rounded-lg p-6 border border-border h-fit sticky top-6 islamic-pattern">
      <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="border-l-4 border-accent pl-4">
          <p className="text-sm font-semibold text-accent mb-2">
            {translation.quranTranslation}
          </p>
          <p className={`text-foreground leading-relaxed ${isRTL ? 'text-lg' : 'text-base'}`}>
            {translation.quranVerse}
          </p>
        </div>
      </div>
    </div>
  );
};
