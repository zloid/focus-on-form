# focus-on-form

Jak działa program: 

Jeśli nie było focus'a na jednym z pól, okno modalne zgłosi błąd. 

Po focus'ie (na input czy textarea) będzie ładowany asynchronicznie skrypt przetwarzania e-mail (w -body-).

Następnie, jeśli klikniesz przycisk wysyłania danych, wcześniej pobrany skrypt pocztowy zostanie uruchomiony asynchronicznie, pusty, bez danych, co potwierdzi prawidłowe działanie programu. Jednocześnie uruchomi się spinner, a po zakończeniu przetwarzania skryptu zostanie wyświetlony komunikat do konsoli o prawidłowym wykonaniu skryptu.