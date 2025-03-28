/**
 * Author: Apical Cloud Soltutions Ltd.
 * Developer: Prasad Rajaram Kumawat
 * Application: Emoji Picker with GIF Integration
 * Created Date: 2024-06-21
 * Modified Date: 2024-06-21
 * Description: This Apex file handles the logic for the testing GiphyService class.
 * 
 * Copyright © 2024 Apical Cloud Solutions Ltd.
 * All rights reserved. No part of this code may be reproduced, distributed, or transmitted
 * in any form or by any means, including photocopying, recording, or other electronic or mechanical methods,
 * without the prior written permission of the owner.
 * 
 */
@IsTest
public class GiphyServiceTest {
   @IsTest
    static void testSearchGiphy() {
        // Set the mock callout class
        Test.setMock(HttpCalloutMock.class, new MockGiphyResponse());
        
        // Call the method to test
        String strQuery = 'funny cats';
        String strResponse = GiphyService.searchGiphy(strQuery);
        
        // Verify the response
        System.assertNotEquals(null, strResponse, 'Response should not be null');
        
        // Parse the response to verify its content
        Map<String, Object> jsonResponse = (Map<String, Object>) JSON.deserializeUntyped(strResponse);
        List<Object> gifs = (List<Object>) jsonResponse.get('data');
        
        System.assertEquals(2, gifs.size(), 'There should be 2 gifs in the response');
        
        Map<String, Object> gif1 = (Map<String, Object>) gifs.get(0);
        Map<String, Object> gif1Images = (Map<String, Object>) gif1.get('images');
        Map<String, Object> gif1FixedHeightSmall = (Map<String, Object>) gif1Images.get('fixed_height_small');
        
        System.assertEquals('http://example.com/gif1.gif', gif1FixedHeightSmall.get('url'), 'The first GIF URL should match');
        
        Map<String, Object> gif2 = (Map<String, Object>) gifs.get(1);
        Map<String, Object> gif2Images = (Map<String, Object>) gif2.get('images');
        Map<String, Object> gif2FixedHeightSmall = (Map<String, Object>) gif2Images.get('fixed_height_small');
        
        System.assertEquals('http://example.com/gif2.gif', gif2FixedHeightSmall.get('url'), 'The second GIF URL should match');
    }

    @IsTest
    static void testSearchGiphyError() {
        // Set the mock callout class to simulate an error response
        Test.setMock(HttpCalloutMock.class, new MockGiphyErrorResponse());
        
        // Call the method to test and expect an exception
        String query = 'funny cats';
        try {
            String response = GiphyService.searchGiphy(query);
        } catch (exception e) {
            System.assertEquals('Attempt to de-reference a null object', e.getMessage(), 'The exception should be thrown');
        }
    }
}