
class Base {
    constructor(username, password, appKey, appSecret, callbackUrl, isDev) {
        this.SANDBOX_URL = 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized';
        this.LIVE_URL = '';
        this.URL = !isDev ? this.SANDBOX_URL : this.LIVE_URL;
        this.CALLBACK_URL = callbackUrl;

        // Construct creds
        this.username = username;
        this.password = password;
        this.appKey = appKey;
        this.appSecret = appSecret;
    }


}
