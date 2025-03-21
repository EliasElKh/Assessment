var LRUCache = /** @class */ (function () {
    function LRUCache(capacity) {
        this.ObjectStore = [];
        this.LRU = [];
        this.capacity = capacity;
    }
    LRUCache.prototype.get = function (key) {
        for (var i = 0; i < this.ObjectStore.length; i++) {
            if (this.ObjectStore[i].key === key) { // Find the key and change order in LRU
                this.LRU.splice(this.LRU.indexOf(key), 1);
                this.LRU.push(key);
                console.log(this.ObjectStore);
                console.log(this.LRU);
                return this.ObjectStore[i].value;
            }
        }
        console.log('Null');
        return null;
    };
    LRUCache.prototype.put = function (key, value) {
        // Check if key already exists
        for (var i = 0; i < this.ObjectStore.length; i++) {
            if (this.ObjectStore[i].key === key) {
                this.ObjectStore[i].value = value; // Update value
                this.LRU.splice(this.LRU.indexOf(key), 1);
                this.LRU.push(key); // Move to most recently used
                console.log(this.ObjectStore);
                console.log(this.LRU);
                return;
            }
        }
        // If capacity is full, remove the least recently used item
        if (this.ObjectStore.length == this.capacity) {
            var lruKey_1 = this.LRU.shift(); // Remove LRU key
            this.ObjectStore = this.ObjectStore.filter(function (obj) { return obj.key !== lruKey_1; }); // Remove from ObjectStore
        }
        // Add new key-value pair
        this.ObjectStore.push({ key: key, value: value });
        this.LRU.push(key);
        console.log(this.ObjectStore);
        console.log(this.LRU);
    };
    return LRUCache;
}());
var cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 1
cache.put(3, 3); // Removes key 2
cache.get(2); // null
