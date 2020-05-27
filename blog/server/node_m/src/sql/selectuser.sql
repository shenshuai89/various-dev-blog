-- select * from users;
-- |
-- select id, username from users;
-- |
-- select * from users where username='zhangsan' or 'password' = '123';
-- 按照一个字段模糊查询，默认是正序，后边加上desc是倒序
-- select * from users where password like '%1%' order by id;

select * from users where password like '%1%' order by id desc;

