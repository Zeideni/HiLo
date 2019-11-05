// ----------------------- Main Jquery selectors
var $input = $('input#username');
var $playButton = $('button#play');
var $section1 = $('section#section1');
var $section2 = $('section#section2');
var $main1 = $('#main1');
var $main2 = $('#main2');
var $header = $('#header');
var $footer = $('#footer');
var $currentCard=$('#currentCard');
var $nextCard=$('#nextCard');
var $h1= $('#welcomeName')
var $start= $('#start')
var windowWidth = window.innerWidth
var midMargin = (windowWidth / 100) * 5;
var cardWidth = (windowWidth / 100) * (120/windowWidth)*100;
var outerMargin = (windowWidth - 2*(midMargin + cardWidth))/2
var $ccimgFront = $('#ccimgFront')
var $ccimgBack = $('#ccimgBack')
var $ncimgFront = $('#ncimgFront')
var $ncimgBack = $('#ncimgBack')

var leftCC = windowWidth/2 - midMargin - 3*cardWidth/2
var leftNC = windowWidth/2 + midMargin - cardWidth/2


$nextCard.css("left", leftNC+"px")
$currentCard.css("left", leftCC+"px")

/*
After calculations, position of next card 732, positon of current card 494, Dx = -238

*/

// $flip = $("#nextCard").toggleClass('flip');
// $(".front").animate({ "left": "-=" + (midMargin*3+cardWidth)  +"px" }, "2000" );

// ----------------------- Global variables and methods to play the game
var startTime;
var numberOfGames;
var scores;


$playButton.on("click", function() {
    var userName = $input.val();
    var start = new Date();
    startTime = start.toLocaleTimeString('fr-FR', { hour: "numeric", minute: "numeric", second: "numeric" })
    numberOfGames = 0;
    scores = [];
    function complete() {
        $section2.fadeIn(1000);
    }
    $section1.fadeOut(1000, "swing", complete);
    $h1.text("Hi " + userName + "!")

})
$start.on('click',function() {
	playGame()
})

// ----------------------- Main classes to be used by the game
var suits = ["spades", "clubs", "heart", "diamonds"];

function Card(number, suit, url) {
    var card = {};
    card.number = number;
    card.suit = suit;
    card.url = url;
    card.display = display;
    return card;
}

var display = function() {
    if (this.number <= 10 && this.number > 1) {
        return this.number + " of " + this.suit;
    } else if (this.number === 1) {
        return "Ace of " + this.suit;
    } else if (this.number === 11) {
        return "Jack of " + this.suit;
    } else if (this.number === 12) {
        return "Queen of " + this.suit;
    } else if (this.number === 13) {
        return "King of " + this.suit;
    } else {
        return "invalid card"
    }
}

function Deck() {
    var deck = {}
    deck.cards = [];
    for (var i = 0; i < suits.length; i++) {
        for (var j = 1; j < 14; j++) {
            var url = "assets/" + j.toString() + suits[i].charAt(0).toUpperCase() + ".png"
            deck.cards.push(Card(j, suits[i], url))
        }
    }
    deck.shuffle = shuffle
    return deck;
}

var shuffle = function() {
    for (var i = 0; i < this.cards.length; i++) {
        var tmp;
        var randIndex = generateRandomIndex(i + 1, this.cards.length - 1)
        tmp = this.cards[randIndex]
        this.cards[randIndex] = this.cards[i];
        this.cards[i] = tmp;
    }
}

function generateRandomIndex(min, max) { // maximum not included
    return Math.floor(Math.random() * (max - min)) + min;
}

function playGame() {
    var deck = Deck();
    console.log(deck)
    numberOfGames++

    deck.shuffle();
    var currentCard = deck.cards[0];
    var nextCard = deck.cards[1];
    var score = 0;

    var count = 0;
    while (score < 52) {
    	//$currentCard.css('background-image',"url(" + currentCard.url+")")
    	$ncimgFront.css('background-image',"url(" + nextCard.url+")")
    	$ccimgFront.css('background-image',"url(" + currentCard.url+")")
    	$flip = $("#nextCard").toggleClass('flip');
		$(".front").animate({ "left": "-=" + (midMargin*3+cardWidth)  +"px" }, "2000" );
        //alert(currentCard.display());
        //var input = window.prompt()
        if (input === "Equal") {
            if (nextCard.number === currentCard.number) {
                count++
                score += 10
                currentCard = deck.cards[count];
                nextCard = deck.cards[count + 1];

            } else {
             	alert("you lost . Your score is " + score)
                scores.push(score)
                break
            }
        } else if (input === "higher") {
            if (nextCard.number >= currentCard.number) {
                count++
                score++
                currentCard = deck.cards[count];
                nextCard = deck.cards[count + 1];

            } else {
                alert("you lost . Your score is " + score)
                scores.push(score)
                break
            }
        } else if (input === "lower") {
            if (nextCard.number <= currentCard.number) {
                score++
                count++
                currentCard = deck.cards[count];
                nextCard = deck.cards[count + 1];

            } else {
                alert("you lost . Your score is " + score)
                scores.push(score)
                break
            }
        } else {
            alert("invalid input")
        }
    }
}

// ----------------------- Statistics Functions

function resetStats() {
    scores = [];
    numberOfGames = 0;
    playTime = 0
}

function convertTime(end, start) {
    var str = "";

    var resSec = Number(end.slice(6)) - Number(start.slice(6));
    var resMin = Number(end.slice(3, 5)) - Number(start.slice(3, 5));
    var resHr = Number(end.slice(0, 2)) - Number(start.slice(0, 2));

    if (resMin < 0) {
        resMin += 60;
        resHr--;
    }

    if (resSec < 0) {
        resSec += 60;
        resMin--;
    }

    if (resHr !== 0) {
        str += resHr + "hr "
    }
    if (resMin !== 0) {
        str += resMin + "min "
    }
    str += resSec + "s."

    return str
}

function generatePlayTime() {
    var end = new Date()
    var endTime = end.toLocaleTimeString('fr-FR', { hour: "numeric", minute: "numeric", second: "numeric" })
    return convertTime(endTime, startTime)
}

function getAvgScore() {
    return scores.reduce(function(a, b) {
        return a + b
    }, 0) / scores.length
}

function getHighScore() {
    return scores.reduce(function(a, b) {
        if (a > b) {
            return a
        }
        return b
    }, )
}