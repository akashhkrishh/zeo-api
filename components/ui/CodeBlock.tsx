"use client"
import React from 'react';
import { CodeBlock, irBlack } from 'react-code-blocks';

// Defining the types for the props
interface MyCodeComponentProps {
  code: string;               // The code to display
  language: 'js' | 'ts' | 'python' | 'jsx' | 'html' | string; // Language options
  showLineNumbers: boolean;  // Whether to show line numbers
                // The theme can be a prebuilt theme object like `dracula`
}

function MyCodeComponent({ code, language, showLineNumbers,   }: MyCodeComponentProps) {
  return (
    
      <CodeBlock
        text={code}
        language={language}
        showLineNumbers={showLineNumbers}
        theme={irBlack} // Now passing the theme as an object, not a string
        // wrapLongLines={true}  
 />
  );
}

export default MyCodeComponent;
