import { Translation } from "@/translations";
import { Heir } from "@/utils/inheritanceCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";

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
    // Get the element to convert to PDF
    const element = document.getElementById('pdf-content');
    
    if (!element) {
      console.error('PDF content element not found');
      return;
    }

    // Configure html2pdf options
    const options = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: 'inheritance-calculation.pdf',
      image: { 
        type: 'jpeg', 
        quality: 0.98 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true,
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'] 
      }
    };

    // Generate and download PDF
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .catch((error: Error) => {
        console.error('Error generating PDF:', error);
      });
  };

  return (
    <Card className="mt-6 bg-card border-border" dir={isRTL ? 'rtl' : 'ltr'}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-primary">
          {translation.results.title}
        </CardTitle>
        <Button 
          onClick={downloadPDF}
          className="bg-accent hover:bg-accent/90 text-accent-foreground print:hidden"
        >
          <Download className="mr-2 h-4 w-4" />
          {translation.results.downloadPDF}
        </Button>
      </CardHeader>
      <CardContent>
        {/* PDF Content - This section will be converted to PDF */}
        <div id="pdf-content" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Header for PDF */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary mb-4">
              {translation.appTitle}
            </h1>
          </div>

          {/* Net Estate Section */}
          <div className="mb-6 p-4 bg-secondary rounded-lg">
            <p className="text-lg font-semibold text-foreground">
              {translation.results.netEstate}: <span className="text-accent">{formatCurrency(netEstate)}</span>
            </p>
          </div>
          
          {/* Results Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground font-bold border border-border bg-muted">
                  {translation.results.heir}
                </TableHead>
                <TableHead className="text-foreground font-bold border border-border bg-muted">
                  {translation.results.relationship}
                </TableHead>
                <TableHead className="text-foreground font-bold border border-border bg-muted">
                  {translation.results.share}
                </TableHead>
                <TableHead className="text-foreground font-bold border border-border bg-muted">
                  {translation.results.amount}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {heirs.map((heir, index) => (
                <TableRow key={index}>
                  <TableCell className="text-accent font-medium border border-border">
                    {heir.name}
                  </TableCell>
                  <TableCell className="text-accent border border-border">
                    {heir.relationship}
                  </TableCell>
                  <TableCell className="text-accent border border-border">
                    {heir.share}
                  </TableCell>
                  <TableCell className="text-accent font-semibold border border-border">
                    {formatCurrency(heir.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer - Optional timestamp */}
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Generated on: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};