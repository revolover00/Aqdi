'use client';

import { useState, useCallback } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Contract } from '../types';
import { fetchArabicFont } from '../lib/pdf/fontLoader';

export function usePDFGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Simple Arabic RTL shaping helper
  const renderText = (text: string, lang: 'ar' | 'en'): string => {
    if (lang === 'en') return text;
    // Reverse Arabic text visually so pdf-lib draws it RTL
    const tokens = text.split(/(\s+)/);
    const processed = tokens.map((t) => {
      if (/[\u0600-\u06FF]/.test(t)) {
        return t.split('').reverse().join('');
      }
      return t;
    });
    return processed.reverse().join('');
  };

  const generatePDF = useCallback(async (contract: Contract): Promise<Uint8Array> => {
    setIsGenerating(true);
    setError(null);
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595.28, 841.89]); // A4 Size
      const { width, height } = page.getSize();
      
      // Load Arabic Font with standard Helvetica fallback if all requests fail
      let font;
      try {
        const fontBytes = await fetchArabicFont();
        font = await pdfDoc.embedFont(fontBytes);
      } catch (fontErr) {
        console.error('[usePDFGenerator] Failed to load Noto Sans Arabic, falling back to Helvetica:', fontErr);
        font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      }
      
      const isAr = contract.language === 'ar';
      const textX = (str: string, size = 11, alignRight = isAr): number => {
        if (!alignRight) return 40;
        const widthText = font.widthOfTextAtSize(str, size);
        return width - 40 - widthText;
      };

      // Header Brand
      page.drawText(renderText('عقدي | Aqdi', contract.language), {
        x: textX('عقدي | Aqdi', 14),
        y: height - 50,
        size: 14,
        font: font,
        color: rgb(233 / 255, 69 / 255, 96 / 255),
      });

      // Contract Type Header
      const titleText = isAr ? 'عقد تقديم خدمات تقنية' : `${contract.type.toUpperCase()} Services Contract`;
      page.drawText(renderText(titleText, contract.language), {
        x: textX(titleText, 16),
        y: height - 90,
        size: 16,
        font: font,
        color: rgb(26 / 255, 26 / 255, 46 / 255),
      });

      let currentY = height - 130;

      // Draw Section Heading helper
      const drawHeading = (heading: string) => {
        // Draw card/bar background
        page.drawRectangle({
          x: 40,
          y: currentY - 5,
          width: width - 80,
          height: 22,
          color: rgb(22 / 255, 33 / 255, 62 / 255),
        });
        page.drawText(renderText(heading, contract.language), {
          x: textX(heading, 11),
          y: currentY,
          size: 11,
          font: font,
          color: rgb(1, 1, 1),
        });
        currentY -= 40;
      };

      // 1. Parties Info
      const partyTitle = isAr ? 'أطراف التعاقد' : 'Contracting Parties';
      drawHeading(partyTitle);

      const fText = isAr ? `المستقل: ${contract.freelancer.name} (${contract.freelancer.country})` : `Freelancer: ${contract.freelancer.name} (${contract.freelancer.country})`;
      const cText = isAr ? `العميل: ${contract.client.name} (${contract.client.country})` : `Client: ${contract.client.name} (${contract.client.country})`;

      page.drawText(renderText(fText, contract.language), { x: textX(fText, 11), y: currentY, size: 11, font });
      currentY -= 20;
      page.drawText(renderText(cText, contract.language), { x: textX(cText, 11), y: currentY, size: 11, font });
      currentY -= 45;

      // 2. Scope & Deliverables
      const scopeTitle = isAr ? 'طبيعة العمل والتسليمات' : 'Project Scope & Deliverables';
      drawHeading(scopeTitle);

      const sTitle = isAr ? `اسم المشروع: ${contract.scope.title}` : `Project: ${contract.scope.title}`;
      page.drawText(renderText(sTitle, contract.language), { x: textX(sTitle, 11), y: currentY, size: 11, font });
      currentY -= 20;

      const sDesc = isAr ? `الوصف: ${contract.scope.description}` : `Description: ${contract.scope.description}`;
      const descChunk = sDesc.substring(0, 75);
      page.drawText(renderText(descChunk, contract.language), { x: textX(descChunk, 10), y: currentY, size: 10, font });
      currentY -= 35;

      // Deliverables List
      contract.scope.deliverables.slice(0, 3).forEach((del) => {
        const itemLine = `• ${del}`;
        page.drawText(renderText(itemLine, contract.language), { x: textX(itemLine, 10), y: currentY, size: 10, font });
        currentY -= 18;
      });
      currentY -= 20;

      // 3. Pricing
      const pricingTitle = isAr ? 'المستحقات وشروط الدفع والتواريخ' : 'Financials & Milestones';
      drawHeading(pricingTitle);

      const amountText = isAr
        ? `القيمة الإجمالية: ${contract.pricing.amount} ${contract.pricing.currency}`
        : `Total Amount: ${contract.pricing.amount} ${contract.pricing.currency}`;
      const paymentPref = isAr
        ? `شروط الدفع: ${contract.pricing.paymentTerms}`
        : `Payment Terms: ${contract.pricing.paymentTerms}`;
      const datesText = isAr
        ? `الفترة الزمنية: من ${contract.dates.startDate} إلى ${contract.dates.endDate}`
        : `Contract Duration: From ${contract.dates.startDate} To ${contract.dates.endDate}`;

      page.drawText(renderText(amountText, contract.language), { x: textX(amountText, 11), y: currentY, size: 11, font });
      currentY -= 20;
      page.drawText(renderText(paymentPref, contract.language), { x: textX(paymentPref, 11), y: currentY, size: 11, font });
      currentY -= 20;
      page.drawText(renderText(datesText, contract.language), { x: textX(datesText, 11), y: currentY, size: 11, font });
      currentY -= 40;

      // Signatures
      if (contract.signatureDataUrl) {
        try {
          const sigHeader = isAr ? 'توقيع العميل والمستقل:' : 'Authorized Signatures:';
          page.drawText(renderText(sigHeader, contract.language), { x: textX(sigHeader, 11), y: currentY, size: 11, font });
          
          const base64Data = contract.signatureDataUrl.split(',')[1];
          const rawBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
          const embeddedImage = await pdfDoc.embedPng(rawBytes);
          
          page.drawImage(embeddedImage, {
            x: isAr ? width - 190 : 40,
            y: currentY - 55,
            width: 150,
            height: 45,
          });
        } catch (sigErr) {
          console.error('[usePDFGenerator] Error embedding signature:', sigErr);
        }
      }

      // Footer
      const footerMsg = 'Generated by Aqdi — aqdi.app';
      page.drawText(footerMsg, {
        x: (width - font.widthOfTextAtSize(footerMsg, 8)) / 2,
        y: 20,
        size: 8,
        font,
        color: rgb(136 / 255, 146 / 255, 164 / 255),
      });

      const pdfBytes = await pdfDoc.save();
      setIsGenerating(false);
      return pdfBytes;
    } catch (err: any) {
      console.error('[usePDFGenerator] Failed:', err);
      setError(err);
      setIsGenerating(false);
      throw err;
    }
  }, []);

  return { generatePDF, isGenerating, error };
}
