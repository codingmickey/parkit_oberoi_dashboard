import React from 'react';
import VehicleTypesFilter from './blocks/VehicleTypesFilter';
import VehicleTypesTable from './blocks/VehicleTypesTable';

export default function VehicleTypes() {
  return (
    <>
      <VehicleTypesFilter />
      <VehicleTypesTable />
    </>
  );
}
