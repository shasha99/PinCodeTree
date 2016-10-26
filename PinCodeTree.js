//The cluster object definition which will be leaf nodes of the Pincode Tree.
var Cluster = function(){
	this.data = null;
	this.values = {};
}

//Adds new data into the cluster.
Cluster.prototype.addData = function(data){
	this.values[data.id] = data.info;
}

//Removes data form the cluster.
Cluster.prototype.removeData = function(data){
	delete this.values[data.id];
}

Cluster.prototype.isEmpty = function(){
	var count = 0;
	for(prop in this.values){
		if(this.values.hasOwnProperty(prop)){
			count+=1;
		}
	}
	
	if(count == 0){
		return true;
	}
	return false;
}
//Cluster object definition ends here.


//Definition of each internal node as well as root node in the Pincode Tree.
var Node = function(){
	this.ref = [null,null,null,null,null,null,null,null,null,null];
}
//Definition of Node ends here.


//Implementation of Pincode Tree.
var Tree = function(){
	this.root = null;
}

//Returns number of cluster currently available in the Pincode Tree.
Tree.prototype.numberOfClustersAvailable = function(){
	var getSize = function(root){
		if(root == null)return 0;
		if(root instanceof Cluster)return 1;
		var count = 0;
		for(var i = 0; i < 10; i++){
			if(root.ref[i] != null){
				count += getSize(root.ref[i]);
			}
		}
		return count;
	}
	
	return getSize(this.root);
}

//Returns all clusters data that are currently available in the Pincode Tree as a dictionary with key as pincode number.
Tree.prototype.getAllClustersData = function(){
	var traverse =  function(root, pincode){
		var returnObject = {};
		if(root instanceof Cluster){
			returnObject[pincode]=root;
		}else{
			for(var i = 0; i < 10 ; i++){
				if(root.ref[i] != null){
					var temp = traverse(root.ref[i], pincode+i);
					for(prop in temp){
						if(temp.hasOwnProperty(prop)){
							returnObject[prop] = temp[prop];
						}
					}
				}
			}
		}
		return returnObject;
	}
	
	return traverse(this.root, "");
}

//Returns data against a particular pincode.
Tree.prototype.getPincodeData = function(pincode){
	var getPincodeData = function(root, pincode){
		if(root == null || root instanceof Cluster){
			return root;
		}
		var index = parseInt(pincode[0]);
		return getPincodeData(root.ref[index],pincode.slice(1,pincode.legth));
	}
	
	return getPincodeData(this.root, pincode);
}

//Adds data in the Pincode Tree.
Tree.prototype.addDataIntoCluster = function(pincode, data){
	var addDetails = function(root, pincode, data){
		if(root == null || root == undefined){
			root = new Node();
		}
		var index = parseInt(pincode[0]);
		
		if(pincode.length == 1){
			if(root.ref[index] == null){
				root.ref[index] = new Cluster();
			}
			root.ref[index].addData(data);
			
		}else{
			root.ref[index] = addDetails(root.ref[index],pincode.slice(1,pincode.length),data);
		}
		
		return root;
	}
	
	this.root =  addDetails(this.root, pincode, data);
}

//Remove data from the Pincode Tree.
Tree.prototype.removeDataFromCluster = function(pincode, data){
	var removeDetails = function(root, pincode, data){
		
		if(root == null){
			return null;
		} 
		var index = parseInt(pincode[0]);
		if(pincode.length == 1){
			if(root.ref[index] != null){
				var cluster = root.ref[index];
				cluster.removeData(data);
				if(cluster.isEmpty()){
						root.ref[index] = null;
				}
			}
		}else{
			root.ref[index] = removeDetails(root.ref[index], pincode.slice(1,pincode.length), data);
		}
		
		for(var i = 0 ; i < 10 ; i++){
			if(root.ref[i] != null){
				return root;
			}
		}
		
		return null;
	}
	
	this.root = removeDetails(this.root, pincode, data);
}
//Definition of the Pincode Tree ends here.

