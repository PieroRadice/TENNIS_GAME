import csv
from bs4 import BeautifulSoup

def parse_html_to_csv(input_file, output_file):
    # Leggi il file HTML
    with open(input_file, 'r', encoding='utf-8') as file:
        html_content = file.read()

    # Parsing con BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Trova tutte le righe della tabella (tr)
    rows = soup.find_all('tr')

    # Lista per i dati estratti
    extracted_data = []

    # Estrai dati da ogni riga
    for row in rows:
        cells = row.find_all('td')
        if cells:  # Ignora le righe senza celle (come le intestazioni th)
            # Estrai il testo da ogni cella e puliscilo
            row_data = [cell.get_text(strip=True) for cell in cells]
            extracted_data.append(row_data)

    # Scrivi i dati in un file CSV
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        # Scrivi l'intestazione (modifica secondo le tue esigenze)
        writer.writerow(['Nome', 'Dato1', 'Dato2', 'Dato3', '...'])  # Sostituisci con le tue colonne
        writer.writerows(extracted_data)

    print(f"Dati estratti con successo e salvati in {output_file}")

# Esempio di utilizzo
input_html = r'C:\Users\radic\Documents\ProgettiNode\TENNIS_GAME\zzTOOLS\rank.htm'  # Sostituisci con il tuo file di input
output_csv = 'output.csv'  # Nome del file CSV di output

parse_html_to_csv(input_html, output_csv)