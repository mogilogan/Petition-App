const getMonthLabel = (month) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  return months[month - 1];
};


const getype = (req) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  const { results } = req;

  // Helper function to format the month

  // Process the data
  const result = [];



  results.forEach((dataArray) => {
    if (dataArray && Array.isArray(dataArray)) {
      dataArray.forEach((row) => {
        const date = new Date(row.time_stamp);
        const labels = row.type;
        const year = date.getFullYear().toString();
        const month = getMonthLabel(date.getMonth() + 1);

        // Find or create the entry for the label
        let entry = result.find((item) => item.labels === labels);

        if (!entry) {
          entry = {
            labels: labels,
            data: [],
          };
          result.push(entry);
        }

   
        // Find or create the entry for the year
        let yearEntry = entry.data.find((item) => item.year === year);
        
        if (!yearEntry) {
          yearEntry = {
            year: year,
            data: Array.from({ length: 12 }, (_, i) => ({
              label: getMonthLabel(i + 1),
              y: 0,
            })),
          };
          entry.data.push(yearEntry);
        }
        
        // Increment the count for the specific month
        const monthIndex = months.indexOf(month) +1;

       

     
        yearEntry.data[monthIndex].y = (
          parseInt(yearEntry?.data[monthIndex]?.y) + 1
        ).toString();
      });
    }
  });

  // Aggregate counts for the same label and month
  result.forEach((entry) => {
    entry.data.forEach((yearEntry) => {
      const counts = {};

      yearEntry.data.forEach((monthEntry) => {
        const count = parseInt(monthEntry.y);
        counts[monthEntry.label] = (counts[monthEntry.label] || 0) + count;
      });

      yearEntry.data = Object.keys(counts).map((mon) => ({
        label: mon,
        y: counts[mon],
      }));
    });
  });

  return result;
};

const getcount = (req) => {
  const { graph } = req;

  const grouped = graph.reduce((acc, entry) => {
    const { year, month, count } = entry;
    const labels = `${year}`;
    if (!acc[labels]) {
      acc[labels] = [];
    }

    const monthIndex = new Date(`${month} 1, 2000`).getMonth(); // Get month index (0-based)
    if (!acc[labels][monthIndex]) {
      acc[labels][monthIndex] = { label: month, y: 0 };
    }

    acc[labels][monthIndex].y += count;
    return acc;
  }, {});

  // Convert grouped data to the desired format
  const transformedData = Object.entries(grouped).map(([labels, months]) => ({
    labels: parseInt(labels),
    data: Array.from({ length: 12 }, (_, index) => ({
      label: months[index]
        ? months[index].label
        : new Date(2000, index, 1).toLocaleString("en-US", {
            month: "short",
          }),
      y: months[index] ? months[index].y : 0,
    })),
  }));

  return transformedData;
};

module.exports = { getype, getcount };
