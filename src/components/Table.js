import React from 'react';
import Row from '@/components/Row';
import FreeAction from '@/components/FreeAction';
import PropTypes from 'prop-types';


/**
 * Table is a functional component that renders a table with given data,
 * columns, title, description, and actions.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.data - The data to be displayed in the table.
 * @param {Array} props.columns - The columns of the table. Each column should
 * be an object with a required `field` and `label` properties.
 * @param {string} props.title - The title of the table.
 * @param {string} props.description - The description of the table.
 * @param {Array} props.actions - The actions that can be performed on the table
 * Each action should be an object with an `icon` (a React component), a
 * `tooltip` (a string), and an `onClick` (a function).
 * @return {React.Element} A React element that renders a table.
 */
export default function Table({
  title,
  description,
  freeActions,
  columns,
  tableData,
  actions,
}) {
  return (
    <div className="p-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex items-center space-x-4">
          <FreeAction actions={freeActions} />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      Actions
                    </th>
                    {columns.map((column, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tableData.map((item, index) => (
                    <Row
                      key={index}
                      index={index}
                      item={item}
                      columns={columns}
                      actions={actions}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
      PropTypes.shape({
        field: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      }),
  ).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  actions: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.elementType,
        tooltip: PropTypes.string,
        onClick: PropTypes.func,
      }),
  ),
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  freeActions: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.elementType.isRequired,
        tooltip: PropTypes.string,
        onClick: PropTypes.func,
        isFreeAction: PropTypes.bool,
        isRefreshAction: PropTypes.bool,
      }),
  ).isRequired,
  tableData: PropTypes.any.isRequired,
};
