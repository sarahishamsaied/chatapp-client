/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Papa from "papaparse";

export const useCsvData = (csvUrl: string) => {
  const [data, setData] = useState<{ [key: string]: any }[]>([]);
  const [columns, setColumns] = useState<
    {
      title: string;
      dataIndex: string;
      sorter: (a: any, b: any) => number;
      filterMultiple: boolean;
      onFilter: (value: any, record: any) => boolean;
      filters?: { text: string; value: string }[];
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(csvUrl);
      if (response) {
        const reader = response.body ? response.body.getReader() : null;
        const result = reader ? await reader.read() : null;
        const decoder = new TextDecoder("utf-8");
        const csv = result ? decoder.decode(result.value) : "";

        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            const parsedData = results.data as { [key: string]: any }[];
            setData(parsedData);

            // Generate column definitions with filters
            const columnDefinitions = Object.keys(parsedData[0]).map((key) => {
              // Extract unique values for the column to use as filters
              const uniqueValues = Array.from(
                new Set(parsedData.map((item) => item[key]))
              );

              return {
                title: key.charAt(0).toUpperCase() + key.slice(1),
                dataIndex: key,
                sorter: (a: any, b: any) => {
                  const valA = a[key];
                  const valB = b[key];
                  if (typeof valA === "string" && typeof valB === "string") {
                    return valA.localeCompare(valB);
                  }
                  return (valA || "") > (valB || "")
                    ? 1
                    : (valA || "") < (valB || "")
                    ? -1
                    : 0;
                },
                filterMultiple: true,
                onFilter: (value: string | number, record: any) => {
                  const recordValue = record[key];
                  return (
                    recordValue !== undefined &&
                    recordValue.indexOf(value) === 0
                  );
                },
                filters: uniqueValues.map((value) => ({ text: value, value })),
              };
            });

            setColumns(columnDefinitions);
            setLoading(false);
          },
        });
      }
    };

    if (csvUrl) fetchData();
  }, [csvUrl]);

  return { data, columns, loading };
};
