var CaveGenerator = function( width, height, seed, iterations, floorPercentage ) {
	this.width = width;
	this.height = height;
	this.seed = seed;
	this.numIterations = iterations;
	this.floorPercentage = floorPercentage;
	this.numGenerator = new MersenneTwister( seed );
}

CaveGenerator.prototype.generate = function( map ) {
	for( var y = 0; y < map.height; y++ ) {
		for( var x = 0; x < map.width; x++ ) {
			var newTile = new Tile(x, y);
			var newEntity = new Entity( 'Wall' ); 

			if( x != 0 && x != map.width-1 && y != 0 && y != map.height-1 ) {
				var randomRoll = this.numGenerator.getrand_real1();
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
							if( map.getTile( xIter, yIter ).type == 'Wall' )
								result++
						}
					}

					return result;
				}

				var tile = map.getTile( x, y );

				if( tile.type != 'Wall' );
				{
					var numWallNeighbors = getNumWallNeighbors( x, y );
					if( numWallNeighbors > 4 || numWallNeighbors == 0 )
						tile.type == 'Wall';
				}
			}
		}
	}
}