// 数据管理模块

// assets
import { AppleOutlined, AliyunOutlined } from '@ant-design/icons';

// icons
const icons = {
    AppleOutlined,
    AliyunOutlined
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
        },
        {
            id: 'category',
            title: '分类管理',
            type: 'item',
            url: '/category/list',
            icon: icons.AliyunOutlined
        }
    ]
};

export default data;
