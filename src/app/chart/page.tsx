// Import necessary modules and styles
"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setData, resetData } from "@/lib/features/chartSlice";


import ReactECharts from "echarts-for-react";

interface RootState {
  chart: {
    data: number[];
  };
}

interface RootState1 {
  darkmode: {
    mode: boolean;
  };
}

const ChartPage: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.chart.data);
  const { mode } = useSelector((state: RootState1) => state.darkmode);
  const [newDataPoint, setNewDataPoint] = useState<number>(0);

  const handleResetClick = () => {
    dispatch(resetData());
  };

  const handleDataChange = (index: number, value: number) => {
    const newData = [...data];
    newData[index] = value;
    dispatch(setData(newData));
  };

  const handleAddPoint = () => {
    const nextDayIndex = data.length % 7;
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const nextDay = daysOfWeek[nextDayIndex];

    dispatch(setData([...data, newDataPoint]));
    setNewDataPoint(0);

    // Update X-axis labels directly in the option object
    option.xAxis.data.push(nextDay);
  };
  const handleRemovePoint = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    dispatch(setData(newData));
  };

  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data,
        type: "line",
        smooth: true,
      },
    ],
  };

  return (
    <div
      className={`flex flex-wrap md:flex-row h-screen items-center justify-center ${
        mode ? "bg-gray-800" : "bg-white text-black"
      }`}
    >
      {/* Chart Column */}
      <motion.div
        className="flex-1 p-8 m-2 border rounded shadow-md bg-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <ReactECharts option={option} opts={{ renderer: "svg" }} />
      </motion.div>

      {/* Form Controls Column */}
      <motion.div
        className="flex-1 p-8 m-2 border rounded shadow-md bg-white flex justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <form className="w-fit w-md">
          {data.map((point, index) => (
            <div key={index} className="mb-4 flex items-center">
              <label className="block text-gray-700 text-sm font-bold mb-2 mr-2">
                Data {index + 1}:
              </label>
              <input
                type="number"
                value={point}
                onChange={(e) =>
                  handleDataChange(index, Number(e.target.value))
                }
                className="border rounded w-16 py-2 px-3 mr-2"
                placeholder="Value"
              />
              <button
                type="button"
                onClick={() => handleRemovePoint(index)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mb-4 flex items-center">
            <label className="block text-gray-700 text-sm font-bold mb-2 mr-2">
              Add Data:
            </label>
            <input
              type="number"
              value={newDataPoint}
              onChange={(e) => setNewDataPoint(Number(e.target.value))}
              className="border rounded w-16 py-2 px-3 mr-2"
              placeholder="Value"
            />
            <button
              type="button"
              onClick={handleAddPoint}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleResetClick}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => dispatch(setData(data))}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
            >
              Apply
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ChartPage;
