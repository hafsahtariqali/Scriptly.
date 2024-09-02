// components/MarkdownRenderer.js
import React from 'react';
import { marked } from 'marked';

const MarkdownRenderer = ({ markdown }) => {
  const createMarkup = () => {
    return { __html: marked.parse(markdown) };
  };

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
};

export default MarkdownRenderer;
