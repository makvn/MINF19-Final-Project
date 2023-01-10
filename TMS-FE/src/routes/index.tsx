import { useRoutes } from 'react-router-dom';
import { publicRoutes } from '@/routes/public';
import { adminRoutes } from '@/routes/protected';
import { Home } from '@/features/home';
import { Unauthenticate } from '@/component/Unauthenticate';

export const AppRoutes = () => {
  const commonRoutes = [
    {
      path: '/',
      element: (
        <Unauthenticate>
          <Home />
        </Unauthenticate>
      ),
    },
  ];

  const routes = [...publicRoutes, ...adminRoutes];

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
};
