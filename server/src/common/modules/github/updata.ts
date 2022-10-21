import DB from "@/db";

/** 更新用户的github字段*/
async function updateGithub(user_id: number, github_name: string) {
  return await DB.User.update({ github: github_name }, { where: { id: user_id } })
    .then(res => {
      if (res[0]) {
        return { success: true, message: `成功将Github用户绑定为:${github_name}` };
      } else {
        return { success: false, message: "请不要重复绑定" };
      }
    })
    .catch(() => {
      return { success: false, message: "绑定失败" };
    });
}
export default updateGithub;
