const {Fighter, battle} = require('../src/scope-and-context');
const sinon = require('mocha-sinon');

describe('Fighter', function() {
  beforeEach(function() {
    this.sinon.stub(console, 'log');
  });

  const fighter1=new Fighter({name: 'Maximus', damage: 25, hp: 105, strength: 30, agility: 40});
  const fighter2 = new Fighter({name: 'Max', damage: 25, hp: 100, strength: 30, agility: 25});
  const fighter3 = new Fighter({name: 'Maxim', damage: 25, hp: 100, strength: 30, agility: 25});


  it('should create a fighter object', function() {
    expect(fighter1.getName()).to.equal('Maximus');
    expect(fighter1.getDamage()).to.equal(25);
    expect(fighter1.getStrength()).to.equal(30);
    expect(fighter1.getAgility()).to.equal(40);
    expect(fighter1.getHealth()).to.equal(105);
  });

  it('Every property should be private', function() {
    Object.keys(fighter1).forEach((key)=>{
      expect(fighter1[key]).to.equal(undefined);
    });
  });

  it('should log fighter\'s wins and losses to the console', function() {
    fighter1.addWin();
    fighter1.logCombatHistory();
    expect( console.log.calledOnce ).to.be.true;
    expect( console.log.calledWith(`Name:Maximus,Wins:1,Losses:0`)).to.be.true;
  });

  it('should log to the console', function() {
    fighter2.addLoss();
    fighter2.logCombatHistory();
    expect( console.log.calledOnce ).to.be.true;
    expect( console.log.calledWith(`Name:Max,Wins:0,Losses:1`)).to.be.true;
  });


  it('should add health points', ()=>{
    const startHealth=fighter1.getHealth();
    fighter1.heal(10);
    expect(fighter1.getHealth()).to.equal(startHealth+10);
  });

  it('should decrease health points by 100', function() {
    const startHealth=fighter1.getHealth();
    fighter1.dealDamage(100);
    expect(fighter1.getHealth()).to.equal(startHealth-100);
  });


  it('health points should equal 0', function() {
    fighter1.dealDamage(200);
    expect(fighter1.getHealth()).to.equal(0);
  });

  it('should log a message', ()=>{
    const startHealth= fighter2.getHealth();
    fighter1.attack(fighter2);
    if (startHealth===fighter2.getHealth()) {
      expect( console.log.calledOnce ).to.be.true;
      expect( console.log.calledWith(`Max attack missed`)).to.be.true;
    } else {
      expect( console.log.calledOnce ).to.be.true;
      expect( console.log.calledWith(`Maximus makes 25 damage to Max`)).to.be.true;
    }
  });

  it('there should be a loser', ()=>{
    const loser=battle(fighter2, fighter3);
    expect(loser).to.equal((winnerExists(fighter2, fighter3)?isLoser(fighter2, fighter3):0));
  });
});

const winnerExists=(fighter1, fighter2)=>{
  return (isDead(fighter1) && isDead(fighter2))?0:1;
};

const isLoser=(fighter1, fighter2)=>{
  return (isDead(fighter1)?fighter1.getName():fighter2.getName());
};

const isDead = (fighter) => {
  return fighter.getHealth() === 0;
};
