
export const editRules = {
    title: [
        {
            required: true,
            min: 1,
            message: '请输入菜单标题',
            trigger: 'change',
        }
    ],
    path: [
        {
            required: true,
            min: 1,
            message: '请输入菜单路径',
            trigger: 'change',
        }
    ]
}