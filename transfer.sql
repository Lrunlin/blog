-- 为tag创建type表的description字段，将belong改为belong_id
-- 运行这个SQL将type表的数据合并好tag表
-- 在OSS中将type文件夹重命名为tag


-- 将type表中数据转移到tag表后删除type表
INSERT INTO tag (id, name, icon_file_name, indexes, description, create_time)
SELECT id, name, icon_file_name, indexes, description, create_time FROM type
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    icon_file_name = VALUES(icon_file_name),
    indexes = VALUES(indexes),
    description = VALUES(description),
    create_time = VALUES(create_time);

DROP TABLE IF EXISTS type;
