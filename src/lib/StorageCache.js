let store,
    win = window,
    localStorageName = 'localStorage',
    storage = win[localStorageName],
    prefixKey = window.location.hostname || '';

export const WebStorageCache = {
    get: function (key) {
        key = `${prefixKey}.${key}`;
        var config = storage.getItem(key);
        if(config && (config = JSON.parse(config))){
            return config;
        }else{
            return {};
        }
    },
    set: function (key, val) {
        key = `${prefixKey}.${key}`;
        try{
            storage.setItem(key, JSON.stringify(val));
        }catch(e){}
    },
    remove: function (key) {
        key = `${prefixKey}.${key}`;
        storage.removeItem(key);
    }
};