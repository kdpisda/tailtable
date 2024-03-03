import Pagination from "@/components/Pagination";
import Error from "@/components/Error";
import {useCallback, useEffect, useMemo, useState} from "react";
import Table from "@/components/Table";

export default function TailTable({data, columns, title, description, actions, pageSizes}){
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (data instanceof Promise) {
      // Handle data as a promise
      setLoading(true);
      data
        .then(response => {
          setTableData(response.data || response);
          setLoading(false);
        })
        .catch(err => {
          setError(err.toString());
          setLoading(false);
        });
    } else {
      // Handle data as an array
      setTableData(data);
    }
    setTotalCount(tableData.length);
  }, [data, tableData, refresh]);

  const handleRefresh = () => {
    setRefresh(prev => prev + 1); // Increment refresh to trigger useEffect
  };

  const modifiedActions = actions.map(action => {
    if (action.isRefreshAction) {
      return { ...action, onClick: handleRefresh };
    }
    return action;
  });

  const handlePreviousButtonClick = useCallback(() => {
    if (page > 0) setPage(page - 1);
  }, [page]);

  const handleNextButtonClick = useCallback(() => {
    if (page < totalCount / pageSize - 1) setPage(page + 1);
  }, [page, totalCount, pageSize]);

  const freeActions = useMemo(
    () => modifiedActions.filter(action => action.isFreeAction),
    [modifiedActions]
  );

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table
        title={title}
        description={description}
        columns={columns}
        tableData={tableData}
        freeActions={freeActions}
        actions={modifiedActions}
      />
      <Pagination
        currentPage={page}
        totalCount={totalCount}
        pageSize={pageSize}
        setPageSize={setPageSize}
        onPageChange={setPage}
        handlePreviousButtonClick={handlePreviousButtonClick}
        handleNextButtonClick={handleNextButtonClick}
        pageSizes={pageSizes}
      />
    </>
  );
}
