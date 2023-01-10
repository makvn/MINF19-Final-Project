import { Link } from 'react-router-dom';

export type BreadcrumbPathType = {
  path: string;
  title: string;
};

interface PropType {
  title: string;
  paths: BreadcrumbPathType[];
}
export const Breadcrumb = ({ title, paths }: PropType) => (
  <div className="lt-breadcrumb">
    <div className="breadcrumb-content">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="title">
            <h1>{title}</h1>
          </div>
          <ol className="breadcrumb align-self-center">
            {paths.map((path, index) => (
              <li key={index} className="breadcrumb-item">
                <Link to={path.path}>{path.title}</Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  </div>
);
