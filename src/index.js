

console.log('hello yes')

class Friend {
  a = null
  b = null

  constructor(a, b) {
    this.a = a
    this.b = b
  }

  talk() {
    console.log('hi', this.a, this.b)
  }
}

let f = new Friend('a', 'b')
f.talk()
