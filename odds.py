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

        return team

    def get_odds(self, oddsType):
        matches = []
        print("DEBUG: oddsType = " + oddsType)
        url = 'https://api.the-odds-api.com/v3/odds?sport=aussierules_afl&region=au&apiKey=8de26a7e3d35c9e6391b762f0e37dd8f'
        r = requests.get(url)

        data = json.loads(r.text)
        # data = {'success': True, 'data': [{'sport_key': 'aussierules_afl', 'sport_nice': 'AFL', 'teams': ['Essendon Bombers', 'Western Bulldogs'], 'commence_time': 1594979400, 'home_team': 'Essendon Bombers', 'sites': [{'site_key': 'sportsbet', 'site_nice': 'SportsBet', 'last_update': 1594959004, 'odds': {'h2h': [2.15, 1.71]}}, {'site_key': 'beteasy', 'site_nice': 'Bet Easy', 'last_update': 1594958899, 'odds': {'h2h': [2.1, 1.77]}}, {'site_key': 'tab', 'site_nice': 'TAB', 'last_update': 1594959026, 'odds': {'h2h': [2.15, 1.72]}}, {'site_key': 'betfair', 'site_nice': 'Betfair', 'last_update': 1594958967, 'odds': {'h2h': [2.22, 1.8], 'h2h_lay': [2.26, 1.81]}}, {'site_key': 'ladbrokes', 'site_nice': 'Ladbrokes', 'last_update': 1594959006, 'odds': {'h2h': [2.1, 1.8]}}, {'site_key': 'pointsbetau', 'site_nice': 'PointsBet (AU)', 'last_update': 1594959120, 'odds': {'h2h': [2.15, 1.72]}}, {'site_key': 'neds', 'site_nice': 'Neds', 'last_update': 1594958913, 'odds': {'h2h': [2.1, 1.8]}}, {'site_key': 'unibet', 'site_nice': 'Unibet', 'last_update': 1594958949, 'odds': {'h2h': [2.1, 1.75]}}], 'sites_count': 8}, {'sport_key': 'aussierules_afl', 'sport_nice': 'AFL', 'teams': ['Brisbane Lions', 'Greater Western Sydney Giants'], 'commence_time': 1595043900, 'home_team': 'Greater Western Sydney Giants', 'sites': [{'site_key': 'sportsbet', 'site_nice': 'SportsBet', 'last_update': 1594959004, 'odds': {'h2h': [1.95, 1.9]}}, {'site_key': 'beteasy', 'site_nice': 'Bet Easy', 'last_update': 1594958899, 'odds': {'h2h': [1.96, 1.85]}}, {'site_key': 'tab', 'site_nice': 'TAB', 'last_update': 1594959026, 'odds': {'h2h': [1.94, 1.9]}}, {'site_key': 'betfair', 'site_nice': 'Betfair', 'last_update': 1594958967, 'odds': {'h2h': [2.02, 1.96], 'h2h_lay': [2.04, 1.98]}}, {'site_key': 'neds', 'site_nice': 'Neds', 'last_update': 1594958913, 'odds': {'h2h': [1.95, 1.88]}}, {'site_key': 'ladbrokes', 'site_nice': 'Ladbrokes', 'last_update': 1594959006, 'odds': {'h2h': [1.95, 1.88]}}, {'site_key': 'pointsbetau', 'site_nice': 'PointsBet (AU)', 'last_update': 1594959120, 'odds': {'h2h': [1.9, 1.9]}}, {'site_key': 'unibet', 'site_nice': 'Unibet', 'last_update': 1594958949, 'odds': {'h2h': [1.96, 1.87]}}], 'sites_count': 8}, {'sport_key': 'aussierules_afl', 'sport_nice': 'AFL', 'teams': ['Gold Coast Suns', 'Sydney Swans'], 'commence_time': 1595054100, 'home_team': 'Sydney Swans', 'sites': [{'site_key': 'sportsbet', 'site_nice': 'SportsBet', 'last_update': 1594959004, 'odds': {'h2h': [1.8, 2.0]}}, {'site_key': 'beteasy', 'site_nice': 'Bet Easy', 'last_update': 1594958899, 'odds': {'h2h': [1.71, 2.15]}}, {'site_key': 'tab', 'site_nice': 'TAB', 'last_update': 1594959026, 'odds': {'h2h': [1.8, 2.05]}}, {'site_key': 'betfair', 'site_nice': 'Betfair', 'last_update': 1594958967, 'odds': {'h2h': [1.84, 2.16], 'h2h_lay': [1.85, 2.2]}}, {'site_key': 'neds', 'site_nice': 'Neds', 'last_update': 1594958913, 'odds': {'h2h': [1.73, 2.2]}}, {'site_key': 'ladbrokes', 'site_nice': 'Ladbrokes', 'last_update': 1594959006, 'odds': {'h2h': [1.73, 2.2]}}, {'site_key': 'pointsbetau', 'site_nice': 'PointsBet (AU)', 'last_update': 1594959120, 'odds': {'h2h': [1.7, 2.15]}}, {'site_key': 'unibet', 'site_nice': 'Unibet', 'last_update': 1594958949, 'odds': {'h2h': [1.72, 2.15]}}], 'sites_count': 8}, {'sport_key': 'aussierules_afl', 'sport_nice': 'AFL', 'teams': ['North Melbourne Kangaroos', 'Richmond Tigers'], 'commence_time': 1595065200, 'home_team': 'Richmond Tigers', 'sites': [{'site_key': 'sportsbet', 'site_nice': 'SportsBet', 'last_update': 1594959004, 'odds': {'h2h': [2.37, 1.57]}}, {'site_key': 'beteasy', 'site_nice': 'Bet Easy', 'last_update': 1594958899, 'odds': {'h2h': [2.45, 1.56]}}, {'site_key': 'tab', 'site_nice': 'TAB', 'last_update': 1594959026, 'odds': {'h2h': [2.45, 1.57]}}, {'site_key': 'betfair', 'site_nice': 'Betfair', 'last_update': 1594958967, 'odds': {'h2h': [2.52, 1.63], 'h2h_lay': [2.58, 1.66]}}, {'site_key': 'neds', 'site_nice': 'Neds', 'last_update': 1594958913, 'odds': {'h2h': [2.45, 1.6]}}, {'site_key': 'ladbrokes', 'site_nice': 'Ladbrokes', 'last_update': 1594959006, 'odds': {'h2h': [2.45, 1.6]}}, {'site_key': 'pointsbetau', 'site_nice': 'PointsBet (AU)', 'last_update': 1594959120, 'odds': {'h2h': [2.4, 1.58]}}, {'site_key': 'unibet', 'site_nice': 'Unibet', 'last_update': 1594958949, 'odds': {'h2h': [2.45, 1.57]}}], 'sites_count': 8}, {'sport_key': 'aussierules_afl', 'sport_nice': 'AFL', 'teams': ['Carlton Blues', 'Port Adelaide Power'], 'commence_time': 1595127900, 'home_team': 'Carlton Blues', 'sites': [{'site_key': 'sportsbet', 'site_nice': 'SportsBet', 'last_update': 1594959004, 'odds': {'h2h': [2.76, 1.43]}}, {'site_key': 'beteasy', 'site_nice': 'Bet Easy', 'last_update': 1594958899, 'odds': {'h2h': [2.9, 1.42]}}, {'site_key': 'tab', 'site_nice': 'TAB', 'last_update': 1594959026, 'odds': {'h2h': [2.9, 1.42]}}, {'site_key': 'betfair', 'site_nice': 'Betfair', 'last_update': 1594958967, 'odds': {'h2h': [2.96, 1.5], 'h2h_lay': [3.0, 1.51]}}, {'site_key': 'pointsbetau', 'site_nice': 'PointsBet (AU)', 'last_update': 1594959120, 'odds': {'h2h': [2.85, 1.42]}}, {'site_key': 'neds', 'site_nice': 'Neds', 'last_update': 1594958913, 'odds': {'h2h': [2.9, 1.46]}}, {'site_key': 'ladbrokes', 'site_nice': 'Ladbrokes', 'last_update': 1594959006, 'odds': {'h2h': [2.9, 1.46]}}, {'site_key': 'unibet', 'site_nice': 'Unibet', 'last_update': 1594958949, 'odds': {'h2h': [2.9, 1.42]}}], 'sites_count': 8}, {'sport_key': 'aussierules_afl', 'sport_nice': 'AFL', 'teams': ['Hawthorn Hawks', 'Melbourne Demons'], 'commence_time': 1595136900, 'home_team': 'Hawthorn Hawks', 'sites': [{'site_key': 'unibet', 'site_nice': 'Unibet', 'last_update': 1594958949, 'odds': {'h2h': [1.75, 2.1]}}, {'site_key': 'beteasy', 'site_nice': 'Bet Easy', 'last_update': 1594958899, 'odds': {'h2h': [1.74, 2.1]}}, {'site_key': 'tab', 'site_nice': 'TAB', 'last_update': 1594959026, 'odds': {'h2h': [1.75, 2.1]}}, {'site_key': 'ladbrokes', 'site_nice': 'Ladbrokes', 'last_update': 1594959006, 'odds': {'h2h': [1.8, 2.1]}}, {'site_key': 'neds', 'site_nice': 'Neds', 'last_update': 1594958913, 'odds': {'h2h': [1.8, 2.1]}}, {'site_key': 'sportsbet', 'site_nice': 'SportsBet', 'last_update': 1594959004, 'odds': {'h2h': [1.77, 2.05]}}, {'site_key': 'betfair', 'site_nice': 'Betfair', 'last_update': 1594958967, 'odds': {'h2h': [1.84, 2.14], 'h2h_lay': [1.87, 2.18]}}, {'site_key': 'pointsbetau', 'site_nice': 'PointsBet (AU)', 'last_update': 1594959120, 'odds': {'h2h': [1.7, 2.15]}}], 'sites_count': 8}, {'sport_key': 'aussierules_afl', 'sport_nice': 'AFL', 'teams': ['Fremantle Dockers', 'West Coast Eagles'], 'commence_time': 1595147700, 'home_team': 'Fremantle Dockers', 'sites': [{'site_key': 'unibet', 'site_nice': 'Unibet', 'last_update': 1594958949, 'odds': {'h2h': [3.3, 1.33]}}, {'site_key': 'beteasy', 'site_nice': 'Bet Easy', 'last_update': 1594958899, 'odds': {'h2h': [3.35, 1.33]}}, {'site_key': 'tab', 'site_nice': 'TAB', 'last_update': 1594959026, 'odds': {'h2h': [3.3, 1.33]}}, {'site_key': 'neds', 'site_nice': 'Neds', 'last_update': 1594958913, 'odds': {'h2h': [3.4, 1.36]}}, {'site_key': 'ladbrokes', 'site_nice': 'Ladbrokes', 'last_update': 1594959006, 'odds': {'h2h': [3.4, 1.36]}}, {'site_key': 'sportsbet', 'site_nice': 'SportsBet', 'last_update': 1594959004, 'odds': {'h2h': [3.4, 1.3]}}, {'site_key': 'betfair', 'site_nice': 'Betfair', 'last_update': 1594958967, 'odds': {'h2h': [3.4, 1.4], 'h2h_lay': [3.45, 1.41]}}, {'site_key': 'pointsbetau', 'site_nice': 'PointsBet (AU)', 'last_update': 1594959120, 'odds': {'h2h': [3.6, 1.3]}}], 'sites_count': 8}, {'sport_key': 'aussierules_afl', 'sport_nice': 'AFL', 'teams': ['Adelaide Crows', 'St Kilda Saints'], 'commence_time': 1595238000, 'home_team': 'Adelaide Crows', 'sites': [{'site_key': 'unibet', 'site_nice': 'Unibet', 'last_update': 1594958949, 'odds': {'h2h': [3.1, 1.38]}}, {'site_key': 'beteasy', 'site_nice': 'Bet Easy', 'last_update': 1594958899, 'odds': {'h2h': [3.1, 1.37]}}, {'site_key': 'tab', 'site_nice': 'TAB', 'last_update': 1594959026, 'odds': {'h2h': [3.1, 1.37]}}, {'site_key': 'neds', 'site_nice': 'Neds', 'last_update': 1594958913, 'odds': {'h2h': [3.25, 1.38]}}, {'site_key': 'ladbrokes', 'site_nice': 'Ladbrokes', 'last_update': 1594959006, 'odds': {'h2h': [3.25, 1.38]}}, {'site_key': 'betfair', 'site_nice': 'Betfair', 'last_update': 1594958967, 'odds': {'h2h': [3.35, 1.38], 'h2h_lay': [3.65, 1.42]}}, {'site_key': 'pointsbetau', 'site_nice': 'PointsBet (AU)', 'last_update': 1594959120, 'odds': {'h2h': [3.15, 1.35]}}, {'site_key': 'sportsbet', 'site_nice': 'SportsBet', 'last_update': 1594959004, 'odds': {'h2h': [3.08, 1.36]}}], 'sites_count': 8}]}
        # print(data)

        for m in data['data']:
            for site in m['sites']:
                if site['site_key'] == oddsType:
                    hOdds = site['odds']['h2h'][0]
                    aOdds = site['odds']['h2h'][1]

            match = [{'team': self.convert_team_name(m['teams'][0]), 'odds': hOdds}, {'team': self.convert_team_name(m['teams'][1]), 'odds': aOdds}]
            matches.append(match)

        dump = json.dumps(matches)

        return dump
