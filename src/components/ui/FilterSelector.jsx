'use client'
import React from 'react';
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const filterOptions = [
  { id: 'none', name: 'None' },
  { id: 'sepia', name: 'Sepia' },
  { id: 'grayscale', name: 'Grayscale' },
  { id: 'blur', name: 'Blur' },
  { id: 'sharpen', name: 'Sharpen' },
];

const FilterSelector = ({ selectedFilter, setSelectedFilter }) => {
  const handleFilterSelect = (filterId) => {
    setSelectedFilter(filterId);
  };

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium mt-4">Image Filter</label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="!rounded-lg !text-left w-full" id="filter" variant="outline">
            {filterOptions.find(filter => filter.id === selectedFilter)?.name || 'Select Filter'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filterOptions.map(filter => (
            <DropdownMenuItem key={filter.id} onSelect={() => handleFilterSelect(filter.id)}>
              {filter.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FilterSelector;