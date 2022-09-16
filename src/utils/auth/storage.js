
/** 
 * @method getStorage 获取存储
 * @method setStorage 设置存储
 * @method removeStorage 清除某一项存储
 * @method clearStorage 清除全部存储
 */
const storage = window.localStorage

exports.getStorage = (key) => {
    return storage.getItem(key)
}

exports.setStorage = (key, data) => {
    if (typeof data === "object" && typeof data!==null) {
        data = JSON.stringify(data)
    }
    return storage.setItem(key, data)
}

exports.removeStorage = (key) => {
    return storage.removeItem(key)
}

exports.clearStorage = () => storage.clear()