var Map = function() {
	this.tiles = [];
	this.width = 0;
	this.height = 0;
};

Map.prototype.generate = function( generator ) {
	generator.generate( this );
};

Map.prototype.getTile = function(x, y) {
	var index = this.getIndex( x, y );
	return this.tiles[ this.getIndex( index ];
};

Map.prototype.getCoordinate = function( index ) {
	var y = index % this.width;
	var x = index - y;
};

Map.prototype.getIndex = function( x , y ) {
	return y * this.width + x;
};

Map.prototype.randomSeed = function(seed) {
  if (!seed)
    seed = new Date().getTime();
  seed = (seed*9301+49297) % 233280;
  return seed/(233280.0);
}