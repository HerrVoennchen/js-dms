/**
 * Created by sebastian on 11.05.15.
 */
class Entity {
    constructor() {
        this.name = '';
        this.description = '';
        this.type = '';
        this.files = new Set();
    }
}

class Document extends Entity {
    constructor() {
        super.constructor();

        this.type = 'DOCUMENT';
    }
}

class Container extends Entity {
    constructor() {
        super.constructor();

        this.type = 'CONTAINER';
    }
}

class File {
    constructor() {
        this.filename = '';
        this.size = 0;
        this.extraData = {};
    }
}