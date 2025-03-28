/**
 *  @author Atul Chopade
 *  @date 20 Feb 2025
 *  @description CalloutService Test Class
 */

@isTest
public class CalloutServiceTest {
    
    /**
     * @description Mock class for simulating successful HTTP callouts.
     */
    private class MockHttpCallout implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            HttpResponse objResponse = new HttpResponse();
            
            if (req.getEndpoint().contains('success')) {
                objResponse.setBody('{"message": "Success"}');
                objResponse.setStatusCode(200);
            } else {
                objResponse.setBody('{"error": "Error"}');
                objResponse.setStatusCode(500);
            }
            return objResponse;
        }
    }

    /**
     * @description Mock class for simulating an HTTP callout failure by throwing an exception.
     */
    private class MockHttpCalloutError implements HttpCalloutMock {
        public HttpResponse respond(HttpRequest req) {
            throw new CalloutException('Simulated callout failure');
        }
    }

    /**
     * @description Helper method to set up a mock response for successful HTTP callouts.
     */
    private static void setupMockResponse() {
        Test.setMock(HttpCalloutMock.class, new MockHttpCallout());
    }

    /**
     * @description Helper method to set up a mock response that simulates an HTTP callout failure.
     */
    private static void setupMockErrorResponse() {
        Test.setMock(HttpCalloutMock.class, new MockHttpCalloutError());
    }
    
    /**
     * @description Tests the GET method of CalloutService with a successful response.
     */
    @isTest
    static void testGet(){
        setupMockResponse();
        String strUrl = 'https://api.example.com/success';
        CalloutService objService = new CalloutService();
        String strResponseGet = objService.get(strUrl);
        System.assertEquals('{"message": "Success"}', strResponseGet, 'GET method with headers should return success');
    }

    /**
     * @description Tests the GET method with additional request headers.
     */
    @isTest
    static void testGetWithHeaders() {
        setupMockResponse();
        String strUrl = 'https://api.example.com/success';
        Map<String, String> mapHeaders = new Map<String, String> { 'Authorization' => 'Bearer token' };
        
        CalloutService objService = new CalloutService();
        String strResponseGet = objService.get(strUrl, mapHeaders);
        
        System.assertEquals('{"message": "Success"}', strResponseGet, 'GET method with headers should return success');
    }

    /**
     * @description Tests the GET method with a request body and headers.
     */
    @isTest
    static void testGetWithBodyAndHeaders() {
        setupMockResponse();
        String strUrl = 'https://api.example.com/success';
        String strRequestBody = '{"query": "test"}';
        Map<String, String> mapHeaders = new Map<String, String> { 'Content-Type' => 'application/json' };
        
        CalloutService objService = new CalloutService();
        String strResponseGetWithBody = objService.get(strUrl, strRequestBody, mapHeaders);
        
        System.assertEquals('{"message": "Success"}', strResponseGetWithBody, 'GET method with body & headers should return success');
    }

    /**
     * @description Tests the POST method with a request body and headers.
     */
    @isTest
    static void testPostWithBodyAndHeaders() {
        setupMockResponse();
        String strUrl = 'https://api.example.com/success';
        String strRequestBody = '{"data": "test"}';
        Map<String, String> mapHeaders = new Map<String, String> { 'Content-Type' => 'application/json' };
        
        CalloutService objService = new CalloutService();
        HttpResponse objResponsePost = objService.post(strUrl, strRequestBody, mapHeaders);
        
        System.assertEquals(200, objResponsePost.getStatusCode(), 'POST request should return 200');
        System.assertEquals('{"message": "Success"}', objResponsePost.getBody(), 'POST request body should match');
    }

    /**
     * @description Tests the request method for both GET and POST requests with different parameters.
     */
    @isTest
    static void testRequestMethod() {
        setupMockResponse();
        String strUrl = 'https://api.example.com/success';
        String strMethodGet = 'GET';
        String strMethodPost = 'POST';
        Map<String, String> mapHeaders = new Map<String, String> { 'Authorization' => 'Bearer token' };
        String strRequestBody = '{"data": "test"}';
        
        CalloutService objService = new CalloutService();
        String strResponseGet = objService.request(strUrl, strMethodGet, mapHeaders);
        String strResponsePost = objService.request(strUrl, strMethodPost, strRequestBody);
        String strResponseDefaultGet = objService.request(strUrl, strMethodGet);
        
        System.assertEquals('{"message": "Success"}', strResponseGet, 'GET request should return success response');
        System.assertEquals('{"message": "Success"}', strResponsePost, 'POST request should return success response');
        System.assertEquals('{"message": "Success"}', strResponseDefaultGet, 'Default GET request should return success response');
    }

    /**
     * @description Tests how the GET method handles an exception when the callout fails.
     */
    @isTest
    static void testGetWithExceptionHandling() {
        setupMockErrorResponse();
        String strUrl = 'https://api.example.com/failure';
        Map<String, String> mapHeaders = new Map<String, String> { 'Authorization' => 'Bearer token' };
        
        CalloutService objService = new CalloutService();
        try {
            String strResponseGetError = objService.get(strUrl, mapHeaders);
        } catch (Exception e) {
            System.assertEquals('Simulated callout failure', e.getMessage(), 'Exception message should match the simulated failure');
        }
    }
}