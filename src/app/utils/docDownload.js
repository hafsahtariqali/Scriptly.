import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Alignment } from 'docx';
import { marked } from 'marked';

export const generateAndDownloadDocx = async (filename, markdownContent) => {
  try {
    // Convert Markdown to HTML
    const htmlContent = marked(markdownContent);

    // Convert HTML to DOCX
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: parseHtmlToDocx(htmlContent),
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);

    // Save the DOCX file
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error generating DOCX:', error);
  }
};

// Helper function to parse HTML and convert to docx elements
const parseHtmlToDocx = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const elements = Array.from(doc.body.childNodes);

  return elements.flatMap((element) => {
    switch (element.nodeName) {
      case 'P':
        return [
          new Paragraph({
            children: [
              new TextRun(element.textContent?.trim() || ''),
            ],
          })
        ];
      case 'H1':
        return [
          new Paragraph({
            children: [
              new TextRun({
                text: element.textContent?.trim() || '',
                bold: true,
                size: 48, // Adjust size as needed
              }),
            ],
            heading: HeadingLevel.HEADING_1,
            alignment: Alignment.LEFT,
          })
        ];
      case 'H2':
        return [
          new Paragraph({
            children: [
              new TextRun({
                text: element.textContent?.trim() || '',
                bold: true,
                size: 32, // Adjust size as needed
              }),
            ],
            heading: HeadingLevel.HEADING_2,
            alignment: Alignment.LEFT,
          })
        ];
      case 'H3':
        return [
          new Paragraph({
            children: [
              new TextRun({
                text: element.textContent?.trim() || '',
                bold: true,
                size: 24, // Adjust size as needed
              }),
            ],
            heading: HeadingLevel.HEADING_3,
            alignment: Alignment.LEFT,
          })
        ];
      case 'UL':
        return parseList(element, 'UL');
      case 'OL':
        return parseList(element, 'OL');
      default:
        return [];
    }
  });
};

// Helper function to parse lists
const parseList = (element, type) => {
  const listItems = Array.from(element.children).filter(child => child.nodeName === 'LI');
  return listItems.map((item) => {
    return new Paragraph({
      children: [
        new TextRun(item.textContent?.trim() || ''),
      ],
      numbering: {
        reference: type === 'UL' ? 'bullet' : 'numbering',
        level: 0,
      },
    });
  });
};
