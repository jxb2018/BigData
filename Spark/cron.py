from datetime import datetime
import subprocess
from apscheduler.schedulers.blocking import BlockingScheduler
import requests
import os

def update_data():
    os.system("python3 ./spark_update.py")
	
    sckey = 'SCU102943T928a7573f9b4da0fff7483cbff235de25ef75bf0512c5'
    url = "https://sc.ftqq.com/%s.send?text=来自云服务器ECS tencent_ubuntu: spark运行正常&desp={now},疫情数据已自动更新"%sckey
    url = url.format(now=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    requests.get(url)

scheduler = BlockingScheduler(timezone="Asia/Shanghai")
scheduler.add_job(update_data, 'cron', minute="20")
scheduler.start()
