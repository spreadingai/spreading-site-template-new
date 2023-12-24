// import SiteConfig from "../site.json"
// import to make sure copy the site.json file
import sc from "../site.json"

const fs = require('fs');
const path = require('path');

let SiteConfig = undefined;
try {
    SiteConfig = JSON.parse(fs.readFileSync(path.resolve("./public","..", "site.json"), 'utf8'))
} catch (error) {
    console.log(error)
}
let version = undefined;
try {
    const packageInfo = JSON.parse(fs.readFileSync(path.resolve("./public","..", "package.json"), 'utf8'))
    version = packageInfo.version
} catch (error) {
    console.log(error)
}

export function getSiteConfig() {
    return SiteConfig;
}

export function getSiteTitle() {
    const siteTitle = SiteConfig.title;
    return siteTitle
}

export function getIconRedirectUrl() {
    const siteIconRedirectUrl = SiteConfig.icon_redirect_url;
    return siteIconRedirectUrl
}

export function getProxyPath() {
    const proxyPath = SiteConfig.proxy;
    console.log("[Spreading][getProxyPath] proxyPath: ", proxyPath);
    return proxyPath
}

export function getVersion() {
    return version
}

export function getSiteInfo() {
    return {
        title: getSiteTitle() || "",
        iconRedirectUrl: getIconRedirectUrl() || "",
        version: getVersion(),
    }
}