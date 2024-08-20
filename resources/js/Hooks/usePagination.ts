import { useDebouncedState } from "@mantine/hooks";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  pageSize?: number;
  path: string;
}

export default function usePagination({ pageSize = 15, path }: Props) {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useDebouncedState(true, 250);

  useEffect(() => {
    setLoading(true);
    getNewData();
  }, [page, pageSize]);

  const nextPage = () => {
    if (page === Math.ceil(totalRecords / pageSize)) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };

  const getNewData = async () => {
    const call = await axios.get(path, {
      params: {
        page: page,
        per_page: pageSize,
      },
    });
    setRecords(call.data.data);
    setTotalRecords(call.data.total);
    setLoading(false);
  };

  return {
    records,
    page,
    setPage,
    nextPage,
    prevPage,
    totalRecords,
    loading,
  };
}
