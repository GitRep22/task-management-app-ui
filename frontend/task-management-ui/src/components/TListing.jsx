import React from "react";
import TItem from "./TItem";

const TListing = ({ items, fetchTasks }) => {
  const onlyNineItemsMax = items.slice(0, 9);

  return (
    <div className='p-4 w-full sm:grid-cols-2 md:grid-cols-3 gap-4 grid grid-cols-1'>
      {onlyNineItemsMax.map((item) => (
        <TItem key={item.id} item={item} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default TListing;
