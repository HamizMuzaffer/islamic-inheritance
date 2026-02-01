import { Translation } from "@/translations";
import { Heir, HeirNameKey } from "@/utils/inheritanceCalculator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import html2pdf from "html2pdf.js";

interface ResultsTableProps {
  translation: Translation;
  heirs: Heir[];
  netEstate: number;
  isRTL: boolean;
}

export const ResultsTable = ({
  translation,
  heirs,
  netEstate,
  isRTL,
}: ResultsTableProps) => {
  // ─── Currency formatting ────────────────────────────────────────────────
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);

  // ─── Translation helpers ────────────────────────────────────────────────
  // These handle BOTH the new key-based shape ({ nameKey, relationshipKey,
  // shareKey }) AND the legacy string shape ({ name, relationship, share })
  // so the table works regardless of which calculator version produced the data.

  const translateName = (heir: any): string => {
    // ── New shape: heir.nameKey exists ──
    if (heir.nameKey !== undefined) {
      const nameKey: HeirNameKey = heir.nameKey;

      if (typeof nameKey === "string") {
        // Simple keys: 'wife', 'husband', 'father', 'mother'
        return translation.heirs?.[nameKey] ?? nameKey;
      }
      // Indexed keys: { key: 'son', index: 2 }
      const label = translation.heirs?.[nameKey.key] ?? nameKey.key;
      return `${label} ${nameKey.index}`;
    }

    // ── Legacy shape: heir.name is a plain English string like "Son 1" ──
    // Parse it and re-translate so the script actually changes.
    const raw: string = heir.name ?? "";

    // Indexed names: "Son 1", "Daughter 2", "Brother 1", "Sister 3"
    const indexedMatch = raw.match(
      /^(Son|Daughter|Brother|Sister)\s+(\d+)$/i
    );
    if (indexedMatch) {
      const key = indexedMatch[1].toLowerCase(); // 'son' | 'daughter' | ...
      const idx = indexedMatch[2];
      const label = translation.heirs?.[key] ?? key;
      return `${label} ${idx}`;
    }

    // Simple names: "Wife", "Husband", "Father", "Mother"
    const simpleKey = raw.toLowerCase(); // 'wife' | 'husband' | 'father' | 'mother'
    return translation.heirs?.[simpleKey] ?? raw;
  };

  const translateRelationship = (heir: any): string => {
    // New shape
    if (heir.relationshipKey !== undefined) {
      return translation.relationships?.[heir.relationshipKey] ?? heir.relationshipKey;
    }
    // Legacy shape: heir.relationship = "Spouse" | "Parent" | "Child" | "Sibling"
    const key = (heir.relationship ?? "").toLowerCase();
    return translation.relationships?.[key] ?? heir.relationship ?? "";
  };

  const translateShare = (heir: any): string => {
    // New shape
    if (heir.shareKey !== undefined) {
      const shareKey: string = heir.shareKey;
      // Special keys get translated; plain fractions like '1/6' are universal
      if (translation.shares && shareKey in translation.shares) {
        return translation.shares[shareKey];
      }
      return shareKey;
    }
    // Legacy shape: heir.share = "1/6" | "Residue" | "2x (Residue)" | "Sole Heir" | ...
    const raw: string = heir.share ?? "";
    const key = raw
      .toLowerCase()
      .replace(/\s*\(residue\)/i, "_residue")   // "2x (Residue)" → "2x_residue"
      .replace(/residue/i, "residue")
      .replace(/sole heir/i, "sole_heir")
      .trim();
    if (translation.shares && key in translation.shares) {
      return translation.shares[key];
    }
    return raw; // fractions like '1/6' pass through as-is (universal symbols)
  };

  // ─── PDF export ─────────────────────────────────────────────────────────
  const downloadPDF = () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;

    html2pdf()
      .set({
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: "inheritance-calculation.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      })
      .from(element)
      .save()
      .catch((err: Error) => console.error("PDF error:", err));
  };

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <Card className="mt-6 bg-card border-border" dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold text-primary">
          {translation.results.title}
        </CardTitle>
        <Button
          onClick={downloadPDF}
          className="bg-accent hover:bg-accent/90 text-accent-foreground print:hidden"
        >
          <Download className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
          {translation.results.downloadPDF}
        </Button>
      </CardHeader>

      <CardContent>
        <div id="pdf-content" dir={isRTL ? "rtl" : "ltr"}>
          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-primary mb-4">
              {translation.appTitle}
            </h1>
          </div>

          {/* Net Estate */}
          <div className="mb-6 p-4 bg-secondary rounded-lg">
            <p className="text-lg font-semibold text-foreground">
              {translation.results.netEstate}:{" "}
              <span className="font-bold text-foreground">
                {formatCurrency(netEstate)}
              </span>
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
                  <TableCell className="text-foreground font-medium border border-border">
                    {translateName(heir)}
                  </TableCell>
                  <TableCell className="text-foreground border border-border">
                    {translateRelationship(heir)}
                  </TableCell>
                  <TableCell className="text-foreground border border-border">
                    {translateShare(heir)}
                  </TableCell>
                  <TableCell className="text-foreground font-semibold border border-border">
                    {formatCurrency(heir.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer */}
          <div className="mt-6 text-sm text-muted-foreground">
            <p>
              {translation.results.generatedOn}:{" "}
              {new Date().toLocaleDateString(
                isRTL ? "ar-SA" : undefined
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};