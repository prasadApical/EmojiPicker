/**
 * Author: Apical Cloud Soltutions Ltd.
 * Developer: Prasad Rajaram Kumawat
 * Application: Emoji Picker with GIF Integration
 * Created Date: 2024-06-21
 * Modified Date: 2024-06-21
 * Description: This Apex file handles the logic for the Giphy API for GIF search and selection.
 * 
 * Copyright © 2024 Apical Cloud Solutions Ltd.
 * All rights reserved. No part of this code may be reproduced, distributed, or transmitted
 * in any form or by any means, including photocopying, recording, or other electronic or mechanical methods,
 * without the prior written permission of the owner.
 * 
 */
public class GiphyService {

    /**
     * Searches for GIFs on Giphy based on the provided query.
     * 
     * @param strQuery The search term for finding GIFs.
     * @return JSON response containing the search results.
     */
    @AuraEnabled(cacheable=true)
    public static String searchGiphy(String strQuery) {
        //Returning response
      	String strResponse;
        
        // Construct the endpoint URL with query parameters
        String strEndpoint = GiphyServiceConstants.GIPHY_API_URL + '?api_key=' + GiphyServiceConstants.GIPHY_API_KEY + '&q=' + EncodingUtil.urlEncode(strQuery, 'UTF-8') + '&limit=10';
       
        // Callout service for Giphy Api
        CalloutService service = new CalloutService(strEndpoint,'GET');
        
        
        // Check the response status
        if (service.httpResponse.getStatusCode() == 200) {
            strResponse = service.strResponseBody;
            return strResponse;
        } else{
            throw new AuraHandledException('Unable to fetch Gif at this moment');
        }
        
    }
}