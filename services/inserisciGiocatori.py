import json
import psycopg2

# Configurazione della connessione al database
DB_PARAMS = {
    "dbname": "utenticoi_1",
    "user": "postgres",
    
    "host": "localhost",
    "port": "5432"
}

# Percorso del file JSON
FILE_PATH = "C:/Users/radic/Documents/ProgettiNode/PPTP_TENNIS_V2/public/json/DOHA_1-100_atp_players.json"

# Connessione al database
conn = psycopg2.connect(**DB_PARAMS)
cursor = conn.cursor()

# Lettura dei dati dal file JSON
with open(FILE_PATH, "r", encoding="utf-8") as file:
    players = json.load(file)

# Query di inserimento
insert_query = """
INSERT INTO players (name, country, profile_url, image_src, image_alt)
VALUES (%s, %s, %s, %s, %s)
ON CONFLICT (name) DO NOTHING;
"""

# Inserimento dati
for player in players:
    cursor.execute(insert_query, (player["name"], player["country"], player["profile_url"], player["image_src"], player["image_alt"]))

# Commit e chiusura connessione
conn.commit()
cursor.close()
conn.close()

print("Dati inseriti con successo.")
