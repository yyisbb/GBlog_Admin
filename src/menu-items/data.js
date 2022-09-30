// 数据管理模块

// assets
import { UnorderedListOutlined, ZoomOutOutlined, SettingOutlined } from '@ant-design/icons';

// icons
const icons = {
    UnorderedListOutlined,
    ZoomOutOutlined,
    SettingOutlined
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const data = {
    id: 'data',
    title: '博客管理',
    type: 'group',
    children: [
        {
            id: 'setting',
            title: '网站设置',
            type: 'item',
            url: '/setting',
            icon: icons.SettingOutlined
        },
        {
            id: 'article',
            title: '文章列表',
            type: 'item',
            url: '/article/list',
            icon: icons.UnorderedListOutlined
        },
        {
            id: 'category',
            title: '分类管理',
            type: 'item',
            url: '/category/list',
            icon: icons.ZoomOutOutlined
        }
    ]
};

export default data;
