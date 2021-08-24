class Player {
  constructor(sign) {
    this._sign = sign;
  }

  get getSign() {
    return this._sign;
  }

  set setSign(sign) {
    this._sign = sign;
  }
}

export default Player;
