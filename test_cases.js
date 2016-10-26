
//Testing 
var data = {id:1,info:"delhi"};
t = new Tree();
t.addDataIntoCluster("54321",data); //1 user in cluster 54321
t.addDataIntoCluster("54322",data); //1 user in cluster 54322
t.addDataIntoCluster("54323",data); //1 user in cluster 54323
t.addDataIntoCluster("61323",data); //1 user in cluster 61323
t.numberOfClustersAvailable(); //4
t.getAllClustersData();		   // 4 cluster's data 54321,54322,54323 and 61323 
t.getPincodeData("54321");		//cluster data, 1 user present.
var data = {id:1,info:"mumbai"};
t.addDataIntoCluster("54322",data); // overwrites user in cluster 54322 as id was already present.
t.getPincodeData("54322");		//cluster data, only 1 user present.
t.numberOfClustersAvailable();   // 4
var data = {id:10,info:"Lucknow"};
t.addDataIntoCluster("54322",data); //2 users in cluster 54322.
var data = {id:10,info:"Lucknow"}; 
t.addDataIntoCluster("54322",data); //3 users in cluster 54322.
t.getPincodeData("54322");			//cluster data, 3 users.
t.numberOfClustersAvailable();  //4
var data = {id : 1};
t.removeDataFromCluster("54323",data); //only 1 user was present in cluster. So whole cluster will be removed.
t.numberOfClustersAvailable(); //3
t.getAllClustersData();		   //3 clusters data.
var data = {id : 1};
t.removeDataFromCluster("54322",data); //removes 1 user. 2 users will stay.
t.numberOfClustersAvailable(); //3
t.getAllClustersData();		   //3 clusters data.
var data = {id : 10};
t.removeDataFromCluster("54322",data); //1 user remians.
t.numberOfClustersAvailable(); //3
t.getAllClustersData();		//3 cluster data.
var data = {id : 10};
t.removeDataFromCluster("54322",data); // last user removed. cluster will bw removed.
t.numberOfClustersAvailable(); //2
t.getAllClustersData();		
