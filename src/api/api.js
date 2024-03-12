const isProduct = false;
const buff = isProduct ? 'pro' : 'dev';

const basicUrl = !isProduct ? 'http://127.0.0.1:9000' : 'https://toolapi.biewangwo.com';

const api = {
    
    // 登录接口 成功返回token 和用户信息
    login: `/api/agent/login`,

    //验证码
    getVerify:             `/api/user/getVerify`,
    checkVerify:           `/api/user/checkVerify`,
    modifyUserType:        `/api/user/modifyUserType`,

    //获取所有代理商 添加账号 停用 授权角色
    getAllAuthAgent:     `/api/agent/getAllAuthAgent`,
    getAllAuthAgentPage: `/api/agent/getAllAuthAgentPage`,
    saveAuthAgent:       `/api/agent/saveAuthAgent`,
    stopAuthAgent:       `/api/agent/stopAuthAgent`,
    giveRole:            `/api/agent/giveRole`,
    modifyAuthAgent:     `/api/agent/modifyAuthAgent`,

    //查询所有角色  修改角色  删除角色
    getAllAuthRole:         `/api/agent/getAllAuthRole`,
    getAllAuthRoleTrue:     `/api/agent/getAllAuthRoleTrue`,
    modifyAuthRole:         `/api/agent/modifyAuthRole`,
    removeAuthRole:           `/api/agent/stopAuthRole`,
    getAllAuthAgentByRoleId:  `/api/agent/getAllAuthAgentByRoleId`,
    modifyPassword:           `/api/agent/modifyPassword`,

    //查询微信 支付宝用户信息
    getAllUserInfo:      `/api/user/getAllUserInfo`,

    //查询所有菜单
    getAllAuthMenu:      `/api/agent/getAllMenu`,
    getMenuByParentId:   `/api/agent/getMenuByParentId`,
    saveAuthMenu:        `/api/agent/saveAuthMenu`,
    deleteAuthMenu:      `/api/agent/deleteAuthMenu`,
    getMenuByRoleId:     `/api/agent/getMenuByRoleId`,

    //会员卡查询
    getMemberCard:        `/api/user/getMemberCard`,
    modifyCard:           `/api/user/modifyCard`,
    getMemberCardRecord:  `/api/user/getAllMemberCardRecord`,


    getAllAiVoiceCategory:`/api/ai/voice/getAllAiVoiceCategory`,
    getALLAiVoicePerson:  `/api/ai/voice/person/getALLAiVoicePerson`,
    getALLAiVoiceStatistics:  `/api/ai/voice/getALLAiVoiceStatistics`,


    // 报名系统 影视委
    saveOtherVideoRegister:    `/api/other/saveOtherVideoRegister`,
    getALLOtherVideoRegister:  `/api/other/getALLOtherVideoRegister`,
    upLoadQiniu:               `/api/other/upLoadQiniu`,

    // 新乡贤
    saveFellowRegister:    `/api/fellow/saveFellowRegister`,
    getALLFellowRegister:  `/api/fellow/getALLFellowRegister`,
    
}

export {
    isProduct,
    buff,
    api
}