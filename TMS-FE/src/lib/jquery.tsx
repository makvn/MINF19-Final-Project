import { ReactNode, useEffect } from 'react';
import { main } from 'public/js/main';
import { useLocation } from 'react-router-dom';
import jquery from 'jquery';

interface IProps {
  children: ReactNode;
}
export const JqueryProvider = ({ children }: IProps) => {
  const location = useLocation();

  useEffect(() => {
    // Prevent adding element already existed
    jquery('#scrollUp').remove();
    main();
  }, [location.pathname]);

  return <>{children}</>;
};
