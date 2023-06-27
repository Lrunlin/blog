import { Sequelize, type QueryOptions, type QueryOptionsWithType, QueryTypes } from "sequelize";
import sequelize from "@/db/config";
import DB from "@/db";

interface optionType {
  /** 表名*/
  tableName: keyof typeof DB;
  /** 字段名*/
  field: string;
  /** 旧值*/
  oldValue: string | number;
  /** 新值*/
  newValue: string | number;
  whereSql?: string;
}

/**
 * 对一些用于存储数据(数组作用)的字符串实现replace操作
 */
async function stringArrayReplace(
  option: optionType,
  sequelizeOpeion?: QueryOptions | QueryOptionsWithType<QueryTypes.RAW> | undefined
) {
  //将文章表中的 ,id,  ,id   id,   id  四种方法全部置换
  try {
    // 中间  ,id,   换为 id,
    await sequelize.query(
      `update ${option.tableName.toLocaleLowerCase()} set ${option.field}=REPLACE (${
        option.field
      },',${option.oldValue},','${option.newValue},') WHERE ${option.field} like '%${
        option.oldValue
      }%' ${option.whereSql || ""}`,
      { type: QueryTypes.UPDATE, raw: false, ...sequelizeOpeion }
    );

    // 最后一个 ,id 换为空
    await sequelize.query(
      `update ${option.tableName.toLocaleLowerCase()} set ${option.field}=REPLACE (${
        option.field
      },',${option.oldValue}','') WHERE ${option.field} like '%${option.oldValue}%' ${
        option.whereSql || ""
      }`,
      { type: QueryTypes.UPDATE, raw: false, ...sequelizeOpeion }
    );

    // 第一个 id, 换为空
    await sequelize.query(
      `update ${option.tableName.toLocaleLowerCase()} set ${option.field}=REPLACE (${
        option.field
      },'${option.oldValue},','') WHERE ${option.field} like '%${option.oldValue}%' ${
        option.whereSql || ""
      }`,
      { type: QueryTypes.UPDATE, raw: false, ...sequelizeOpeion }
    );
    //  只有一个的情况下  直接置换为空
    await sequelize.query(
      `update ${option.tableName.toLocaleLowerCase()} set ${option.field}=REPLACE (${
        option.field
      },'${option.oldValue}','${option.newValue}') WHERE ${option.field} like '%${
        option.oldValue
      }%' ${option.whereSql || ""}`,
      { type: QueryTypes.UPDATE, raw: false, ...sequelizeOpeion }
    );
    return true;
  } catch (error) {
    console.log(error);
    return true;
  }
}
export default stringArrayReplace;
