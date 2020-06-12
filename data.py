import requests
import json
import csv

class MatchData():
    def fetch_data(self):
        csvHeader = "FanFooty draw ID, year, competition, round, gametime (AET), day, home team, away team, ground, timeslot, TV coverage, home supergoals, home goals, home behinds, home points, away supergoals, away goals, away behinds, away points, match status"
        
        # Get data from URL
        url = 'http://www.fanfooty.com.au/resource/draw.php'
        r = requests.get(url)

        # Write to file
        f = open("matchdata.csv", 'w', newline='')
        f.write(csvHeader)
        f.write(r.text.strip())
        f.close()

        return
