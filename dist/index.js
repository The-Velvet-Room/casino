var horizon = Horizon();
horizon.onReady(function() {
    document.querySelector('h1').innerHTML = 'Bets go here fam! Rethink connection established!';
});

horizon.connect();

var Wager = React.createClass({
    displayName: 'Wager',
    render: function() {
        var icon = React.createElement('img', {className: 'wager-icon', src: this.props.icon});
        var amount = React.createElement('div', {className: 'wager-amount'}, this.props.amount);
        var name = React.createElement('div', {className: 'wager-name'}, this.props.name);
        
        return React.createElement('div', {className: 'wager-row'}, icon, amount, name);
    }
});

var WagerList = React.createClass({
   displayName: 'WagerList',
   render: function() {
       var list = this.props.wagers.map(function(wager) {
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
    amount: 100,
    name: 'bruh'
}];

window.onload = function () {
    ReactDOM.render(
        React.createElement(WagerList, {wagers: defaultWagerList}),
        document.getElementById('bet-list-left')
    );
}