# mastermindChallenge

## Hello Challenger
Welcome to Mastermind Challenge! 
I hope you enjoy playing this quick logic game during your down time. 

Good Luck!

## To Start
first time users:
```npm install```

start the game:
```npm start```

## Clarifications
If your guess takes the form
``` 1111 ```
and you get the clues
``` RED BLUE WHITE BLUE ```

That means: 
- your first number guess was correct
- your second number guess was completely wrong
- your third number guess was the correct number, but in the wrong index
    - This means, your number guess could be the second or fourth index.
- your fourth number guess was completely wrong

So possible solutions could be:

- 1123
- 1231
- 1143
- 1154
- etc. 