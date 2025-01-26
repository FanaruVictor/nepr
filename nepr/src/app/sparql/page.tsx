"use client";
import { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export default function SparqlPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const executeQuery = async () => {
    setError(null);
    setResults(null);

    try {
      // Replace with your SPARQL endpoint URL
      const endpoint = 'https://dbpedia.org/sparql';

      const response = await axios.get(endpoint, {
        params: {
          query: query,
          format: 'json', // You can change this to 'xml', 'csv', etc.
        },
      });

      setResults(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">

      <div className="mb-6">
        <h2 className="text-xl font-medium text-gray-700 mb-3">SPARQL Query:</h2>
        <div className="relative border rounded-lg shadow-md bg-white">
          {/* SyntaxHighlighter to show query */}
          <SyntaxHighlighter
            language="sparql"
            customStyle={{
              fontFamily: 'monospace',
              fontSize: '14px',
              padding: '1rem',
              borderRadius: '0.5rem',
              minHeight: '150px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              visibility: 'hidden', // Hide the text when the textarea is focused
            }}
          >
            {query}
          </SyntaxHighlighter>
          {/* The textarea for editing the SPARQL query */}
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your SPARQL query here..."
            className="w-full p-3 mt-2 font-mono text-sm rounded-lg border-0 bg-transparent text-black caret-blue-500 absolute top-0 left-0 z-10 resize-none overflow-hidden focus:outline-none"
            style={{ minHeight: '150px' }}
          />
        </div>
      </div>

      <button
        onClick={executeQuery}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        Execute Query
      </button>

      {error && (
        <div className="mt-5 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      )}

      {results && (
        <div className="mt-5">
          <h2 className="text-xl font-medium text-gray-700 mb-2">Results:</h2>
          <pre className="bg-gray-100 p-6 rounded-lg overflow-auto text-sm font-mono text-gray-800">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
