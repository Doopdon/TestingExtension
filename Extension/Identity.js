var IdentityTest = function()
{
  console.log("hey");
  alert("hey");
  return "hey";
}

//gets an identity from the page based on an element. may use different methods to get it.
function getIdentityFromElement(element)
{
  return {id:element.id};
}

//returns an element from the page based on the identity.
function getElementFromIdentity(identity)
{
  return document.getElementById(identity.id);
}
