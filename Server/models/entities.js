/**
 * Created by sebastian on 11.05.15.
 */
var Entity = function () {
    this.name = '';
    this.description = '';
    this.type = '';
    this.fileInfoId = '';
    this.tags = [];
}

var FileInfo = function () {
    this.filename = '';
    this.size = 0;
    this.extraData = {};
    this.createPath = '';
}

var Document = function () {
    Entity.call(this);
    this.type = 'DOCUMENT';
}

Document.prototype = Object.create(Entity.prototype);
Document.prototype.constructor = Document;

var Container = function () {
    this.type = 'CONTAINER';
}

Container.prototype = Object.create(Entity.prototype);
Container.prototype.constructor = Container;

module.exports.Entity = Entity;
module.exports.FileInfo = FileInfo;
module.exports.Document = Document;
module.exports.Container = Container;