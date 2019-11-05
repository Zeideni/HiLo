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
var outerMargin = (windowWidth - 2*(midMargin + cardWidth))/2;
var $ccimgFront = $('#ccimgFront');
var $ncimgFront = $('#ncimgFront');
var $ncimgBack = $('#ncimgBack');
var $higher = $('#higher');
var $lower = $('#lower');
var $equal = $('#equal');
var $bet5 = $('#bet5')
var $bet10 = $('#bet10')
var $bet50 = $('#bet50')
var $bet100 = $('#bet100')
var $betAllIn = $('#betAllIn')
var $balanceN = $('#balanceN');
var $streak = $('#streak')
var $highestStreak = $('#highestStreak')

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


var input ="";

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
    var balance = 1000;
    $balanceN.html('<h3>'+ balance + '</h3>')
    var bet = 0;
    console.log(deck)
    numberOfGames++


    deck.shuffle();
    var currentCard = deck.cards[0];
    var nextCard = deck.cards[1];
    var score = 0;
    var count = 0;

    return guess();

    function guess(){
       // while (balance>0){
        	$ncimgFront.css('background-image',"url(" + currentCard.url+")")
            $flip = $("#nextCard").toggleClass('flip');
        	$(".front").animate({ "left": "-=" + (midMargin*3+cardWidth)  +"px" }, "2000" );
            $(".back").animate({ "left": "-=" + (midMargin*3+cardWidth)  +"px" }, "2000" );

            $bet5.on('click', function() {
                if (balance-bet < 0){
                    alert('You cannot bet more than your balance')
                } else {
                    bet += 5;
                    balance -= 5;
                    $balanceN.html('<h3>'+ balance + '</h3>')
                }
            })

            $bet10.on('click', function() {
                if (balance-bet < 0){
                    alert('You cannot bet more than your balance')
                } else {
                    bet += 10;
                    balance -= 10;
                    $balanceN.html('<h3>'+ balance + '</h3>')
                }
            })

            $bet50.on('click', function() {
                if (balance-bet < 0){
                    alert('You cannot bet more than your balance')
                } else {                
                    bet += 50;
                    balance -= 50;
                    $balanceN.html('<h3>'+ balance + '</h3>')
                }
            })
        	
            $bet100.on('click', function() {
                if (balance-bet < 0){
                    alert('You cannot bet more than your balance')
                } else {                  
                    bet += 100;
                    balance -= 100;
                    $balanceN.html('<h3>'+ balance + '</h3>')
                }
            })

            $betAllIn.on('click', function() {
                bet += balance;
                balance = 0;
                $balanceN.html('<h3>'+ balance + '</h3>')
            })

        	$higher.on('click', function(){
                if (bet === 0) {
                    alert("you need to make an initial bet")
                } else {
                    input="Higher";
                    animate();
                    check();
                }
        	})
        	$lower.on('click', function(){
                if (bet === 0) {
                    alert("you need to make an initial bet")
                } else {
            		input="Lower";
                    animate();
            		check();
                }
        	})
        	$equal.on('click', function(){
                if (bet === 0) {
                    alert("you need to make an initial bet")
                } else {
            		input="Equal";
                    animate();
            		check();
                }
        	})
        	function animate(){
                setTimeout(function(){ 
                    $(".front").show();
                    $(".back").show();
                }, 1000);
                setTimeout(function(){ $ccimgFront.css('background-image',"url(" + currentCard.url+")")}, 1000);
                setTimeout(function(){ $ccimgFront.show()}, 1000);
                setTimeout(function(){ 
                    $(".front").hide();
                    $(".back").hide();
                }, 1000);

                setTimeout(function(){ 
                    $(".front").animate({ "left": "+=" + (midMargin*3+cardWidth)  +"px" }, "2000" );
                    $(".back").animate({ "left": "+=" + (midMargin*3+cardWidth)  +"px" }, "2000" );
                }, 4000);
                setTimeout(function(){ $flip = $("#nextCard").toggleClass('flip');}, 4000);
            }
            function check(){
                if (input === "Equal") {
                    if (nextCard.number === currentCard.number) {
                        alert("You guessed right")
                        score ++;
                        balance += 2*bet;
                        
                    } else {
                        alert("You guessed wrong")
                        scores.push(score);
                        score = 0;;
                    }
                } else if (input === "Higher") {
                    if (nextCard.number >= currentCard.number) {
                        alert("You guessed right")
                        score++;
                        balance += 2*bet;
                        
                    } else {
                        alert("You guessed wrong")
                        scores.push(score);
                        score = 0;
                    }
                } else if (input === "Lower") {
                    if (nextCard.number <= currentCard.number) {
                        alert("You guessed right")
                        score++
                        balance += 2*bet;
                        
                    } else {
                        alert("You guessed wrong")
                        scores.push(score);
                        score = 0; 
                    }
                }
                currentCard = deck.cards[count];
                nextCard = deck.cards[count + 1];
                count++;
                bet =0;
                $balanceN.html('<h3>'+ balance + '</h3>')

                $streak.html("<h3>" + score + "</h3>");
                $highestStreak.html("<h3>" + getHighScore() + "</h3>");
            }
        }
        //alert ("You lost! press Play to play again!"
    //}
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