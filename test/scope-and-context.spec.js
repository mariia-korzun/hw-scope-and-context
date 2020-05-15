const {Fighter, battle, isDead} = require('../src/scope-and-context');

describe('Fighter', function() {
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

  it('property should be private', function() {
    Object.keys(fighter1).forEach((key)=>{
      expect(fighter1[key]).to.equal(undefined);
    });
  });
  it('should add 1', function() {
    fighter1.heal(10);
    expect(fighter1.addWin()).to.equal(1);
    expect(fighter1.addLoss()).to.equal(1);
    expect(fighter1.getHealth()).to.equal(115);
    expect(fighter1.dealDamage(100)).to.equal(15);
    expect(fighter1.dealDamage(200)).to.equal(0);
  });

  it('should equal 0', ()=>{
    const loser=battle(fighter2, fighter3);
    expect(loser).to.equal((winnerExists(fighter2, fighter3)?isLoser(fighter2, fighter3):0));
    expect(fighter2.logCombatHistory()).to.equal(undefined)
  });
});

const winnerExists=(fighter1, fighter2)=>{
  return (isDead(fighter1) && isDead(fighter2))?0:1;
};

const isLoser=(fighter1, fighter2)=>{
  return (isDead(fighter1)?fighter1.getName():fighter2.getName());
};
