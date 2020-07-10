import requests
import json
import csv
import datetime

class MatchData():
    df = 'matchdata.csv'

    def fetch_data(self):
        csvHeader = "FanFooty draw ID,year,competition,round,gametime (AET),day,home team,away team,ground,timeslot,TV coverage,home supergoals,home goals,home behinds,home points,away supergoals,away goals,away behinds,away points,match status"
        
        # Get data from URL
        url = 'http://www.fanfooty.com.au/resource/draw.php'
        r = requests.get(url)

        # Write to file
        f = open(self.df, 'w', newline='')
        f.write(csvHeader)
        f.write(r.text.strip())
        f.close()

        return

        currentDate = datetime.datetime.now()
    def get_rounds(self, year):

        ha = []
        preliminary = []
        finals = []

        currentRound = 0
        currentComp = None
        cRound = -1

        with open(self.df) as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['year'] == year:
                    if row['competition'][0] == "P" and int(row['round']) == 0 and currentComp != row['competition']:
                        currentComp = row['competition']
                        preliminary.append(row['competition'])

                    if row['competition'] == "HA" and int(row['round']) != currentRound:
                        currentRound = int(row['round'])
                        ha.append(row['round'])
                        # print(row)

                    if row['competition'][-1] == "F":
                        final = ""

                        if currentComp != row['competition'] and currentRound != int(row['round']):
                            final = row['competition']

                        if currentComp != row['competition'] and currentRound == int(row['round']):
                            if finals[-1].find(row['competition']) == -1:
                                finals[-1] += " and " + row['competition']

                        if final != "":
                            finals.append(final)

                        currentRound = int(row['round'])
                        currentComp = row['competition']

                # print("DEBUG: row['game time'] read as " + datetime.datetime.strptime(row['gametime'],"%Y-%m-%d %H:%M:%S").strftime("%Y-%m-%d %H:%M:%S"))
                if datetime.datetime.strptime(row['gametime'],"%Y-%m-%d %H:%M:%S") < currentDate:
                    cRound = str(currentRound)

            dump = json.dumps({"preliminary": preliminary, "HA": ha, "finals": finals, "currentRound": cRound})

        return dump
