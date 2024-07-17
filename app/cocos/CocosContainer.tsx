"use client";
import { CocosData } from "@/types";
import React from "react";
import { Flex } from "@chakra-ui/react";
import { FilterInput } from "@/components/FilterInput";
import { useFilterInput } from "@/hooks/useFilterInput";
import { CocosTable } from "./CocosTable";

type Props = {
  data: CocosData[];
};

export default function CocosContainer({ data }: Props) {
  const { addArray, filterData, setFilterData, getDataList } = useFilterInput<CocosData>();
  const datalist = getDataList(data);
  console.log(data[0]?.createdAt);

  return (
    <Flex direction="column" alignItems="center" w="full">
      <FilterInput
        title="CO-COS"
        setFilterData={setFilterData}
        datalist={datalist}
        addArray={addArray}
        allData={data}
      />
      <CocosTable filterData={filterData} />
    </Flex>
  );
}