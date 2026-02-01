import { Translation } from "@/translations";
import { Heir, HeirNameKey, ShareKey } from "@/utils/inheritanceCalculator";
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

  // ─── Translate structured keys from the calculator into display strings ────
  // The calculator returns keys like 'wife', { key: 'son', index: 2 }, '2x_residue'
  // This layer converts them using the active translation object.

  const translateName = (nameKey: HeirNameKey): string => {
    if (typeof nameKey === 'string') {
      // Simple keys: 'wife', 'husband', 'father', 'mother'
      return translation.heirs[nameKey];
    }
    // Indexed keys: { key: 'son', index: 2 } → "ابن 2" or "Son 2"
    return `${translation.heirs[nameKey.key]} ${nameKey.index}`;
  };

  const translateRelationship = (key: string): string => {
    return translation.relationships[key] ?? key;
  };

  const translateShare = (shareKey: ShareKey): string => {
    // Special keys get translated; plain fraction strings like '1/6' pass through
    if (shareKey in translation.shares) {
      return translation.shares[shareKey];
    }
    return shareKey;
  };

  const downloadPDF = () => {
    const element = document.getElementById('pdf-content');
    if (!element) {
      console.error('PDF content element not found');
      return;
    }

    const options = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: 'inheritance-calculation.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf()
      .set(options)
      .from(element)
      .save()
      .catch((error: Error) => {
        console.error('Error generating PDF:', error);
      });
  };

  return (
    <Card className="mt-6 bg-white border-border" dir={isRTL ? 'rtl' : 'ltr'}>
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
        <div id="pdf-content" dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary mb-4">
              {translation.appTitle}
            </h1>
          </div>

          {/* Net Estate — use text-foreground for guaranteed contrast on bg-secondary */}
          <div className="mb-6 p-4 bg-secondary rounded-lg">
            <p className="text-lg font-semibold text-foreground">
              {translation.results.netEstate}:{' '}
              <span className="font-bold text-foreground">{formatCurrency(netEstate)}</span>
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
            <TableBody className="bg-gray-900">
              {heirs.map((heir, index) => (
                <TableRow key={index}>
                  {/* text-foreground ensures readable contrast on any bg-card */}
                  <TableCell className="text-foreground font-medium border border-border">
                    {translateName(heir.nameKey)}
                  </TableCell>
                  <TableCell className="text-foreground border border-border">
                    {translateRelationship(heir.relationshipKey)}
                  </TableCell>
                  <TableCell className="text-foreground border border-border">
                    {translateShare(heir.shareKey)}
                  </TableCell>
                  <TableCell className="text-foreground font-semibold border border-border">
                    {formatCurrency(heir.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer — translated */}
          <div className="mt-6 text-sm text-muted-foreground">
            <p>{translation.results.generatedOn}: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};