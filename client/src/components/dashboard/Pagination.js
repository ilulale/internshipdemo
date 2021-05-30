import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
      <ul className='pagination'
        style={{
            marginTop : "2rem"
        }}
      >
        {pageNumbers.map(number => {
            if (number == currentPage) {
                return(
                    <li key={number} className='active blue'>
                    <a onClick={() => paginate(number)} className='page-link'>
                      {number}
                    </a>
                  </li>
                )
            } else {
                return(
                    <li key={number} className='waves-effect'>
                    <a onClick={() => paginate(number)} className='page-link'>
                      {number}
                    </a>
                  </li>
                )

            }
        })}
      </ul>
  );
};

export default Pagination;

