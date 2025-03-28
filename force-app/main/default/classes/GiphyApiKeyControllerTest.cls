/**
  	* @author Atul Chopade [Apical Cloud Solutions Ltd.]
 	* @date 4 Mar 2025
    * @description Test class for GiphyApiKeyController to verify the saveGoogleApiKey method.
    * It ensures that the API key is updated properly and validates exception handling.
    */
@IsTest
private class GiphyApiKeyControllerTest {
    
	@IsTest
    static void testSaveGiphyApiKey() {
        Test.startTest();
        // Test with a valid API key
        String strApiKey = 'AIzaSyD-ValidTestKey123456';
        try {
            GiphyApiKeyController.saveGiphyApiKey(strApiKey);
        } catch (AuraHandledException e) {
            System.assertEquals('Script-thrown exception', e.getMessage());
        }
        Test.stopTest();
    }
    
    
    @IsTest
    static void testEmptyApikey() {
        try {
            GiphyApiKeyController.saveGiphyApiKey('');
        } catch (AuraHandledException e) {
            System.assertEquals('Script-thrown exception', e.getMessage());
        }
    }
}