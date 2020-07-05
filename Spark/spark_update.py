# 导入包
import os
import pymysql
import pandas as pd
from pyspark.sql import Row
from pyspark.sql.types import *
from datetime import datetime
import pyspark.sql.functions as func
from pyspark.sql import SparkSession
from sqlalchemy import create_engine
from pyspark import SparkConf,SparkContext

# 判断当前目录下是否存在Data文件夹，如果没有就新建
dir_exists = os.system('ls | grep Data')
if dir_exists:
    os.system('mkdir Data')

# 下载文件在本地
filename = datetime.now().strftime("%Y-%m-%d") + '.csv'
file_exist = os.system('ls ./Data | grep {filename}'.format(filename = filename)) #0 表示存在
if not file_exist:
    os.system('rm -f ./Data/*')
downloadfile = 'hdfs dfs -get hdfs://121.41.225.123:9000/Data/'+filename+' ./Data'
downloadfile = downloadfile.format(date = datetime.now().strftime("%Y-%m-%d"))
status = os.system(downloadfile)

#格式转换
data = pd.read_csv('./Data/{filename}'.format(filename = filename))
textname = datetime.now().strftime("%Y-%m-%d") + '.txt'
os.system('rm -f ./Data/{textname}'.format(textname=textname))
with open('./Data/'+textname,'a+',encoding='utf-8') as f:
    for line in data.values:
        f.write((str(line[0])+'\t'+str(line[1])+'\t'+str(line[2])+'\t'+str(line[3])+'\t'+str(line[4])+'\t'
                +str(line[5])+'\t'+str(line[6])+'\t'+str(line[7])+'\t'+str(line[8])+'\t'+str(line[9])+'\t'
                +str(line[10])+'\n'))

# 创建spark
spark = SparkSession.builder.config(conf = SparkConf()).getOrCreate()

# 创建模式
fields = [StructField("date"  ,       StringType(),   False),
          StructField("country",      StringType(),   False),
          StructField("countryCode",  StringType(),   False),
          StructField("province" ,    StringType(),   False),
          StructField("provinceCode", StringType(),   False),
          StructField("city" ,        StringType(),   False),
          StructField("cityCode" ,    StringType(),   False),
          StructField("confirmed" ,  IntegerType(),   False),
          StructField("suspected" ,  IntegerType(),   False),
          StructField("cured" ,      IntegerType(),   False),
          StructField("dead",        IntegerType(),   False),]

rdd0 = spark.sparkContext.textFile('file:///home/hadoop/Data/{textname}'.format(textname=textname))
rdd1 = rdd0.map(lambda x:x.split("\t")).map(lambda p: Row(p[0],p[1],p[2],p[3],p[4],p[5],p[6],int(p[7]),int(p[8]),int(p[9]),int(p[10])))
schema = StructType(fields)

# 注册 ncov_2019临时表
shemaUsInfo = spark.createDataFrame(rdd1,schema)
shemaUsInfo.createOrReplaceTempView("ncov_2019")

# 查询各省市的情况并将结果写入mysql数据库中
df1 = spark.sql("SELECT date ,province,confirmed,suspected,cured,dead FROM ncov_2019 WHERE countryCode='CN' AND provinceCode != 'nan' AND city = 'nan'")
df1 = df1.withColumnRenamed("date","id")
connect = create_engine('mysql+pymysql://root:root@121.41.225.123:3306/mydb?charset=utf8')
prop = {'user':'root','password':'root','driver':'com.mysql.jdbc.Driver'}
df1.write.jdbc("jdbc:mysql://121.41.225.123/mydb",'province_total','overwrite', prop)

# 删除 china_total_with_date中关于今天的数据
db = pymysql.connect("121.41.225.123", "root", "root", "mydb", charset='utf8' )
cursor = db.cursor()
sql = "DELETE FROM china_total_with_date where date = '" + datetime.now().strftime("%Y-%m-%d") + "'"
try:
   cursor.execute(sql)
   db.commit()
except:
   print("execute sql faild")
db.close()

# 将今天的情况追加到china_toal_with_date表中
df2 = spark.sql("SELECT DATE,confirmed,suspected,cured,dead FROM ncov_2019 WHERE countryCode = 'CN' and  provinceCode = 'nan'")
df2.write.jdbc("jdbc:mysql://121.41.225.123/mydb",'china_total_with_date','append', prop)
