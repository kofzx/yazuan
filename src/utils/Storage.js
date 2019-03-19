class Storage {
	static get (key) {
		return new Promise((resolve, reject) => {
			try {
				const value = wx.getStorageSync(key);
				if (value || value === 0 || value.length) {
					resolve(value);
				} else {
					throw new Error("get storage fail");
				}
			} catch (e) {
				console.warn(e);
				reject(e);
			}
		})
	}
	static set (key, data) {
		wx.setStorageSync(key, data);
	}
}

export default Storage;