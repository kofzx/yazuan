const apiUrl = 'https://wxmini.iapcn.com/api/';

const http = ({
    url = '',
    param = {},
    ...other
} = {}) => {
    wx.showLoading({
        title: '加载中..'
    });
    param.token = wx.getStorageSync('token')
    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            data: param,
            header: {
                'content-type': 'application/json'
            },
            ...other,
            fail: () => {
                wx.showToast({
                    title: '请求错误，请重试',
                    icon: 'none',
                })
            },
            complete: (res) => {
                wx.hideLoading();
                if (res.data.code !== 1) {
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                    })
                    return false;
                }
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data)
                } else {
                    reject(res)
                }
            }
        })
    })
}

const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
        url = apiUrl + url;
    }
    return url
}

const get = (url, param = {}) => {
    return http({
        url,
        param
    })
}

const post = (url, param = {}) => {
    return http({
        url,
        param,
        method: 'post'
    })
}

export default {
    apiUrl,
    get,
    post
}