/**
 * Author: Apical Cloud Soltutions Ltd.
 * Developer: Prasad Rajaram Kumawat
 * Application: Emoji Picker with GIF Integration
 * Created Date: 2024-06-21
 * Modified Date: 2024-06-21
 * Description: This Apex file contains a mockResponse for GiphyServiceTest class.
 * 
 * Copyright © 2024 Apical Cloud Solutions Ltd.
 * All rights reserved. No part of this code may be reproduced, distributed, or transmitted
 * in any form or by any means, including photocopying, recording, or other electronic or mechanical methods,
 * without the prior written permission of the owner.
 * 
 */
@IsTest
public class MockGiphyErrorResponse implements HttpCalloutMock {
    public HTTPResponse respond(HTTPRequest req) {
        // Create a fake HTTP error response
        HttpResponse response = new HttpResponse();
        response.setStatusCode(500); // Internal Server Error
        response.setBody('{"message":"Internal Server Error"}');
        return response;
    }
}