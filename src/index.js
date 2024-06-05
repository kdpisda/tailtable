import Pagination from '@/components/Pagination';
import Error from '@/components/Error';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Table from '@/components/Table';
import PropTypes from 'prop-types';


/**
* TailTable component
*
* @component
* @param {Array|Promise} data - Data to be displayed in the table
* @param {Array} columns - Columns to be displayed in the table
* @param {String} title - Title of the table
* @param {String} description - Description of the table
* @param {Array} actions - Actions to be displayed in the table
* @param {Array} pageSizes - Page sizes to be displayed in the table
*
* @example
* <TailTable
*  data={leads}
*  columns={[
*    {
*      field: 'firstName',
*      label: 'First Name',
*    },
*    {
*      field: 'lastName',
*      label: 'Last Name',
*    }
*  ]}
*  title="Leads"
*  description="Check all the leads from the Contact page"
*  actions={[
*    {
*      icon: EyeIcon,
*      tooltip: "View",
*      onClick: (event, rowData) => handleOpenDialog(rowData)
*    }
*  ]}
*  pageSizes={[5, 10, 25, 50, 100]}
* />
*
*
* @return {React.Component} A table with pagination and actions
*
*/
export default function TailTable({
  data,
  columns,
  title,
  description,
  actions,
  pageSizes,
}) {
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
          .then((response) => {
            setTableData(response.data || response);
            setLoading(false);
          })
          .catch((err) => {
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
    setRefresh((prev) => prev + 1);
  };

  const modifiedActions = actions.map((action) => {
    if (action.isRefreshAction) {
      return {...action, onClick: handleRefresh};
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
      () => modifiedActions.filter((action) => action.isFreeAction),
      [modifiedActions],
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

TailTable.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.func]).isRequired,
  columns: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired,
  pageSizes: PropTypes.array.isRequired,
};
