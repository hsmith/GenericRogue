var Map = function() {
	this.tiles = [];
	this.width = 0;
	this.height = 0;
	this.renderMap = [];
};

Map.prototype.generate = function() {
};

Map.prototype.getTile = function(x, y) {
	var index = this.getIndex( x, y );
	return this.tiles[ index ];
};

Map.prototype.getCoordinate = function( index ) {
	var y = index % this.width;
	var x = index - y;
};

Map.prototype.getIndex = function( x , y ) {
	return y * this.width + x;
};

Map.prototype.update = function(tile) {
	this.renderMap[tile.y * this.width + tile.x] = tile.last().type;
};
