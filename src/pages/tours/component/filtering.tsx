import { SelectRow } from "@/components/select-row";
import { cn } from "@/utils/clsx";
import React from "react";
import { BiSearch } from "react-icons/bi"

type Props = {
  row: number;
  onChangeRow: (newRow: number) => void
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Filtering: React.FC<Props> = ({ row, onChangeRow, onChangeSearch }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between" aria-label="filtering">
      <div className="flex items-center justify-center gap-2 text-sm md:text-base" aria-label='filtering__row-select'>
        <p className="text-gray-700">Tampilkan</p>
        <SelectRow
          defaultvalue={row}
          onChange={(row) => onChangeRow(row)}
        />
        <p className="text-gray-700">Masukan</p>
      </div>
      <div
        className="relative w-full md:w-4/12 lg:w-2/12 my-5"
        aria-label='filtering__input-search'
      >
        <input
          className={cn(
            'border-gray-300 focus:border-gray-300 focus:ring-0 px-4 text-gray-900',
            'focus:outline-none w-full tracking-wide rounded-lg',
            'placeholder:font-medium placeholder:tracking-wide placeholder:text-gray-400 text-sm md:text-base',
            'peer/search'
          )}
          onChange={onChangeSearch}
          type="search"
          placeholder="Cari nama tour"
        />
        <BiSearch className="absolute top-3 right-4 peer-focus/search:hidden peer-hover/search:hidden" />
      </div>
    </div>
  )
}