import * as crypto from "crypto";

export class WorkplaceAPIManager {
    accessToken: string;
    appSecret: string;
    uri: string;
    constructor(accessToken: string, appSecret: string) {

        this.accessToken = accessToken;
        this.appSecret = appSecret;
        this.uri = "https://graph.facebook.com";
    }

    public postMessageInGroup = async (message: string, groupId: string, link: string = null) => {

        try {
            let appSecretTime = (new Date().getTime() / 1000 | 0);
            const hmac = crypto.createHmac('sha256', this.appSecret);
            hmac.update(this.accessToken + '|' + appSecretTime);
            const appSecretProof = hmac.digest('hex');
            const url = `${this.uri}/${groupId}/feed?access_token=${this.accessToken}&appsecret_time=${appSecretTime}&appsecret_proof=${appSecretProof}&message=${message}&formatting=MARKDOWN${link === null ? '' : '&link=' + link}`;
            console.log("WP URL:" + url);
            let response = await fetch(url, { method: 'POST' });
            return await response.text();
        } catch (error) {
            throw error
        }
    }


}