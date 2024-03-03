import Row from "@/components/Row";
import FreeAction from "@/components/FreeAction";

export default function Table({title, description, freeActions, columns, tableData, actions}) {

  return (
    <div className="p-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">{title}</h1>
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
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">Actions</th>
                  {columns.map((column, index) => (
                    <th key={index} scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">{column.label}</th>
                  ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {tableData.map((item, index) => (
                  <Row
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
