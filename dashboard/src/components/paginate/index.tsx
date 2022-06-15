import React from 'react';
import { URLSearchParamsInit } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

export default function Paginate({
  totalPage,
  searchParams,
  setSearchParams
}: {
  totalPage: number;
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined
  ) => void;
}): JSX.Element {
  function handlePageClick({ selected }: { selected: number }): void {
    const selectedPage = selected + 1;

    const params: { [key: string]: string } = {};
    searchParams.forEach((value, key) => (params[key] = value));

    setSearchParams({ ...params, page: String(selectedPage) });
  }

  const currentPage = Number(searchParams.get('page')) ? Number(searchParams.get('page')) : 1;

  if (totalPage <= 1) return <noscript />;
  return (
    <ReactPaginate
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={totalPage}
      forcePage={currentPage - 1}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={'pagination center'}
      activeClassName={'active'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
    />
  );
}
