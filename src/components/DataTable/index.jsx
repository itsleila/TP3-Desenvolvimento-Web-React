import React from 'react';
import DataTable from 'react-data-table-component';

const opcoes = {
  rowsPerPageText: 'Linhas por página:',
  rangeSeparatorText: 'de',
};

const DefaultDataTable = ({
  title,
  columns,
  data,
  conditionalRowStyles,
  onSelectedRowsChange,
  selectableRows,
  selectableRowDisabled,
}) => {
  return (
    <div>
      <DataTable
        title={title}
        columns={columns}
        data={data}
        selectableRows={selectableRows}
        selectableRowDisabled={selectableRowDisabled}
        selectableRowsHighlight
        selectableRowsSingle
        noDataComponent={'Lista vazia'}
        paginationComponentOptions={opcoes}
        pagination
        paginationPerPage={5}
        conditionalRowStyles={conditionalRowStyles}
        onSelectedRowsChange={onSelectedRowsChange}
      />
    </div>
  );
};

export default DefaultDataTable;
