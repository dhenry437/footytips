import requests

class MatchData():
    def fetch_data(self):
        csvHeader = "FanFooty draw ID, year, competition, round, gametime (AET), day, home team, away team, ground, timeslot, TV coverage, home supergoals, home goals, home behinds, home points, away supergoals, away goals, away behinds, away points, match status"
        url = 'http://www.fanfooty.com.au/resource/draw.php'
        r = requests.get(url)

        f = open("matchdata.csv", 'w', newline='')

        f.write(csvHeader)
        f.write(r.text.strip())

        f.close()

        return