"use client";
import axios from 'axios';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';



export default function SparqlPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any>();
  const [error, setError] = useState(null);
  const [format, setFormat] = useState('json-ld');

  const executeQuery = async () => {
    setError(null);
    setResults(null);
  
    try {
      const response = await axios.post('https://flask-ontology-app.onrender.com/sparql', {
          query: query,
          format: format, 
        }, {
        headers: {
        'Content-Type': 'application/json' // Ensure JSON format
      }}
      );
  
      setResults(response.data);
    } catch (err: any) {
      setError(err.message);
    // }
  };}

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
              height: '500px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              visibility: 'hidden',
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
              style={{ height: '500px' }}
            />
          </div>
        </div>
      
      {/* Format Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Select Output Format:</label>
        <select
          value={format}
          onChange={(e) =>{
            setFormat(e.target.value)
            setResults(null)
          } }
          className="border rounded-lg p-2 w-full text-gray-800"
        >
          <option value="json">JSON</option>
          <option value="json-ld">JSON-LD</option>
          <option value="rdfa">RDFA</option>
        </select>
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
  <div className="mt-5 max-w-4xl w-full mx-auto pb-4 pt-20">
    <h2 className="text-xl font-medium text-gray-700 mb-2">Results:</h2>

    {format === "rdfa" && results.news_rdfa_links && (
      // RDFA format - Show list of links
      <div className="bg-gray-100 p-6 rounded-lg">
        <ul className="list-disc list-inside">
          {results.news_rdfa_links.map((link: string, index: number) => (
            <li key={index}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}

    {format === "json" && results.results && (
      // JSON format - Render table
      <div className="bg-gray-100 p-4 rounded-lg overflow-x-auto max-w-4xl w-full mx-auto">
        <table className="border-collapse border border-gray-300 text-gray-700">
          <thead>
            <tr className="bg-gray-200">
              {results.results.head.vars.map((header: string) => (
                <th key={header} className="border border-gray-300 p-2 text-left">
                  {header.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {results.results.results.bindings.map((row: any, rowIndex: number) => (
              <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
                {results.results.head.vars.map((header: string) => (
                  <td key={header} className="border border-gray-300 p-2">
                    {row[header]?.type === "uri" ? (
                      <a
                        href={row[header].value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {row[header].value}
                      </a>
                    ) : (
                      row[header]?.value || "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {!(format === "rdfa" && results.news_rdfa_links) && !(format === "json" && results.results) && (
      // Default JSON output if no special format
      <pre className="bg-gray-100 p-6 rounded-lg overflow-auto text-sm font-mono text-gray-800">
        {JSON.stringify(results, null, 2)}
      </pre>
    )}
  </div>
)}
    </div>
  );
}
