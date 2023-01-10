import {
  CellProps,
  Row,
  TableToggleAllRowsSelectedProps,
  useExpanded,
  usePagination,
  useRowSelect,
  useTable,
  UseTableOptions,
} from 'react-table';
import React, { ForwardedRef, Fragment } from 'react';
import { RequestDetail } from './RequestDetail';

export const RequestTable = <T extends object>({ data, columns }: UseTableOptions<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable<T>(
    {
      columns,
      data,
    },
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: 'selection',
          Header: ({ getToggleAllPageRowsSelectedProps }) => {
            return (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            );
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignored
          Cell: ({ row }) => {
            return (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            );
          },
        },
        ...columns,
        {
          // Make an expander cell
          Header: () => null, // No header
          id: 'expander', // It needs an ID
          Cell: ({ row }: CellProps<T>) => (
            // Use Cell to render an expander for each row.
            // We can use the getToggleRowExpandedProps prop-getter
            // to build the expander.
            <span {...row.getToggleRowExpandedProps()}>{row.isExpanded ? '👇' : '👉'}</span>
          ),
        },
      ]);
    },
  );

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(({ row }: { row: Row<T> }) => {
    return <RequestDetail row={row} />;
  }, []);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <Fragment key={i}>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  // eslint-disable-next-line react/jsx-key
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>

              {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
              {row.isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                    {renderRowSubComponent({ row })}
                  </td>
                </tr>
              ) : null}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: TableToggleAllRowsSelectedProps, ref: ForwardedRef<HTMLInputElement>) => {
    const defaultRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      if (resolvedRef && typeof resolvedRef !== 'function' && resolvedRef.current) {
        resolvedRef.current.indeterminate = !!indeterminate;
      }
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);
