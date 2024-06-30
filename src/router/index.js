
import Vue from 'vue'; // 引入 Vue.js
import VueRouter from 'vue-router'; // 引入 Vue Router
import GlobalLayout from '@/layouts/GlobalLayout'; // 引入全局布局组件
// import routes from './routes';

Vue.use(VueRouter); // 使用 Vue Router


// 假设这是用户的权限级别，从用户的会话或配置中获取
const usersData = JSON.parse(localStorage.getItem("users"));
const userPrivileges = usersData && usersData.userPrivileges ? parseInt(usersData.userPrivileges) : 0;
// const userPrivileges = 2;
const RouteView = {
  name: 'RouteView',
  render: h => h('router-view'), // 渲染路由视图组件
};
const routes = [
  {
    path: '/', // 根路由
    name: 'Home',
    meta: { title: '主页' },
    redirect: '/race/list', // 重定向至赛事列表页面
    component: GlobalLayout, // 使用全局布局组件
    children: [
			{
        path: '/console', // 赛事管理路由
        name: 'Console',
        redirect: '/console/list', // 默认重定向至赛事列表页面
        component: RouteView, // 使用路由视图组件
        meta: { title: '首 页', icon: 'appstore' }, // 路由元信息
        children: [
          {
            path: '/console/list', // 赛事列表路由
            name: 'ConsoleLog',
            component: () => import('@/views/user/Console.vue'), // 异步加载赛事列表组件
            // meta: { title: '大数据', auth: [0, 1, 2] }, // 路由元信息，指定需要的权限
            meta: { title: '大数据', auth: 0 }, // 路由元信息，指定需要的权限
          },
        ],
      },

      {
        path: '/race', // 赛事管理路由
        name: 'Race',
        redirect: '/race/list', // 默认重定向至赛事列表页面
        component: RouteView, // 使用路由视图组件
        meta: { title: '赛事管理', icon: 'appstore' }, // 路由元信息
        children: [
          {
            path: '/race/list', // 赛事列表路由
            name: 'RaceList',
            component: () => import('@/views/race/Race'), // 异步加载赛事列表组件
            meta: { title: '赛事列表', auth: [0, 1, 2] }, // 路由元信息，指定需要的权限
          },
          {
            path: '/race/record', // 参赛记录路由
            name: 'Record',
            component: () => import('@/views/race/Record'), // 异步加载参赛记录组件
            meta: { title: '参赛记录', auth: [0, 1, 2] }, // 路由元信息，指定需要的权限
          },
          {
            path: '/race/down', // 参赛记录路由
            name: 'Down',
            component: () => import('@/views/race/Down'), // 异步加载参赛记录组件
            meta: { title: '参赛资料', auth: [0, 1, 2] }, // 路由元信息，指定需要的权限
          },
        ],
      },
      {
        path: '/user', // 用户管理路由
        redirect: '/user/student', // 默认重定向至学生列表页面
        name: 'User',
        component: RouteView, // 使用路由视图组件
        meta: { title: '用户管理', icon: 'user', auth: [0, 1] }, // 路由元信息，指定需要的权限
        children: [
          {
            path: '/user/student', // 学生列表路由
            name: 'Student',
            component: () => import('@/views/user/Student'), // 异步加载学生列表组件
            meta: { title: '学生列表', auth: [0, 1] }, // 路由元信息
          },
          {
            path: '/user/teacher', // 教师列表路由
            name: 'Teacher',
            component: () => import('@/views/user/Teacher'), // 异步加载教师列表组件
            meta: { title: '教师列表', auth: [0] }, // 路由元信息
          },
        ],
      },

      {
        path: '/community', // 权限管理路由
        redirect: '/community/list', // 默认重定向至角色列表页面
        name: 'Role',
        component: RouteView, // 使用路由视图组件
        meta: { title: '交流社区', icon: 'key' }, // 路由元信息
        children: [
          {
            path: '/community/Article', // 权限列表路由
            name: 'Article',
            meta: { title: '论坛首页', auth: [0, 1, 2] }, // 路由元信息，指定需要的权限
            component: () => import('@/views/communtiy/Article.vue'), // 异步加载权限列表组件
          },
          {
            path: '/community/publish', // 权限列表路由
            name: 'publish',
            meta: { title: '在线发帖', auth: [0, 1, 2] }, // 路由元信息，指定需要的权限
            component: () => import('@/components/edit/tinymce.vue'), // 异步加载权限列表组件
          },
          {
            path: '/community/editcontent', // 权限列表路由
            name: 'editcontent',
            meta: { title: '修改帖子', auth: [0, 1, 2] ,hidden:true}, // 路由元信息，指定需要的权限
            component: () => import('@/components/edit/EditContent.vue'), // 异步加载权限列表组件
          },
          {
            path: '/pages', // 登录页面路由
            name: 'pages',
            meta: { title: '内容', auth: [0, 1, 2],hidden:true }, // 路由元信息
            component: () => import('@/views/communtiy/pages.vue'), // 异步加载登录页面组件
          },
          {
            path: '/account/center', // 角色列表路由
            name: 'AccountCenter',
            meta: { title: '个人中心', auth: [0, 1, 2] }, // 路由元信息，指定需要的权限
            component: () => import('@/views/account/center/index.vue'), // 异步加载角色列表组件
          },
        ],
      },
      {
        path: '/account', // 权限管理路由
        name: 'Account',
        component: RouteView, // 使用路由视图组件
        meta: { title: '竞赛助手', icon: 'key' }, // 路由元信息
        children: [
          {
            path: '/account/Ai', // 角色列表路由
            name: 'AccountSettings',
            meta: { title: '竞赛助手', auth: 0 }, // 路由元信息，指定需要的权限
            component: () => import('@/views/user/Ai.vue'), // 异步加载角色列表组件

          },
        ],
      },
    ],
  },
  {
    path: '/login', // 登录页面路由
    name: 'Login',
    meta: { title: '登陆' }, // 路由元信息
    component: () => import('@/views/Login'), // 异步加载登录页面组件
  },
  {
    path: '/404', // 404 页面路由
    component: () => import('@/components/common/404'), // 异步加载 404 组件
  },
  {
    path: '*', // 匹配任何不存在的路由
    redirect: '/404', // 重定向至 404 页面
  },
];
// const userPrivileges = 1;
 // 这个函数假设是从某处获取用户权限级别
console.log("routes",routes)
// 使用filterRoutes函数过滤路由
// const filteredRoutes = filterRoutes(routes, userPrivileges);
const filteredRoutes = filterRoutes(routes, userPrivileges);
// 然后可以使用filteredRoutes来初始化Vue Router或生成路由菜单
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes, // 使用过滤后的路由配置
  // routes: routes, // 使用过滤后的路由配置
});

/**
 * 根据用户权限过滤路由
 * @param {Array} routes 路由配置数组
 * @param {number} userPrivileges 当前用户权限级别
 * @returns 过滤后的路由数组
 */
export function filterRoutes(routes, userPrivileges) {
  // 过滤单个路由
  function filterSingleRoute(route, userPrivileges) {
    // 如果路由或其子路由需要的权限高于用户权限，则不包括该路由
    if (route.meta && route.meta.auth) {
      if (Array.isArray(route.meta.auth)) {
        // 如果路由需要多个权限，只要用户拥有其中之一即可访问
				if (!route.meta.auth.some(authLevel => userPrivileges == authLevel)) {
          return null;
        }
      } else {
        // 如果路由需要的权限高于用户权限，则不包括该路由
        if (userPrivileges < route.meta.auth) {
          return null;
        }
      }
    }

    // 如果路由有子路由，递归过滤子路由
    if (route.children && route.children.length >= 0) {
      route.children = route.children
        .map(childRoute => filterSingleRoute(childRoute, userPrivileges))
        .filter(childRoute => childRoute !== null  && childRoute?.meta?.hidden!=true); // 过滤掉null值
    }

    return route;
  }

  // 过滤所有路由
  return routes.map(route => filterSingleRoute(route, userPrivileges)).filter(route => route !== null);
}

export default router; // 导出 Vue Router 实例
