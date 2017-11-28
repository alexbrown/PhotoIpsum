const request = require("request");

const UNSPLASHURL = "https://api.unsplash.com/photos/random"
const APIKEY = process.env.APIKEY;

function getSizeFromParams(params){
    let width = params.split("x")[0];
    let height = params.split("x")[1];
    let orientation = getOrientationFromSize(width, height);
    return {width, height, orientation} 
}

function getOrientationFromSize(width, height){
    const orientation = {LANDSCAPE : "landscape", PORTRAIT : "portrait", SQUARISH : "squarish"};
    if(width === height){
        return orientation.SQUARISH;
    }else if(width > height) {
        return orientation.LANDSCAPE;
    } else {
        return orientation.PORTRAIT;
    }
}

function buildUnsplashURL(size, term){
    let url = UNSPLASHURL + "?client_id=" + APIKEY + "&w=" + size.width + "&h=" + size.height + "&orientation=" + size.orientation;
    if(term){
        url = url + "&query=" + term;
    }
    return url;
}

function getRandomPhoto(size, callback){
    let url = buildUnsplashURL(size);
    request(url, (err, res, body) => {
        let data = JSON.parse(body);
        callback(data.urls.custom);
    })
}

function getPhotoWithTerm(size, term, callback){
    let url = buildUnsplashURL(size, term);
    request(url, (err, res, body) => {
        let data = JSON.parse(body);
        if(data.urls && data.urls.custom){
            callback(data.urls.custom);
        } else {
            callback("/homepage/img/no-image-found.png");
        }
        
    })
}

module.exports.getSizeFromParams = getSizeFromParams;
module.exports.getRandomPhoto = getRandomPhoto;
module.exports.getPhotoWithTerm = getPhotoWithTerm;