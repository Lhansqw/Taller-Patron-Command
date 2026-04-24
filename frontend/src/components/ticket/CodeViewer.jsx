import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeViewer = ({ code, language = 'java', title }) => {
    return (
        <div className="code-viewer">
            <div className="code-header">
                <span>{title}</span>
            </div>
            <SyntaxHighlighter 
                language={language} 
                style={vscDarkPlus} 
                customStyle={{ margin: 0, borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px', fontSize: '0.9rem' }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeViewer;
