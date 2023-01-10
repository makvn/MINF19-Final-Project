export const Pagination = () => {
  return (
    <div className="text-center">
      <div className="lt-pagination">
        <ul className="pagination ">
          <li>
            <a className="page-numbers" href="#">
              <i className="fa fa-chevron-left" />
            </a>
          </li>
          <li>
            <span className="page-numbers current">1</span>
          </li>
          <li>
            <a className="page-numbers" href="#">
              2
            </a>
          </li>
          <li>
            <a className="page-numbers" href="#">
              3
            </a>
          </li>
          <li>
            <a className="page-numbers" href="#">
              <i className="fa fa-chevron-right" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
