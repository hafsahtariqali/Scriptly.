import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { marked } from 'marked';
import htmlToDocx from 'html-to-docx';

const convertHtmlToDocx = async (htmlContent) => {
  const doc = await htmlToDocx(htmlContent, { margin: { top: 720, bottom: 720, left: 720, right: 720 } });
  return doc;
};

export const generateAndDownloadDocx = async (filename, markdownContent) => {
  // Convert Markdown to HTML
  const htmlContent = marked(markdownContent);

  // Convert HTML to .docx file
  const docxBlob = await convertHtmlToDocx(htmlContent);
  
  // Save the .docx file
  saveAs(docxBlob, filename);
};
