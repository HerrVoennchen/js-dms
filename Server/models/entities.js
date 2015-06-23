/**
 * Created by sebastian on 11.05.15.
 */
var FieldInfo = function () {
    this.name = '';
    this.type = '';
    this.uiname = '';
    this.value = '';
    this.visible = true;
}

var Entity = function () {
    this.name = '';
    this.description = '';
    this.type = '';
    this.fileInfoId = '';
    this.tags = [];
    this.fields = [];
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
    Entity.call(this);
    this.type = 'CONTAINER';
}

Container.prototype = Object.create(Entity.prototype);
Container.prototype.constructor = Container;

module.exports.FieldInfo = FieldInfo;
module.exports.Entity = Entity;
module.exports.FileInfo = FileInfo;
module.exports.Document = Document;
module.exports.Container = Container;
