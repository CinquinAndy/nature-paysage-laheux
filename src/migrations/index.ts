import * as migration_20251012_233416 from './20251012_233416'

export const migrations = [
	{
		up: migration_20251012_233416.up,
		down: migration_20251012_233416.down,
		name: '20251012_233416',
	},
]
