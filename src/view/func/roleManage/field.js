
export const editRules = {
    rName: [
        {
            required: true,
            min: 1,
            message: '请输入角色名称',
            trigger: 'change',
        }
    ],
    rDescription: [
        {
            required: true,
            min: 1,
            message: '请输入角色描述',
            trigger: 'change',
        }
    ]
}