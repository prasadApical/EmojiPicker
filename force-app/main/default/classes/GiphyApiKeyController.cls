/**
 * @author Atul Chopade [Apical Cloud Solutions Ltd.]
 * @date 04 Mar 2025
 * @description Insert or Update Api Key in the Metadata
 */
public with sharing class GiphyApiKeyController {
     /**
    * @description insert or update the api key 
	* @param {String}strApiKey contains google api key
 	*/
    @AuraEnabled
    public static void saveGiphyApiKey(String strApiKey) {
        // Check if the API key has a value or not
        if (String.isBlank(strApiKey)) {
            throw new AuraHandledException('API Key cannot be empty');
        }
        
        // Instance of the record
        Metadata.CustomMetadata recordInstance = new Metadata.CustomMetadata();

        // Query the custom metadata records
        List<iTranslation__Giphy_Key_Credential__mdt> listApiMetadata = 
            [SELECT MasterLabel, DeveloperName, iTranslation__Api_Key__c 
             FROM iTranslation__Giphy_Key_Credential__mdt
             LIMIT 1];

        if (!listApiMetadata.isEmpty()) { // Check if the list is not empty
            recordInstance.fullName = Constants.STR_PACKAGE_NAMESPACE+'Giphy_Key_Credential__mdt.'+Constants.STR_PACKAGE_NAMESPACE+ listApiMetadata[0].DeveloperName;
            recordInstance.label = listApiMetadata[0].MasterLabel;
        } else {
            recordInstance.fullName = Constants.STR_PACKAGE_NAMESPACE+'Giphy_Key_Credential__mdt.'+Constants.STR_PACKAGE_NAMESPACE+'Giphy_API_Key';
            recordInstance.label = 'Giphy API Key';
        }

        // Instance of the value
        Metadata.CustomMetadataValue fieldInstance = new Metadata.CustomMetadataValue();
        fieldInstance.field = Constants.STR_PACKAGE_NAMESPACE + 'API_Key__c';
        fieldInstance.value = strApiKey;

        recordInstance.values.add(fieldInstance);

        // Instance of the container
        Metadata.DeployContainer containerInstance = new Metadata.DeployContainer();
        containerInstance.addMetadata(recordInstance);

        
        // Enqueue custom metadata deployment
        try{
        	Metadata.Operations.enqueueDeployment(containerInstance, null);
        }catch(Exception ex){
             throw new AuraHandledException('Exception:'+ex.getMessage());
        }
    }

}