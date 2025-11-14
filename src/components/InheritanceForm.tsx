import { useState } from "react";
import { Translation } from "@/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InheritanceInput } from "@/utils/inheritanceCalculator";

interface InheritanceFormProps {
  translation: Translation;
  onCalculate: (data: InheritanceInput) => void;
  isRTL: boolean;
}

export const InheritanceForm = ({ translation, onCalculate, isRTL }: InheritanceFormProps) => {
  const [formData, setFormData] = useState<InheritanceInput>({
    totalAssets: undefined,
    financialLiabilities: undefined,
    debtAmount: undefined,
    bequestsAmount: undefined,
    distributableEstate: undefined,
    genderDeceased: 'male',
    parentsStatus: 'none',
    sons: undefined,
    daughters: undefined,
    brothers: undefined,
    sisters: undefined,
    hasSpouse: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const updateField = (field: keyof InheritanceInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-card border-border" dir={isRTL ? 'rtl' : 'ltr'}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">
          {translation.form.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Total Assets */}
          <div className="space-y-2">
            <Label htmlFor="totalAssets">{translation.form.totalAssets}</Label>
            <Input
              id="totalAssets"
              type="number"
              min="0"
              value={formData.totalAssets}
              onChange={(e) => updateField('totalAssets', parseFloat(e.target.value) || 0)}
              className="bg-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="debtAmount">{translation.form.debtAmount}</Label>
            <Input
              id="debtAmount"
              type="number"
              min="0"
              value={formData.debtAmount}
              onChange={(e) => updateField('debtAmount', parseFloat(e.target.value) || 0)}
              className="bg-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bequestsAmount">{translation.form.bequestsAmount}</Label>
            <Input
              id="bequestsAmount"
              type="number"
              min="0"
              value={formData.bequestsAmount}
              onChange={(e) => updateField('bequestsAmount', parseFloat(e.target.value) || 0)}
              className="bg-input"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="distributableEstate">{translation.form.distributableEstate}</Label>
            <Input
              id="distributableEstate"
              type="number"
              min="0"
              value={formData.distributableEstate}
              onChange={(e) => updateField('distributableEstate', parseFloat(e.target.value) || 0)}
              className="bg-input"
              required
            />
          </div>

          {/* Financial Liabilities */}
          <div className="space-y-2">
            <Label htmlFor="liabilities">{translation.form.financialLiabilities}</Label>
            <Input
              id="liabilities"
              type="number"
              min="0"
              value={formData.financialLiabilities}
              onChange={(e) => updateField('financialLiabilities', parseFloat(e.target.value) || 0)}
              className="bg-input"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label>{translation.form.genderDeceased}</Label>
            <RadioGroup
              value={formData.genderDeceased}
              onValueChange={(value) => updateField('genderDeceased', value)}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male" className="cursor-pointer">{translation.form.male}</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female" className="cursor-pointer">{translation.form.female}</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Spouse Status */}
          <div className="space-y-2">
            <Label>{translation.form.spouseStatus}</Label>
            <RadioGroup
              value={formData.hasSpouse ? 'has' : 'none'}
              onValueChange={(value) => updateField('hasSpouse', value === 'has')}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="has" id="hasSpouse" />
                <Label htmlFor="hasSpouse" className="cursor-pointer">{translation.form.hasSpouse}</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="none" id="noSpouse" />
                <Label htmlFor="noSpouse" className="cursor-pointer">{translation.form.noSpouse}</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Parents */}
          <div className="space-y-2">
            <Label>{translation.form.parentsAlive}</Label>
            <RadioGroup
              value={formData.parentsStatus}
              onValueChange={(value) => updateField('parentsStatus', value)}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both" className="cursor-pointer">{translation.form.both}</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="father" id="father" />
                <Label htmlFor="father" className="cursor-pointer">{translation.form.father}</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="mother" id="mother" />
                <Label htmlFor="mother" className="cursor-pointer">{translation.form.mother}</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="none" id="noParents" />
                <Label htmlFor="noParents" className="cursor-pointer">{translation.form.none}</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Children */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{translation.form.childrenOfDeceased}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sons">{translation.form.sons}</Label>
                <Input
                  id="sons"
                  type="number"
                  min="0"
                  value={formData.sons}
                  onChange={(e) => updateField('sons', parseInt(e.target.value) || 0)}
                  className="bg-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="daughters">{translation.form.daughters}</Label>
                <Input
                  id="daughters"
                  type="number"
                  min="0"
                  value={formData.daughters}
                  onChange={(e) => updateField('daughters', parseInt(e.target.value) || 0)}
                  className="bg-input"
                />
              </div>
            </div>
          </div>

          {/* Siblings */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{translation.form.siblingsOfDeceased}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brothers">{translation.form.brothers}</Label>
                <Input
                  id="brothers"
                  type="number"
                  min="0"
                  value={formData.brothers}
                  onChange={(e) => updateField('brothers', parseInt(e.target.value) || 0)}
                  className="bg-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sisters">{translation.form.sisters}</Label>
                <Input
                  id="sisters"
                  type="number"
                  min="0"
                  value={formData.sisters}
                  onChange={(e) => updateField('sisters', parseInt(e.target.value) || 0)}
                  className="bg-input"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {translation.form.calculate}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
