import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Dashboards',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: 'Test',
        path: 'test',
      },
    ],
  },
  {
    name: 'User',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: 'Login',
        path: 'login',
      },
      {
        name: 'Register',
        path: 'register',
      },
      {
        name: 'Register Result',
        path: 'register-result',
      },
      {
        name: 'Test',
        path: 'test',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
