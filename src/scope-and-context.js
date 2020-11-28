class Fighter {
  #fighterName
  #fighterDamage
  #fighterHealth
  #fighterStrength
  #fighterAgility
  #fighterWin
  #fighterLoss
  constructor(object) {
    this.#fighterName = object.name
    this.#fighterDamage = object.damage
    this.#fighterHealth = object.hp
    this.#fighterStrength = object.strength
    this.#fighterAgility = object.agility
    this.#fighterWin = 0
    this.#fighterLoss = 0
  }
  getName() {
    return this.#fighterName
  }

  getDamage() {
    return this.#fighterDamage
  }

  getStrength() {
    return this.#fighterStrength
  }

  getAgility() {
    return this.#fighterAgility
  }

  getHealth() {
    return this.#fighterHealth
  }

  getWin() {
    return this.#fighterWin
  }

  addWin() {
    this.#fighterWin++
  }

  getLoss() {
   return this.#fighterLoss
  }

  addLoss() {
    this.#fighterLoss++
  }

  heal(health) {
    this.#fighterHealth += health
  }

  dealDamage(health) {
    this.#fighterHealth - health < 0 ? this.#fighterHealth = 0 : this.heal(-health)
  }

  logCombatHistory() {
    console.log(`Name:${this.getName()},Wins:${this.getWin()},Losses:${this.getLoss()}`)
  }

  attack(defender) {
    let isSuccessful = random()
    if ((defender.getAgility() + defender.getStrength()) > isSuccessful) {
      console.log(`${this.getName()} attack missed`)
    } else {
      defender.dealDamage(this.getDamage())
      console.log(`${this.getName()} makes ${this.getDamage()} damage to ${defender.getName()}`)
    }
  }
}

function random() {
  return Math.ceil(Math.random() * 100)
}

const battle = function (...args) {
  let [fighter1, fighter2] = args
  for (let i = args.length - 1; i >= 0 ; i--) {
    if (args[i].getHealth() === 0) {
      console.log(`${args[i].getName()} is dead`)
      return 0
    }
  }
  do {
    fighter1.attack(fighter2)
    fighter2.attack(fighter1)
  } while (fighter1.getHealth() > 0 && fighter2.getHealth() > 0);
  if (fighter1.getHealth() === 0 && fighter2.getHealth() === 0) {
    return 0
  }
  if (fighter1.getHealth() === 0) {
    console.log(`${fighter2.getName()} has won!`)
    fighter2.addWin()
    fighter1.addLoss()
    return fighter1
  } else {
    console.log(`${fighter1.getName()} has won!`)
    fighter1.addWin()
    fighter2.addLoss()
    return fighter2
  }
};

module.exports = { Fighter, battle };
