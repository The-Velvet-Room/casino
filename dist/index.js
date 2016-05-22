/*Horizon and RethinkDB code */
var horizon = Horizon();
horizon.onReady(function() {
    document.querySelector('h1').innerHTML = 'Bets go here fam! Rethink connection established!';
});

horizon.connect();

// CurrentBet Structure
// startDate (in millis)
// endTime (in millis)
// competitors[] (0=red, 1=blue)
// odds[] (0=red, 1=blue)

const currentBet = horizon('current-bet');
const allWagers = horizon('all-wagers');
const users = horizon('betting-users');

//User Structure
// Username (Twitch)
// Points
// HighestPoints

function placeBet(betIndex, amount, username) {
    let bet = {
        index: betIndex,
        amount: amount,
        username: username
    }
    
    //No bet currently active
    if(!currentBet) {
        return;
    }
    
    //Invalid betIndex
    if(betIndex < 0 || betIndex > 1) {
        return;
    }
    
    //Invalid bet amount
    if(amount <= 0) {
        return;
    }
    
    var now = new Date();  
    //Bets locked
    if(now.getTime() < currentBet.endTime) {
        return;
    }
    
    allWagers.store(bet);
}

//Bet structure
// betIndex (0=red, 1=blue)
// name
// amount

//TODO Use from Twitch
function getProfileIcon(username) {
    return '';
}

/*React and Components */
var WagerInput = React.createClass({
   displayName: 'WagerInput',
   render: function() {
       return React.createElement('input', {
           placeholder: 'Enter your bet',
           max: this.props.maxBet,
           type: 'number'
    })
   }
});

var Wager = React.createClass({
    displayName: 'Wager',
    render: function() {
        var icon = React.createElement('img', {className: 'wager-icon', src: this.props.icon || 'https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_300x300.png'});
        var amount = React.createElement('div', {className: 'wager-amount'}, this.props.amount);
        var name = React.createElement('div', {className: 'wager-name col-md-4'}, this.props.name);
        
        return React.createElement('div', {className: 'wager-row'}, icon, name, amount);
    }
});

var WagerList = React.createClass({
   displayName: 'WagerList',
   render: function() {
       var list = this.props.wagers.map(function(wager) {
           wager.key = wager.name+wager.amount;
           return React.createElement(Wager, wager);
       });  
       return React.createElement('div', null, list);
   }
});

var defaultWagerList = [{
    icon: '',
    amount: 0,
    name: 'Empty'
},{
    icon: 'hue',
    amount: 123456789,
    name: 'bruh'
}];

window.onload = function () {
    //Left Bet Ledger
    ReactDOM.render(
        React.createElement(WagerList, {wagers: defaultWagerList}),
        document.getElementById('bet-list-left')
    );
    
    //Right Bet Ledger
    ReactDOM.render(
        React.createElement(WagerList, {wagers: defaultWagerList}),
        document.getElementById('bet-list-right')
    );
    
    //Bet Box
    ReactDOM.render(
        React.createElement(WagerInput, {maxBet: 50}),
        document.getElementById('bet-input-target')
    )
}