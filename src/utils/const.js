export const grades = [
  { label: '会计学院', value: 1 },
  { label: '经济贸易学院', value: 2 },
	{ label: '电信工程学院', value: 3 },
  { label: '服装与技术贸易学院', value: 4 },
  { label: '医药工程学院', value: 5 },
	{ label: '人文与艺术学院', value: 6 },
	{ label: '计算机学院', value: 7 },
	{ label: '镐京书院', value: 8 },
	{ label: '外语教育部', value: 9 },
	{ label: '思政部', value: 10 },
	{ label: '体育部', value: 11 },

];
export const message = [
  { label: '公告', value: '公告' },
  { label: '讨论', value: '讨论' },
	{ label: '组队', value: '组队' },
];
export const userPrivileges = [
  { label: '管理员', value: 0 },
  { label: '教师', value: 1 },
	{ label: '学生', value: 2 },
];
export const gradeMap = map(grades);

export const ranks = [
  { label: '其他', value: '其他' },
  { label: '教授', value: '教授' },
  { label: '副教授', value: '副教授' },
  { label: '讲师', value: '讲师' },
];
export const records = [
  { label: '一等奖', value: '一等奖' },
  { label: '二等奖', value: '二等奖' },
  { label: '三等奖', value: '三等奖' },
  { label: '金奖', value: '金奖' },
	{ label: '银奖', value: '银奖' },
	{ label: '铜奖', value: '铜奖' },
	{ label: '鼓励奖', value: '鼓励奖' },
];
export const UserStatus = [
  { label: '正常', value: 0 },
  { label: '异常', value: 1 },
];

export const competitionStatus = [
  { label: '进行中', value: 0 },
  { label: '已终止', value: 1 },
];
// export const competitionStatus = map(competitionStatus);
export const rankMap = map(ranks);

export const sexes = [
  { label: '男', value: '男' },
  { label: '女', value:'女' },
];
export const sexMap = map(sexes);

export const raceLevels = [
  { label: '院级', value: '院级' },
  { label: '校级', value: '校级' },
  { label: '市级', value:'市级' },
  { label: '省级', value: '省级' },
	{ label: '国家级', value: '国家级' },
];
export const raceLevelMap = map(raceLevels);

function map(arr) {
  const result = {};
  for (const { label, value } of arr) {
    result[value] = label;
  }
  return result;
}

export const permissionTypes = [
  'user',
  'race',
  'record',
  'role',
  'permission',
].map(key => ({
  label: key,
  value: key,
}));

export const actions = [
  'add',
  'delete',
  'update',
  'query',
  'import',
  'export',
].map(key => ({
  label: key,
  value: key,
}));
