"use client";
import React from "react";
import { useState } from "react";
const Category = () => {
  const [isRent, setIsRent] = useState(false);
  return (
    <div className="flex w-full">
      <button onClick={() => setIsRent(true)}>Rent</button>
      <button onClick={() => setIsRent(false)}>Buy</button>
    </div>
  );
};

export default Category;
