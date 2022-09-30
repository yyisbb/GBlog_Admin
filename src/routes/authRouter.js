import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import tokenUtil from '../utils/tokenUtil';

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props) => {
    const { pathname } = useLocation();

    // * 判断当前路由是否需要访问权限(不需要权限直接放行)
    if (pathname === '/login') return props.children;

    // * 判断是否有Token
    const token = tokenUtil.getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // * 当前账号有权限返回 Router，正常访问页面
    return props.children;
};
AuthRouter.propTypes = {
    children: PropTypes.object
};
export default AuthRouter;
