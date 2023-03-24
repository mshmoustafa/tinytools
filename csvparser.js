function parseCSV(csv, delimiter) {
  const csvRows = csv
    .split("\n")
    .filter(row => row.trim() !== "")
    .map(row => row + delimiter);

  const parsed = [];

  for (let row of csvRows) {
    const columns = [];
    let column = "";
    let inQuotes = false;
    let deleteNextQuote = true;
    for (let character of row) {
      if (character === delimiter && !inQuotes) {
        columns.push(column.trim());
        column = "";
        deleteNextQuote = true;
      } else if (character === "\"") {
        inQuotes = !inQuotes;
        if (deleteNextQuote) {
          deleteNextQuote = false;
        } else {
          column += character;
          deleteNextQuote = true;
        }
      } else {
        column += character;
        deleteNextQuote = true;
      }
    }
    parsed.push(columns);
  }

  return parsed;
}