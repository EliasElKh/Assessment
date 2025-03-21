class LRUCache {
    private capacity: number;
    private ObjectStore: { key: number, value: number }[] = [];
    private LRU: number[] = [];

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    get(key: number): number | null {
        for (let i = 0; i < this.ObjectStore.length; i++) {
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
    }

    put(key: number, value: number): void {
        // Check if key already exists
        for (let i = 0; i < this.ObjectStore.length; i++) {
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
            const lruKey = this.LRU.shift(); // Remove LRU key
            this.ObjectStore = this.ObjectStore.filter(obj => obj.key !== lruKey); // Remove from ObjectStore
        }

        // Add new key-value pair
        this.ObjectStore.push({ key, value });
        this.LRU.push(key);
        console.log(this.ObjectStore);
        console.log(this.LRU);
    }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1); // 1
cache.put(3, 3); // Removes key 2
cache.get(2); // null
