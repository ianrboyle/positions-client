import Papa from 'papaparse';

// Load CSV file
const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // `results.data` contains the parsed CSV data as an array of objects
        console.log(results.data);
      },
    });
  }
};

// Render file input in your React component
<input type="file" onChange={handleFileUpload} />