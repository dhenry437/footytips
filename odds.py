import requests
import json
import yaml
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with open("config.yml", "r") as ymlfile:
    cfg = yaml.safe_load(ymlfile)


class OddsAPI:
    odds_api_key = cfg['oddsapi']['key']

    def convert_team_name(self, str):
        dict = {
            "Essendon Bombers": "Essendon",
            "Western Bulldogs": "Western Bulldogs",
            "Brisbane Lions": "Brisbane Lions",
            "Greater Western Sydney Giants": "GWS",
            "Gold Coast Suns": "Gold Coast",
            "Sydney Swans": "Sydney",
            "North Melbourne Kangaroos": "North Melbourne",
            "Richmond Tigers": "Richmond",
            "Carlton Blues": "Carlton",
            "Port Adelaide Power": "Port Adelaide",
            "Hawthorn Hawks": "Hawthorn",
            "Melbourne Demons": "Melbourne",
            "Fremantle Dockers": "Fremantle",
            "West Coast Eagles": "West Coast",
            "Adelaide Crows": "Adelaide",
            "St Kilda Saints": "St Kilda",
            "Collingwood Magpies": "Collingwood",
            "Geelong Cats": "Geelong"
        }

        return dict[str]

    def get_odds(self, oddsType):
        matches = []
        url = 'https://api.the-odds-api.com/v3/odds?sport=aussierules_afl&region=au&apiKey=' + self.odds_api_key
        r = requests.get(url)

        data = json.loads(r.text)

        for m in data['data']:
            for site in m['sites']:
                if site['site_key'] == oddsType:
                    hOdds = site['odds']['h2h'][0]
                    aOdds = site['odds']['h2h'][1]

            match = [{'team': self.convert_team_name(m['teams'][0]), 'odds': hOdds}, {
                'team': self.convert_team_name(m['teams'][1]), 'odds': aOdds}]
            matches.append(match)

        dump = json.dumps(matches)

        return dump
