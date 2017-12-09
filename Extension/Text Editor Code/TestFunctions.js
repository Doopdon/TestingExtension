//Test functions to be used to test out the language

function standIn()
{
  console.log("Stand In");
}

function paramer(param)
{
  console.log("running function 'paramer', param:",param[0]);
}

function returner()
{
  console.log("running function 'reterner'");
  return "hey";
}

function returnerFalse()
{
  console.log("running function 'returnerFalse'");
  return false;
}

function returnerParam(param)
{
  param = param[0];
  console.log("running function 'returnerParam' param:",param);
  return param+" baby";
}

function returnerParam2(param)
{
  param = param[0];
  console.log("running function 'returnerParam' param:",param);
  return param+" Hey";
}

function multiReturnerParam(params)
{
  console.log("multiReturnerParam:",params);
  return params[0]+params[1];
}

function testA()
{
  console.log("Test function A");
}

function testB()
{
  console.log("Test function B");
}

function testC(param)
{
  console.log("Test function C, param:",param);
}



