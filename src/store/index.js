import Vue from 'vue'; // 引入 Vue.js
import Cookie from 'js-cookie'; // 引入 Cookie 操作库
import Vuex, { createLogger } from 'vuex'; // 引入 Vuex 状态管理库及日志插件
import { getUserInfo } from '@/api'; // 引入获取用户数据的 API 方法
const TokenKey = 'vue_admin_template_token'
Vue.use(Vuex); // 使用 Vuex
const debug = process.env.NODE_ENV !== 'production'; // 判断是否为开发环境
const store = new Vuex.Store({
    strict: debug, // 开启严格模式
    plugins: debug ? [createLogger()] : [], // 在开发环境下启用日志插件
    state: {
        user: {}, // 用户信息对象
				token: Cookie.get(TokenKey),
				avatar:'',
    },
    getters: {
        permissions(state) {
            return state.user.userPrivileges; // 获取用户权限
        },
				getToken: state => state.token,
				avatar: state => state.avatar
    },
    actions: {
			  // 从本地存储加载状态并初始化 Vuex
				// 从本地存储加载状态并初始化 Vuex
  			initStoreFromLocalStorage({ commit }) {
  			  const storedUserData = localStorage.getItem('users');
    			if (storedUserData) {
     			 const userData = JSON.parse(storedUserData);
      			commit('setUserData', userData); // 使用 mutation 将数据保存到 Vuex 中
    			}
  			},
        // 初始化用户数据，并在完成后调用 initStoreFromLocalStorage
  			initUser({ commit, dispatch }) {
    			return getUserInfo().then(data => {
     			 console.log(data.data)
      			window.localStorage.setItem('users', JSON.stringify(data.data))
      			commit('setUserData', data.data); // 提交用户数据至 mutations
      			// 调用 initStoreFromLocalStorage 方法
      			dispatch('initStoreFromLocalStorage');
      			return data.data; // 返回用户数据
    			});
  		},
				updateToken({ commit }, token) {
					commit('setToken', token);
				}
    },
    mutations: {
        // 登出，移除用户标识符
        logout() {
					localStorage.removeItem('token');
        },
        // 设置用户数据
        setUserData(state, user) {
            state.user = user; // 更新用户信息
						// 设置用户头像
						switch (state.user.userPrivileges) {
							// 管理员
							case 0:
									state.avatar = 'https://img.pqblog.com/i/2024/04/24/235203_1.jpg';
									break;
									// 教师
							case 1:
									state.avatar = 'https://img.pqblog.com/i/2024/04/24/235203.jpg';
									break;
									// 学生
							case 2:
									state.avatar = 'https://img.pqblog.com/i/2024/04/24/235909.jpg';
									break;
							default:
									state.avatar = 'https://img.pqblog.com/i/2024/04/24/235203_1.jpg'; // Default or unknown privilege
					}
        },
				setToken(state, token) {
					localStorage.setItem('token', token);
					state.token = token;
				}
    },
});

export default store; // 导出 Vuex Store

/**
 * 判断当前用户是否具有对应的权限
 * @param {string} permission 权限字符串，类似于 user:query
 * @returns {boolean} 返回布尔值，表示用户是否具有该权限
 */
Vue.prototype.$has = function(permission) {
	const userPermission = store.getters.permissions;
	// 根据用户权限数字来判断是否具有对应权限
	switch (userPermission) {
			case 0:
					// 如果用户权限为 0，表示没有权限
					return false;
			case 1:
					// 如果用户权限为 1，判断是否为查询权限
					return permission === 'user:query';
			case 2:
					// 如果用户权限为 2，判断是否为修改权限
					return permission === 'user:update';
			default:
					// 默认情况下，假设没有权限
					return false;
	}
};