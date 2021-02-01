/**
 * Internal dependencies
 */
import { ExperimentAssignment } from '../types';
import * as Timing from './timing';

/**
 * Check if an ExperimentAssignment is still alive (as in the TTL).
 *
 * @param experimentAssignment The experiment assignment to check
 */
export function isAlive( experimentAssignment: ExperimentAssignment ): boolean {
	return (
		Timing.monotonicNow() <
		experimentAssignment.ttl * Timing.MILLISECONDS_PER_SECOND +
			experimentAssignment.retrievedTimestamp
	);
}

/**
 * The ttl (in seconds) for a fallback assignment.
 * This limits the number of requests being sent to our server in the case of our server failing to return a working assignment
 * and will be the minimum amount of time in-between requests per experiment.
 */
const fallbackExperimentAssignmentTtl = 60;

/**
 * A fallback ExperimentAssignment we return when we can't retrieve one.
 *
 * @param experimentName The name of the experiment
 */
export const createFallbackExperimentAssignment = (
	experimentName: string
): ExperimentAssignment => ( {
	experimentName,
	variationName: null,
	retrievedTimestamp: Timing.monotonicNow(),
	ttl: fallbackExperimentAssignmentTtl,
	isFallbackExperimentAssignment: true,
} );
