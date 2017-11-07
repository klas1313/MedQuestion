export interface RandomSeedInterface{
  _seed:number;

  random(seed:number);
  next();
  nextFloat(opt_minOrMax:number, opt_max:number);


}
