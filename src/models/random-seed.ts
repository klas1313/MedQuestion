import {RandomSeedInterface} from "./interfaces/random-seed-interface";

export class RandomSeed implements RandomSeedInterface{
  _seed:number;
  constructor(seed:number){
    this._seed = seed;
  }
  get seed(){
    return this._seed;
  }
  set seed(seed:number){
    this._seed = seed;
  }

  random(seed:number){
    this._seed = seed % 2147483647;
    if (this._seed <= 0){
      this._seed += 2147483646;
    }
  }
  next(){
    return this._seed = this._seed * 16807 % 2147483647;
  }
  nextFloat(opt_minOrMax:number, opt_max:number){
    return (this.next() - 1) / 2147483646;
  }


}
