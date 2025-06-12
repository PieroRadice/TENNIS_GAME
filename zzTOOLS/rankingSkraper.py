import csv
from bs4 import BeautifulSoup

def parse_atp_html(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        soup = BeautifulSoup(file, "html.parser")
    
    players = []
    table = soup.find("table", class_="mega-table")  # Trova la tabella delle classifiche
    if table:
        rows = table.find("tbody").find_all("tr", class_=lambda x: x and "lower-row" in x)

        for row in rows:
            # Extract rank
            rank_cell = row.find("td", class_="rank bold heavy tiny-cell")
            rank = rank_cell.get_text(strip=True) if rank_cell else "Not Available"
            
            # Extract player name from the <span> inside <a>
            name_cell = row.find("li", class_="name center")
            name = name_cell.find("a").find("span").get_text(strip=True) if name_cell and name_cell.find("a") and name_cell.find("span") else "Not Available"
            
            # Extract points
            points_cell = row.find("td", class_="points center bold extrabold small-cell")
            points = points_cell.get_text(strip=True) if points_cell else "Not Available"
            
            # Extract country from the SVG flag
            country_cell = row.find("li", class_="avatar")
            country = country_cell.find("use")["href"].split("#flag-")[1] if country_cell and country_cell.find("use") else "Not Available"
            
            players.append([rank, name, points, country])
    
    return players

def save_to_csv(players, filename="atp_rankings.csv"):
    with open(filename, "w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["Rank", "Name", "Points", "Country"])
        writer.writerows(players)
    print(f"File CSV salvato: {filename}")

# Esecuzione
data_file = r"C:\Users\radic\Documents\ProgettiNode\TENNIS_GAME\zzTOOLS\rank.htm"
players = parse_atp_html(data_file)
save_to_csv(players)
