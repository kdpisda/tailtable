
export default function Row({index, item, columns, actions}){
  return (
    <tr key={index}>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6 flex justify-center items-center">
        {actions.filter(action => !action.isFreeAction).map((action, index) => (
          <button
            key={action.key || index}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-1"
            onClick={(event) => action.onClick(event, item)}
          >
            <action.icon className="h-5 w-5" aria-hidden="true" />
          </button>
        ))}
      </td>
      {columns.map((column, index) => (
        <td key={column.key || index} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {column.render ? column.render(item) : item[column.field]}
        </td>
      ))}
    </tr>
  );
}
