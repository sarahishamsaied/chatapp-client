import { useState, useEffect } from "react";
import Papa from "papaparse";

export const useCsvData = (csvUrl: string) => {
  // eslint-disable-next-line
  const [data, setData] = useState<{ [key: string]: any }[]>([]);
  const [columns, setColumns] = useState<
    {
      title: string;
      dataIndex: string;
      // eslint-disable-next-line
      sorter: (a: any, b: any) => number;
      filterMultiple: boolean;
      // eslint-disable-next-line
      onFilter: (value: any, record: any) => boolean;
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
            // eslint-disable-next-line
            setData(results.data as { [key: string]: any }[]);
            setColumns(
              Object.keys(results.data[0] as object).map((key) => ({
                title: key.charAt(0).toUpperCase() + key.slice(1),
                dataIndex: key,
                sorter: (a, b) => {
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
                onFilter: (value, record) => record[key].indexOf(value) === 0,
              }))
            );
            setLoading(false);
          },
        });
      }
    };

    if (csvUrl) fetchData();
  }, [csvUrl]);

  return { data, columns, loading };
};
