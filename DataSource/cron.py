from datetime import datetime
import subprocess
from apscheduler.schedulers.blocking import BlockingScheduler
import requests
import os

def update_data():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    update = '/usr/local/hadoop/bin/hdfs dfs -put -f /usr/local/DataSource/Data/{file}.csv /Data'
    update2 = '/usr/local/hadoop/bin/hdfs dfs -put -f /usr/local/DataSource/Wuhan-2019-nCoV.csv /Data'
    update = update.format(file = datetime.now().strftime("%Y-%m-%d"))
    cmds = [
        ["pipenv", "run", "python", "dataset.py"],
        ["pipenv", "run", "python", "data-join.py"],
        ["pipenv", "run", "python", "data-to-json.py"],
    ]
    for cmd in cmds:
        print(" ".join(cmd))
        print(subprocess.check_output(cmd).decode())
    os.system(update)
    os.system(update2)
	
    sckey = 'SCU102943T928a7573f9b4da0fff7483cbff235de25ef75bf0512c5'
    url = "https://sc.ftqq.com/%s.send?text=来自云服务器ECS ali_ubuntu&desp={now},疫情数据已自动更新"%sckey
    url = url.format(now=datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    requests.get(url)

scheduler = BlockingScheduler(timezone="Asia/Shanghai")
scheduler.add_job(update_data, 'cron', minute="9")
scheduler.start()
