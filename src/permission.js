import store from '@/store'; // 导入 Vuex store 实例
import router from '@/router'; // 导入 Vue Router 实例
import { notification } from 'ant-design-vue'; // 导入 ant-design-vue 的 notification 组件
import NProgress from 'nprogress'; // 导入进度条组件
import 'nprogress/nprogress.css'; // 导入进度条样式
NProgress.configure({ showSpinner: false }); // 配置进度条，隐藏加载动画

const loginPath = '/login'; // 登录路径
const defaultRoutePath = '/race/list'; // 默认路由路径
const whiteList = ['Login']; // 白名单，无需登录即可访问的页面

router.beforeEach(async(to, from, next) => {
    NProgress.start(); // 开始进度条

		const tokens = window.localStorage.getItem("token"); // 使用相同的键来获取token
    /* 未登录情况下的路由拦截 */
    if (!tokens) {
			// alert(tokens)
        if (whiteList.includes(to.name)) { // 如果在白名单中，直接放行
            next();
        } else { // 否则重定向至登录页面
            next({
                path: loginPath,
                query: {
                    redirect: to.fullPath,
                },
            });
        }
        return;
    }

    /* 已登录情况下访问登录界面的处理 */
    if (to.path === loginPath) { // 如果已登录且访问登录页面，则重定向至默认页面
        next(defaultRoutePath);
        return;
    }

    /* 已获取用户信息的情况 */
    if (store.getters.permissions!=null && store.getters.permissions!=="") { // 如果已获取用户权限信息，则直接放行
        next();
        NProgress.done(); // 结束进度条
        return;
    }

    /* 未获取用户信息的情况 */
    try {
        await store.dispatch('initUser'); // 异步获取用户信息
    } catch (e) {
        store.commit('logout'); // 获取失败时执行退出登录操作
        next({ path: loginPath, query: { redirect: to.fullPath } }); // 重定向至登录页面
        notification.error({
            message: '错误',
            description: '请求用户信息失败，请重试',
        }); // 显示错误通知
        NProgress.done(); // 结束进度条
        return;
    }

    /* 成功获取用户信息的情况 */
    // 检查路由权限
    if (!checkAccess(to)) { // 如果当前路由无权限访问，则重定向至默认页面
        next({ path: defaultRoutePath, replace: true });
        NProgress.done(); // 结束进度条
        return;
    }
    const redirect = decodeURIComponent(from.query.redirect || to.path); // 获取重定向地址
    // 如果重定向地址与当前路径相同，则替换历史记录
    if (redirect === to.path) {
        next({...to, replace: true });
    } else { // 否则正常重定向
        next(redirect);
    }
    NProgress.done(); // 结束进度条
});

router.afterEach(() => {
    NProgress.done(); // 结束进度条
});

/**
 * 判断当前路由是否具有权限访问
 * @param {Route} route 路由对象
 * @returns {boolean} 是否具有权限
 */

function checkAccess(route) {

	const userPrivileges = store.state.user.userPrivileges==null ? 1 : store.state.user.userPrivileges; // 获取用户权限信息
	const requiredPrivileges = route.meta.auth; // 获取当前路由所需权限信息
	console.log(userPrivileges)
	// 如果路由未设置权限要求，则默认放行
	if (!requiredPrivileges) {
			return true;
	}

	// 检查用户的权限是否包含在所需权限中
	return requiredPrivileges.includes(userPrivileges);
}
