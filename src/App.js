import "./App.css";
import sun from './icon-sun.png';
import moon from './moon.png';

/* import fakeData from "./MOCK_DATA.json"; */
import React,{ useEffect, useMemo }  from "react";
import { useTheme } from "./hooks/useTheme";
import { useTable, usePagination } from "react-table";

import { connect } from 'react-redux';
import { fetchData } from "./redux/actions";

function App({  loading, data, error, fetchData}) {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /* if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>
  } */
  const { theme, setTheme } = useTheme();
 /*  const data = React.useMemo(() => fetchData, []); */
  const columns = useMemo(
    () => [
      
      {
        Header: "Название компании",
        accessor: "companyName",
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "University",
        accessor: "university",
      },
    ],
    []
  );

  const ThemeClick = () => {
    theme === "light" ? setTheme("dark-theme") : setTheme("light");
    console.log("тема", theme);
  };
  
  const handlePageSizeChange = () => {
    setPageSize(pageSize + 10);
  };

  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    pageSize=10,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10
      },
      
    },
    usePagination
  );

  const { pageIndex } = state;

  return (
    <div className="App">
      <div onClick={ThemeClick} className="theme-btn flex-center">
        <img className="theme-sun" src={sun} alt="" />
        <img className="theme-moon" src={moon} alt="" />
      </div>
      <div className="container">
         <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
           <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}> {cell.render("Cell")} </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Назад
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Следущая
        </button>
      </div>
      
      <button onClick={handlePageSizeChange}></button>
      
     
    </div>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    data: state.data,
    error: state.error
  };
};

const mapDispatchToProps = {
  fetchData
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
