import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));
const ArticlePost = Loadable(lazy(() => import('pages/article/articlePost')));
const ArticleList = Loadable(lazy(() => import('pages/article/articleList')));

// import Navigate
import { Navigate } from 'react-router';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Navigate to={'/login'} />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'index',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'article',
            children: [
                {
                    path: 'list',
                    element: <ArticleList />
                },
                {
                    path: 'post',
                    element: <ArticlePost />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
