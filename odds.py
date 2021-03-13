import requests
import json

class OddsAPI:
    def convert_team_name(self, str):
        if str == "Essendon Bombers":
            team = "Essendon"
        elif str == "Western Bulldogs":
            team = "Western Bulldogs"
        elif str == "Brisbane Lions":
            team = "Brisbane Lions"
        elif str == "Greater Western Sydney Giants":
            team = "GWS"
        elif str == "Gold Coast Suns":
            team = "Gold Coast"
        elif str == "Sydney Swans":
            team = "Sydney"
        elif str == "North Melbourne Kangaroos":
            team = "North Melbourne"
        elif str == "Richmond Tigers":
            team = "Richmond"
        elif str == "Carlton Blues":
            team = "Carlton"
        elif str == "Port Adelaide Power":
            team = "Port Adelaide"
        elif str == "Hawthorn Hawks":
            team = "Hawthorn"
        elif str == "Melbourne Demons":
            team = "Melbourne"
        elif str == "Fremantle Dockers":
            team = "Fremantle"
        elif str == "West Coast Eagles":
            team = "West Coast"
        elif str == "Adelaide Crows":
            team = "Adelaide"
        elif str == "St Kilda Saints":
            team = "St Kilda"
        elif str == "Collingwood Magpies":
            team = "Collingwood"
        elif str == "Geelong Cats":
            team = "Geelong"

        return team

    def get_odds(self, oddsType):
        matches = []
        url = 'https://api.the-odds-api.com/v3/odds?sport=aussierules_afl&region=au&apiKey=8de26a7e3d35c9e6391b762f0e37dd8f'
        r = requests.get(url)

        data = json.loads(r.text)

        for m in data['data']:
            for site in m['sites']:
                if site['site_key'] == oddsType:
                    hOdds = site['odds']['h2h'][0]
                    aOdds = site['odds']['h2h'][1]

            match = [{'team': self.convert_team_name(m['teams'][0]), 'odds': hOdds}, {'team': self.convert_team_name(m['teams'][1]), 'odds': aOdds}]
            matches.append(match)

        dump = json.dumps(matches)

        return dump
