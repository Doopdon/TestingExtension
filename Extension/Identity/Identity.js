
//gets an identity from the page based on an element. may use different methods to get it.
function getIdentityFromElement(element)
{
  return {id:element.id};
}

//returns an element from the page based on the identity.
function getElementFromIdentity(identity)
{
	//return $("#"+identity.id);
  return document.getElementById(identity.id);
}

function compareIdentities(id1, id2)
{
	if(id1.id != id2.id)
	{
		return false;
	}
	return true;
}