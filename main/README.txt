LUNA RADKA — strona internetowa
================================

Zwykła, statyczna strona (HTML + CSS + JavaScript). Bez bibliotek,
bez kroku budowania. Działa po dwukrotnym kliknięciu pliku, lokalnie
i bez internetu — na komputerze i na telefonie.

Jak uruchomić
-------------
Otwórz plik  index.html  (dwukrotne kliknięcie).

Struktura katalogu
------------------
  index.html        — strona główna: galeria prac + powiększanie obrazów
  o-artystce.html   — o artystce
  kontakt.html      — formularz kontaktowy
  css/
    style.css       — wszystkie style witryny
  js/
    main.js         — interakcje (menu mobilne, lightbox, animacje, formularz)
  art/
    01.jpg … 12.jpg — zdjęcia obrazów
    portret.jpg     — (opcjonalnie) portret na stronie „o artystce"

Jak edytować
------------
• Treść (tytuły, opisy, dane kontaktowe) — bezpośrednio w plikach .html.
• Wygląd (kolory, odstępy, czcionki) — w pliku  css/style.css.
  Kolory motywu są na górze pliku, w sekcji :root.
• Zachowanie (menu, lightbox) — w pliku  js/main.js.

Dodanie / zmiana obrazów
------------------------
• Podmień pliki w katalogu  art/  (zachowaj nazwy 01.jpg … 12.jpg),
  albo dodaj kolejny kafelek w  index.html  (skopiuj blok <figure class="lr-tile">
  i ustaw atrybuty data-… oraz ścieżkę obrazka).
• Portret artystki: wgraj zdjęcie jako  art/portret.jpg  — pojawi się
  automatycznie na stronie „o artystce". Bez tego pliku widać pole zastępcze.

Uwagi
-----
• Wersja mobilna: menu chowa się pod przyciskiem „menu" w prawym górnym
  rogu; układ dopasowuje się do szerokości ekranu.
• Czcionki (Amatic SC, JetBrains Mono) ładowane są z internetu dla
  najlepszego wyglądu; bez sieci strona zadziała z czcionką zastępczą.
• Formularz kontaktowy jest demonstracyjny — po wysłaniu pokazuje
  podziękowanie, ale nie wysyła e-maila. Aby realnie odbierać wiadomości,
  podłącz usługę formularzy (np. Formspree) w pliku kontakt.html.

Publikacja w internecie
-----------------------
Wgraj całą zawartość tego katalogu na dowolny hosting (np. przez FTP).
Plikiem startowym jest index.html.
