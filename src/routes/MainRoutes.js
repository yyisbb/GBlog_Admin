import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

const ArticlePost = Loadable(lazy(() => import('pages/article/articlePost')));
const ArticleList = Loadable(lazy(() => import('pages/article/articleList')));
const CategoryList = Loadable(lazy(() => import('pages/category/categoryList')));

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
            path: 'category',
            children: [
                {
                    path: 'list',
                    element: <CategoryList />
                }
            ]
        }
    ]
};

export default MainRoutes;
