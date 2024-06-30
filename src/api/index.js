import request from '../utils/axios';
// 学生登录√
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
// 获取个人信息√
export function getUserInfo(params) {
  return request({
    url: '/user/getUserInfo',
    method: 'get',
    params
  })
}
// 更新个人信息√
export function updateUser(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/user/update',
    method: 'put',
    data: formData,
    
  });
}
export const AllUser = params => request.get('/user/getUserAll', { params });
// 创建用户√
export function CreateUser(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/user/create',
    method: 'post',
    data: formData,
    
  });
}
// 添加文章√
export function createArticle(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/article/createArticle',
    method: 'post',
    data: formData,
    
  });
}
// 用户上传单文件√
export function uploadOneFile(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/oss/uploadOneFile',
    method: 'post',
    data: formData,
    
  });
}
// 用户上传多文件√
export const uploadArrayFile = data => request.post('/oss/uploadArrayFile', { data });
//删除文件×××××××
export const deleteFile = data => request.post('/oss/deleteFile', { data });
// 发送短信√
export function SendSMS(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/api/sendsms',
    method: 'post',
    data: formData,
    
  });
}
// 发送邮件√
export function SendEmail(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/api/sendemail',
    method: 'post',
    data: formData,
    
  });
}
// 学生报名√
export function Enroll(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/registration/enroll',
    method: 'post',
    data: formData,
    
  });
}
// 审核比赛√
export function Review(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/registration/review',
    method: 'put',
    data: formData,
    
  });
}
// 查看所有比赛√
export const AllCompetition = params => request.get('/competition/list', { params });
// 添加比赛√
export function AddCompetition(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/competition/add',
    method: 'post',
    data: formData,
    
  });
}
// 删除比赛√
export const DeleteCompetition = id => request.delete(`/competition/delete/${id}`);
// 更新比赛√
export function UpCompetition(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/competition/update',
    method: 'put',
    data: formData,
    
  });
}
// 模糊搜索比赛×××××××
export function SearchCompetition(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/competition/search',
    method: 'get',
    data: formData,
    
  });
}
// 查看所有文章√
export const AllArticle = params => request.get('/article/getHistoryArticle', { params });
// 创建文章√
export const CreateArticle = data => request.post('/article/createArticle', { data });
// 通过id查看文章√
export function ArticleById(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/article/getArticleById',
    method: 'post',
    data: formData,
    
  });
}
// 通过id删除文章√
export function DeteleArticleById(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/article/deleteArticleById',
    method: 'post',
    data: formData,
    
  });
}
// 更新文章√
export function UpArtile(data) {
  const formData = new FormData();
  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return request({
    url: '/article/upData',
    method: 'post',
    data: formData,
    
  });
}
// 获取所有评论√
export const Comments = params => request.get('/comments', { params });
// 根据文章id获取文章评论√
export const CommentsById = params => request.get(`/comment/getAllById`, { params });
// 发布评论√
export function PublishComments(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/comment/creat',
    method: 'post',
    data: formData,
    
  });
}
// 删除评论√
export const DeleteComments = id => request.delete(`/comment/delete/${id}`);
export const importUser = data => request.post('/user/user/import', data);
// 获取所有报名信息√
export const RegistrationAll = params => request.get('/registration/getAll', { params });
// 管理员修改用户√
export function UPuser(data) {
  const formData = new FormData();
  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }
  return request({
    url: '/user/updateOther',
    method: 'put',
    data: formData,
    
  });
}
// 批量删除用户√
export function deleteList(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/user/deleteList',
    method: 'delete',
    data: formData,
    
  });
}
// 查看所有资料√
export const Allinformation = params => request.get('/api/information/getAll', { params });
// 录制成绩
export function RegistrationAdd(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/registration/update',
    method: 'post',
    data: formData,
    
  });
}
// 获取所有教师
export const getTeacherCount = params => request.get('/user/getTeacherCount', { params });
// 获取所有学生
export const getStudentCount = params => request.get('/user/getStudentCount', { params });
// 获取所有用户
export const getCount = params => request.get('/user/getCount', { params });
// 获取所有获奖人员信息
export const getWinInfo = params => request.get('/registration/getWinInfo', { params });
// 获取参赛总人数
export const getCounts = params => request.get('/registration/getCount', { params });
// 根据参赛类型获取参赛人数
export const getCountByCompetitionType = params => request.get('/registration/getCountByCompetitionType', { params });
// 根据获奖等级获取参赛人数
export const getWinCountByLevel = params => request.get('/registration/getWinCountByLevel', { params });
// 添加好友
export function addFriend(data) {
  const formData = new FormData();

  // 将data对象的属性添加到FormData对象中
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return request({
    url: '/friend/addFriend',
    method: 'POST',
    data: formData,
    
  });
}