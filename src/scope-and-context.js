class Fighter {
  // create fighter class/function here
  #name;
  #damage;
  #hp;
  #strength;
  #agility;
  #win;
  #loss;

  constructor({ name, damage, hp, strength, agility }) {
    this.#name = name;
    this.#damage = damage;
    this.#hp = hp;
    this.#strength = strength;
    this.#agility = agility;
    this.#win = 0;
    this.#loss = 0;
  }

  getName() {
    return this.#name;
  }
  getDamage() {
    return this.#damage;
  }
  getStrength() {
    return this.#strength;
  }
  getAgility() {
    return this.#agility;
  }
  getHealth() {
    return this.#hp;
  }
  addWin() {
    return ++this.#win;
  }
  addLoss() {
    return ++this.#loss;
  }
  heal(points) {
    this.#hp += points;
  }
  dealDamage(points) {
    if (this.#hp - points >= 0) {
      this.#hp -= points;
    } else {
      this.#hp = 0;
    }
    return this.#hp;
  }
  attack(defender) {
    const isSuccessful = success(defender);
    let message;
    if (isSuccessful) {
      message = `${this.#name} makes ${this.#damage} damage to ${
        defender.#name
      }`;
      console.log(message);
      defender.dealDamage(this.#damage);
    } else {
      message = `${defender.#name} attack missed `;
      console.log(message);
    }
    return message;
  }
  logCombatHistory() {
    console.log(`Name:${this.#name} ,Wins:${this.#win},Losses:${this.#loss}`);
  }
}

const battle = function (fighter1, fighter2) {
  let message;
  Array.from(arguments).forEach((fighter) => {
    if (isDead(fighter)) {
      message = sayIsDead(fighter);
      console.log(message);
    }
  });

  if (message) {
    return 0;
  } else {
    let winner;
    let loser;

    while (fighter2.getHealth() > 0 && fighter2.getHealth() > 0) {
      fighter1.attack(fighter2);
      fighter2.attack(fighter1);
      console.log(fighter1.getHealth());
      console.log(fighter2.getHealth());
    }

    
    Array.from(arguments).forEach((fighter) => {
      if (!isDead(fighter)) {
        console.log(fighter.getHealth(), fighter.getName());
        winner = fighter;
        winner.addWin()
        console.log(`${winner.getName()} has won!`);
      } else {
        console.log(fighter.getHealth(), fighter.getName());
        
        fighter.addLoss()
        loser = fighter;
      }
    });
    if (fighter2.getHealth() === fighter1.getHealth()) {
        return 0;
      }

    return loser.getName();
  }
};

const success = (fighter) => {
  const maxChance = 100;
  const random = Math.floor(Math.random() * maxChance);
  return fighter.getStrength() + fighter.getAgility() < random;
};
const isDead = (fighter) => {
  return fighter.getHealth() === 0;
};
const sayIsDead = (fighter) => {
  return `${fighter.getName()} is dead`;
};

module.exports = { Fighter, battle, isDead };
