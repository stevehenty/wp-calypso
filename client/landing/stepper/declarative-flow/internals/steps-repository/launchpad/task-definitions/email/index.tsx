import { Task } from '@automattic/launchpad';
import { recordTaskClickTracksEvent } from '../../tracking';
import { TaskAction } from '../../types';

const getVerifyEmail: TaskAction = ( task, flow, context ): Task => {
	const { isEmailVerified } = context;

	return {
		...task,
		completed: isEmailVerified,
		actionDispatch: () => {
			recordTaskClickTracksEvent( task, flow, context );
		},
		useCalypsoPath: true,
	};
};

export const actions = {
	verify_email: getVerifyEmail,
};
