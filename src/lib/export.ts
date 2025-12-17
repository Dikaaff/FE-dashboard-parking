export function downloadCSV(data: any[], filename: string) {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          return typeof value === "string" && value.includes(",")
            ? `"${value}"` // Quote strings with commas
            : value;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Mock data generator for the report
export function generateDashboardReport() {
    return [
        { Date: '2023-12-01', TotalIncome: 1500000, Vehicles: 120, Occupancy: '85%' },
        { Date: '2023-12-02', TotalIncome: 1800000, Vehicles: 145, Occupancy: '92%' },
        { Date: '2023-12-03', TotalIncome: 1200000, Vehicles: 98, Occupancy: '65%' },
        { Date: '2023-12-04', TotalIncome: 1650000, Vehicles: 130, Occupancy: '88%' },
        { Date: '2023-12-05', TotalIncome: 1900000, Vehicles: 155, Occupancy: '95%' },
    ];
}
