import { Translation } from "@/translations";
import { Heir } from "@/utils/inheritanceCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ResultsTableProps {
  translation: Translation;
  heirs: Heir[];
  netEstate: number;
  isRTL: boolean;
}

export const ResultsTable = ({ translation, heirs, netEstate, isRTL }: ResultsTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(18);
    doc.text(translation.appTitle, 14, 20);
    
    doc.setFontSize(12);
    doc.text(`${translation.results.netEstate}: ${formatCurrency(netEstate)}`, 14, 30);
    
    // Add table
    autoTable(doc, {
      startY: 40,
      head: [[
        translation.results.heir,
        translation.results.relationship,
        translation.results.share,
        translation.results.amount,
      ]],
      body: heirs.map(heir => [
        heir.name,
        heir.relationship,
        heir.share,
        formatCurrency(heir.amount),
      ]),
      theme: 'grid',
      headStyles: {
        fillColor: [33, 70, 138],
        textColor: 255,
      },
    });
    
    doc.save('inheritance-calculation.pdf');
  };

  return (
    <Card className="mt-6 bg-card border-border" dir={isRTL ? 'rtl' : 'ltr'}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-primary">
          {translation.results.title}
        </CardTitle>
        <Button 
          onClick={downloadPDF}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <Download className="mr-2 h-4 w-4" />
          {translation.results.downloadPDF}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-4 bg-secondary rounded-lg">
          <p className="text-lg font-semibold text-foreground">
            {translation.results.netEstate}: <span className="text-accent">{formatCurrency(netEstate)}</span>
          </p>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground font-bold">{translation.results.heir}</TableHead>
              <TableHead className="text-foreground font-bold">{translation.results.relationship}</TableHead>
              <TableHead className="text-foreground font-bold">{translation.results.share}</TableHead>
              <TableHead className="text-foreground font-bold">{translation.results.amount}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {heirs.map((heir, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{heir.name}</TableCell>
                <TableCell>{heir.relationship}</TableCell>
                <TableCell>{heir.share}</TableCell>
                <TableCell className="text-accent font-semibold">{formatCurrency(heir.amount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
