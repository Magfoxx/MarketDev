import React from "react";

const TopList = ({ title, items, labelKey }) => {
  return (
    <div className="bg-gray-300 dark:bg-gray-800 p-4 rounded shadow-xl text-secondary dark:text-white">
      <h4 className="h4 mb-2">{title}</h4>
      <ol className="list-decimal list-inside">
        {items.map((item, index) => (
          <li key={index}>
            {item[labelKey]} : {item.count}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopList;
