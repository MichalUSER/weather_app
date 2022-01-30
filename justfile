ip := "192.168.0.100"

rasp:
	scp -rp dist/* pi@{{ip}}:~/weather-forecast/web
