// Path to your locally saved Excel file
const filePath = "./data.xlsx";

// Specify the sheet name you want to fetch
const specificSheetName = "images"; // Replace with your desired sheet name

// Function to load the Excel file
function loadExcelFile(filePath, sheetName) {
  fetch(filePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch the file: ${response.statusText}`);
      }
      return response.arrayBuffer();
    })
    .then((data) => {
      // Parse the Excel file
      const workbook = XLSX.read(new Uint8Array(data), { type: "array" });

      // Check if the specified sheet exists
      if (!workbook.SheetNames.includes(sheetName)) {
        throw new Error(`Sheet "${sheetName}" not found in the Excel file.`);
      }

      // Get the specified sheet
      const worksheet = workbook.Sheets[sheetName];

      // Convert the sheet to JSON
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      let images = [];

      // Map JSON data to custom objects
      images = jsonData.map((row) => ({
        title: row.title || "title", // Replace with your column headers
        description: row.description || "description",
        url: row.url || "url",
      }));

      // Display the objects
      console.log(`Data from Sheet "${sheetName}":`, images);
      console.log(images.length);
    })
    .catch((error) => {
      console.error("Error loading Excel file:", error);
    });
}

// Call the function to load the specific sheet
loadExcelFile(filePath, specificSheetName);