import * as React from 'react';
import { ReactElement } from 'react';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { value(value: any): unknown; entry: Entry }): ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
};

export const Table = <Entry extends { id: string }>({ data, columns }: TableProps<Entry>) => {
  if (!data?.length) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-500 bg-white h-80">
        <h4>No Entries Found</h4>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="table">
                <tr>
                  {columns.map((column, index) => (
                    <th key={column.title + index} scope="col">
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((entry, entryIndex) => (
                  <tr key={entry?.id || entryIndex}>
                    {columns.map(({ Cell, field, title }, columnIndex) => (
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      <td key={title + columnIndex}>{Cell ? <Cell entry={entry} /> : entry[field]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
