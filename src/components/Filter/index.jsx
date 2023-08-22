import React from "react";
import SortFilter from "./sort";
import BrandFilter from "./brand";
import ModelFilter from "./model";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
export default function Filter({ setOpenFilter }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full h-screen md:static md:top-auto md:left-auto md:w-auto md:h-auto bg-black/70 z-[9999] md:bg-transparent md:z-auto"
      onClick={() => setOpenFilter(false)}
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col max-w-[90%] h-full max-h-screen min-h-screen gap-5 p-5 overflow-y-auto bg-white md:max-w-none md:h-auto md:max-h-none md:min-h-0 md:p-0 md:bg-transparent"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="inline-flex justify-end ml-auto text-right cursor-pointer md:hidden max-w-max"
          onClick={() => setOpenFilter(false)}
        >
          <FaTimes />
        </div>
        <SortFilter />
        <BrandFilter />
        <ModelFilter />
      </motion.div>
    </motion.div>
  );
}
