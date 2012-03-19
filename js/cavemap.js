var PlayerEntity = function() {
	Entity.call(this, "PLAYER");
};
inherits(PlayerEntity,Entity);

var GrassEntity = function() {
	Entity.call(this, "GRASS");
};
inherits(GrassEntity,Entity);

var WallEntity = function() {
	Entity.call(this, "WALL");
};
inherits(WallEntity,Entity);



var CaveMap = function() {
	Map.call(this);
	this.width = 60;
	this.height = 45;
};
inherits(CaveMap,Map);

CaveMap.prototype.generate = function() {

	this.numGenerator = new MersenneTwister( Math.random()*1000 );
	this.numIterations = 5;
	this.floorPercentage = 0.75;


	for (var x = 0; x < this.width; x++) {
		for (var y = 0; y < this.height; y++) {
			this.tiles[y*this.width+x] = new Tile(this,x,y);
			this.tiles[y*this.width+x].push(new GrassEntity());
		}
	}

	var map = this;

	for( var y = 0; y < map.height; y++ ) {
		for( var x = 0; x < map.width; x++ ) {
			var newTile = new Tile(map, x, y);
			var newEntity = new Entity( 'Wall' ); 

			if( x != 0 && x != map.width-1 && y != 0 && y != map.height-1 ) {
				var randomRoll = this.numGenerator.genrand_real1();
				console.log( randomRoll );
				if( randomRoll <= this.floorPercentage ) {
					newEntity.type = 'Floor';
				}
			}

			newTile.push( newEntity );
			map[ map.getIndex( x, y ) ] = newTile;
		}
	}

	var tileCount = this.width * this.height;
	for( var iteration = 0; iteration < this.numIterations; iteration++ ) {
		for( var y = 0; y < map.height; y++ ) {
			for( var x = 0; x < map.width; x++ ) {
				var getNumWallNeighbors = function( x, y ) {
					var result = 0;
					for( yIter = y-1; yIter < y+1; yIter++ ) {
						for( xIter = x-1; xIter < x+1; xIter++ ) {
							var gotTile = map.getTile( xIter, yIter );
							if( gotTile != undefined && gotTile.type == 'Wall' )
								result++
						}
					}

					return result;
				}

				var gotTile = map.getTile( x, y );
				if( gotTile == undefined )
				{
					console.log( "X: " + x + ", Y: " + y );
				}

				if( gotTile.type != 'Wall' );
				{
					var numWallNeighbors = getNumWallNeighbors( x, y );
					if( numWallNeighbors > 4 || numWallNeighbors == 0 )
						gotTile.type == 'Wall';
				}
			}
		}
	}
};