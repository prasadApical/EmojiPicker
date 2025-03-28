/**
 * @author Tushar Kumawat
 * @date 29 March 2023
 * @description Callout Service Controller
 */
public inherited sharing class CalloutService {
    public class CalloutServiceException extends Exception {}

    // OAuth 1.0 & OAuth 2.0 Parameters
    public static String OAUTH1_REQUEST_BODY = 'grant_type=password&client_id={0}&client_secret={1}&username={2}&password={3}';
    public static String AUTHORIZATION_REQUEST_BODY = 'scope={0}&state={1}&redirect_uri={2}&response_type={3}&client_id={4}&approval_prompt={5}';
    public static String AUTHENTICATION_REQUEST_BODY = 'code={0}&client_id={1}&client_secret={2}&redirect_uri={3}&grant_type=authorization_code';

    // Defaule HTTP values
    public static Integer INT_TIMEOUT = 120000;
    public HttpRequest httpRequest;
    public HttpResponse httpResponse;
    public String strResponseBody;

    // Default Constructor
    public CalloutService() {}

    public CalloutService(String strURL, String strMethod, String strBody, Map<String, String> mapHeaders) {
        try {
            this.httpRequest = buildRequest(strURL, strMethod.toUpperCase(), strBody, mapHeaders);
            this.httpResponse = doCallout(new HTTP(), this.httpRequest);
            this.strResponseBody = handleResponse(this.httpResponse);
        }
        catch(Exception ex) {
            this.strResponseBody = ex.getMessage();
        }
    }

    public CalloutService(String strURL, String strMethod, String strBody) {
        this(strURL, strMethod, strBody, NULL);
    }
    
    public CalloutService(String strURL, String strMethod, Map<String,String> mapHeaders) {
        this(strURL, strMethod, NULL, mapHeaders);
    }
    
    public CalloutService(String strURL, String strMethod) {
        this(strURL, strMethod, NULL, null);
    }

    /**
     * @description Method to build request
     */
    private static HttpRequest buildRequest(String strURL, String strMethod, String strBody, Map<String, String> mapHeaders) {
		HttpRequest httpRequest = new HttpRequest();
        httpRequest.setTimeout(INT_TIMEOUT);
		httpRequest.setEndpoint(strURL);
		httpRequest.setMethod(strMethod);
		
		if(String.isNotBlank(strBody)) {
			httpRequest.setBody(strBody);
		}
		
        if(mapHeaders != NULL) {
            for(String strKey : mapHeaders.keySet()) {
                httpRequest.setHeader(strKey, mapHeaders.get(strKey));
            }
        }

        return httpRequest;
    }

    /**
     * @description Method to call API endpoint
     */
    private static HttpResponse doCallout(Http http, HttpRequest httpRequest) {
        HttpResponse httpResponse = http.send(httpRequest);

        if(httpResponse.getStatusCode() > 299) {
            throw new CalloutServiceException('Failed to recieve a success code from remote. Code was: ' + httpResponse.getStatusCode() 
                                          + ' request was ' + httpResponse + ' Response Body is: ' + httpResponse.getBody());
        }

        return httpResponse;    
    }  

    /**
     * @description Method to get response from request
     */
    private string handleResponse(HttpResponse httpRequest) {
        return httpRequest.getBody();
    }

    /**
     * @description GET Convenance Methods.
     **/
    public String get(String strURL) {
        CalloutService x = new CalloutService(strURL, 'GET', NULL, NULL);
        return x.strResponseBody;
    }
    
    public String get(String strURL, Map<String, String> mapHeaders) {
        CalloutService x = new CalloutService(strURL, 'GET', NULL, mapHeaders);
        return x.strResponseBody;
    }
    
    public String get(String strURL, String strBody, Map<String, String> mapHeaders) {
        CalloutService x = new CalloutService(strURL, 'GET', strBody, mapHeaders);
        return x.strResponseBody;
    }
    
    /**
     * @description POST Convenance Methods.
     **/
    public HttpResponse post(String strURL, String strBody, Map<String, String> mapHeaders) {
        CalloutService x = new CalloutService(strURL, 'POST', strBody, mapHeaders);
        return x.httpResponse;
    }

    /**
     * @description Request Convenance Methods.
     **/
    public String request(String strURL, String strMethod, Map<String,String> mapHeaders) {
        CalloutService x = new CalloutService(strURL, strMethod, mapHeaders);
        return x.strResponseBody;
    }

    public String request(String strURL, String strMethod, String strBody) {
        CalloutService x = new CalloutService(strURL, strMethod, strBody);
        return x.strResponseBody;
    }

    public String request(String strURL, String strMethod) {
        CalloutService x = new CalloutService(strURL, strMethod);
        return x.strResponseBody;
    }

    /**
     * @description To get aouthentication detail Wrapper
     */
    public class OAuth {
        @AuraEnabled public String id;
        @AuraEnabled public String issued_at;
        @AuraEnabled public String instance_url;
        @AuraEnabled public String signature;
        @AuraEnabled public String access_token;
        @AuraEnabled public String refresh_token;
    }
}