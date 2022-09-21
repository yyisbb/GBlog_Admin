// 数据管理模块

// assets
import { AppleOutlined } from '@ant-design/icons';

// icons
const icons = {
    AppleOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const data = {
    id: 'data',
    title: '博客管理',
    type: 'group',
    children: [
        {
            id: 'article',
            title: '文章列表',
            type: 'item',
            url: '/article/list',
            icon: icons.AppleOutlined
        }
    ]
};

export default data;
