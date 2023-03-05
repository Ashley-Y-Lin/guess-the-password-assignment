$(document).ready(function(){
    var wordCount = 10;
    var guessCount = 4;
    var password = '';

    var $start = $("#start");
    $start.on('click', function(){
        $("#start-screen").toggleClass("show hide");
        $("#game-screen").toggleClass("show hide");
        startGame();
    })

    function startGame(){
        var $wordList = $("#word-list")
        var randomWords = getRandomValues(words, wordCount)
        randomWords.forEach(function(word){
            var $li = $('<li>', {text: word});
            $wordList.append($li)
        })

        password = getRandomValues(randomWords, 1)[0]
        setGuessCount(guessCount)

        $wordList.on('click', 'li', updateGame)
    }

    function getRandomValues(array, numberOfVals) {
        return shuffle(array).slice(0, numberOfVals);
    }

    function shuffle(array) {
        var arrayCopy = array.slice();
        for (var idx1 = arrayCopy.length - 1; idx1 > 0; idx1--) {
          // generate a random index between 0 and idx1 (inclusive)
          var idx2 = Math.floor(Math.random() * (idx1 + 1));
    
          // swap elements at idx1 and idx2
          var temp = arrayCopy[idx1];
          arrayCopy[idx1] = arrayCopy[idx2];
          arrayCopy[idx2] = temp;
        }
        return arrayCopy;
    }

    function setGuessCount(newCount){
        guessCount = newCount
        $("#guesses-remaining").text = ('Guesses remaining: ' + guessCount + '.')
    }

    function updateGame(e){
        var $target = $(e.target)
        var $wordList = $("#word-list")
        if (!$target.hasClass('disabled')){
            var guess = $target.text()
            var similarityScore = compareWords(guess, password)
            $target.addClass('disabled')
            $target.text(function(i, oldText){
                return oldText + ' --> Matching Letters: ' + similarityScore
            })
            setGuessCount(guessCount - 1)
        }
        if (similarityScore === password.length){
            $("#winner").toggleClass("hide show")
            $wordList.off()
        } else if (guessCount === 0){
            $("#loser").toggleClass("hide show")
            $wordList.off()
        }
    }

    function compareWords(word1, word2) {
        if (word1.length !== word2.length) {
          throw 'Words must have the same length';
        }
        var count = 0;
        for (var i = 0; i < word1.length; i++) {
          if (word1[i] === word2[i]) count++;
        }
        return count;
    }
})