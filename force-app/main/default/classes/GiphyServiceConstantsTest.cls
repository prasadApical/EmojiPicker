/**
 *  @author Atul Chopade
 *  @date 04 March 2025
 *  @description This Apex file contains test method for GiphyServiceConstants class.
 */
@isTest
public class GiphyServiceConstantsTest {
    
    @isTest
    static void testGiphyServiceConstants() {
        // Access the static constant to trigger the static block execution
        String apiKey = GiphyServiceConstants.GIPHY_API_KEY;
        
        
        // Validate the API URL
        System.assertEquals('https://api.giphy.com/v1/gifs/search', GiphyServiceConstants.GIPHY_API_URL, 'API URL should match expected value.');
    }
}