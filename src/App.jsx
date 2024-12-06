import { useState } from "react";
import {
  FaSearch,
  FaTrashAlt,
  FaPlus,
  FaRegClock,
  FaTasks,
  FaIndustry,
  FaLink,
  FaSpinner,
  FaPlay,
  FaExclamationTriangle,
  FaApple,
  FaGoogle,
  FaCar,
  FaFigma,
  FaBuilding,
  FaFileExport
} from "react-icons/fa";

function App() {
  const [data, setData] = useState([
    { time: "Oct 12, 2024 at 14:08 PM", action: "Bitscale Evaluation - Account relevance check", enrich: "Bitscale Evaluation - Account" },
    { time: "Oct 12, 2024 at 14:08 PM", action: "Cell data size exceeds limit", enrich: "BMW Evaluation - Relevancy check" },
    { time: "Oct 12, 2024 at 14:08 PM", action: "https://www.linkedin.com/bitScale", enrich: "Google Evaluation - Lievancy check" },
    { time: "Oct 12, 2024 at 14:08 PM", action: "Loading data, Please wait", enrich: "Apple Evaluation - Olvancy check" },
    { time: "Oct 12, 2024 at 14:08 PM", action: "Loading data, Please wait", enrich: "Figma Evaluation - Evancy check" },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const addRow = () => {
    setData([...data, { time: "New Time", action: "New Action", enrich: "New Enrich Company" }]);
  };

  const deleteRow = (index) => {
    if (window.confirm("Are you sure you want to delete this row?")) {
      const globalIndex = (currentPage - 1) * rowsPerPage + index;
      setData((prevData) => prevData.filter((_, i) => i !== globalIndex));
    }
  };

  const editRow = (index, field) => {
    const globalIndex = (currentPage - 1) * rowsPerPage + index;
    const value = prompt(`Edit ${field}:`, data[globalIndex][field]);
    if (value) {
      setData((prevData) => {
        const newData = [...prevData];
        newData[globalIndex][field] = value;
        return newData;
      });
    }
  };

  const filteredData = data.filter(
    (row) =>
      row.time.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.enrich.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const getEnrichIcon = (enrich) => {
    if (enrich.includes("Apple")) return <FaApple className="inline mr-2 text-gray-500" />;
    if (enrich.includes("Google")) return <FaGoogle className="inline mr-2 text-blue-500" />;
    if (enrich.includes("BMW")) return <FaCar className="inline mr-2 text-gray-700" />;
    if (enrich.includes("Figma")) return <FaFigma className="inline mr-2 text-purple-500" />;
    return <FaBuilding className="inline mr-2 text-gray-400" />;
  };

  const formatAction = (action) => {
    if (action === "Cell data size exceeds limit") {
      return <><FaExclamationTriangle className="inline mr-2 text-red-500" />{action}</>;
    } else if (action.startsWith("http")) {
      return <><FaLink className="inline mr-2 text-blue-500" /><a href={action} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-700">{action}</a></>;
    } else if (action === "Loading data, Please wait") {
      return <><FaSpinner className="inline mr-2 animate-spin text-gray-500" />{action}</>;
    }
    return action;
  };

  const exportToCSV = () => {
    const csvData = [
      ["Time", "Action", "Enrich Company"],
      ...data.map((row) => [row.time, row.action, row.enrich]),
    ];
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    link.download = "data.csv";
    link.click();
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
        <button
          onClick={addRow}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center shadow-lg transition duration-300 w-full sm:w-auto"
        >
          <FaPlus className="mr-2" /> Add Row
        </button>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden max-w-xl w-full">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border-none outline-none focus:ring-0 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="text-gray-500 mr-4" />
        </div>
        <button
          onClick={exportToCSV}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center shadow-lg transition duration-300 w-full sm:w-auto"
        >
          <FaFileExport className="mr-2" /> Export to CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md table-auto rounded-lg">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">#</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                <div className="flex  items-center"> 
                <FaRegClock className="mr-2" />
                Input Column
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                <div className="flex items-center">
                <FaTasks className="mr-2" />
                Action Column
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b border-r">
                <div className="flex items-center">
                <FaIndustry className="mr-2" />
                Enrich Company
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer transition duration-300 ease-in-out">
                <td className="px-6 py-4 text-sm text-gray-800 border-b border-r">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-800 border-b border-r">
                  <div className="inline-block p-2 border-2 border-green-500 rounded-full">
                    <FaPlay className="text-green-500" />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 border-b border-r" onClick={() => editRow(index, "time")}>
                  {row.time}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 border-b border-r" onClick={() => editRow(index, "action")}>
                  {formatAction(row.action)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 border-b border-r" onClick={() => editRow(index, "enrich")}>
                  {getEnrichIcon(row.enrich)}
                  {row.enrich}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 border-b">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteRow(index);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 flex items-center"
                  >
                    <FaTrashAlt className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm text-gray-600">{currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
