# --coding:utf-8-- #
import pymysql
# 1.连接名字为"pymysql"的数据库
conn = pymysql.connect(host="localhost", user="root", password="lihouhua", database="pymysql", port=3306)
cursor = conn.cursor()
 
# 2.创建表
# sql = """create table students(
# name text,
# username text,
# id int
# )"""
# cursor.execute(sql)
 
# 3.写入数据:方法一
# sql = """insert into students
# (name, username, id)
# values
# ('黄继光', 'Jason', 123456)"""
# cursor.execute(sql)
# conn.commit()
# cursor.close()
# conn.close()
 
# 4.写入数据:方法二
# name_ = "李军"
# username_ = "lijun"
# id_num = 1258
# sql = """insert into students
# (name, username, id)
# values
# (%s, %s, %s)"""
# cursor.execute(sql, (name_, username_, id_num))
# # cursor.execute(sql, (name_, username_))
# conn.commit()
# cursor.close()
# conn.close()
 
# 5.查找数据：cursor.fetchone() 查找1条数据
# 5.1 """select name, username, id from students where id>1"""
# sql = """select name from students where id>1"""
# 5.2 """select * from students where id>1"""
# sql = """select * from students where id>1"""
# cursor.execute(sql)
# while True:
#     # cursor.fetchone() 查找1条数据
#     result = cursor.fetchone()
#     if result:
#         print result
#     else:
#         break
# conn.close()
 
# 6.查找数据：cursor.fetchmany() 查找1条数据
# """select * from students where id>1"""
# sql = """select * from students where id>1"""
# cursor.execute(sql)
# # cursor.fetchmany(2) 查找2条数据
# result = cursor.fetchmany(2)
# for re in result:
#     print re
# conn.close()
 
# 7.查找数据：cursor.fetchall() 查找1条数据
# """select * from students where id>1"""
# sql = """select * from students where id>1"""
# cursor.execute(sql)
# # cursor.fetchall() 查找2条数据
# result = cursor.fetchall()
# for re in result:
#     print re
# conn.close()
 
# 8.删除和更新数据：
# sql = """delete from students where id=1258"""
# cursor.execute(sql)
# # 插入，删除，更新数据都需要commit()
# conn.commit()
# conn.close()
 
# 9.更新数据：cursor.fetchall() 查找1条数据
# """select * from students where id>1"""
sql = """update students set username=(%s) where id=124"""
cursor.execute(sql, ("leiweijia"))
conn.commit()
conn.close()