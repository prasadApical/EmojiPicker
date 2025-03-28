/**
 *  @author Atul Chopade
 *  @date 04 March 2025
 *  @description This Apex file contains constants for GiphyService Integration.
 */
public with sharing class GiphyServiceConstants {

    // API Key for Giphy 
    public static final String GIPHY_API_KEY;
    
    static {
        //List for getting Google API v2 key from the Custom Metadata
        List<iTranslation__Giphy_Key_Credential__mdt> listApiKey = 
            [SELECT iTranslation__Api_Key__c FROM iTranslation__Giphy_Key_Credential__mdt LIMIT 1];
        
        // Assign API Key only if the list contains records
        if (!listApiKey.isEmpty()) {
            GIPHY_API_KEY = listApiKey[0].iTranslation__API_Key__c;
        } else {
            GIPHY_API_KEY = ''; // Default to an empty string or handle appropriately
        }
        
    }
    
   	// API URL for Giphy
    public static final String GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/search';
}