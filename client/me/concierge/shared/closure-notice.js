import 'moment-timezone'; // monkey patches the existing moment.js
import { CompactCard as Card } from '@automattic/components';
import { useTranslate } from 'i18n-calypso';
import { useLocalizedMoment } from 'calypso/components/localized-moment';

const DATE_FORMAT = 'LLL';

const ClosureNotice = ( { closesAt, displayAt, reopensAt } ) => {
	const translate = useTranslate();
	const moment = useLocalizedMoment();

	const currentDate = moment();
	const guessedTimezone = moment.tz.guess();

	if ( ! currentDate.isBetween( displayAt, reopensAt ) ) {
		return null;
	}

	let message;

	if ( currentDate.isBefore( closesAt ) ) {
		message = translate(
			'{{strong}}Notice:{{/strong}} Quick Start sessions will be closed from %(closesAt)s until %(reopensAt)s. ' +
				'If you need to get in touch with us, you’ll be able to {{link}}submit a support request{{/link}} ' +
				'and we’ll get to it as fast as we can. Thank you!',
			{
				args: {
					closesAt: moment.tz( closesAt, guessedTimezone ).format( DATE_FORMAT ),
					reopensAt: moment.tz( reopensAt, guessedTimezone ).format( DATE_FORMAT ),
				},
				components: {
					link: <a href="/help/contact" />,
					strong: <strong />,
				},
			}
		);
	} else {
		message = translate(
			'{{strong}}Quick Start Sessions will be closed from %(closesAt)s – %(reopensAt)s for the New Year’s holiday.{{/strong}}{{br/}}' +
				'If you need to get in touch with us, please submit a {{link}}support request from this page{{/link}} and we will get to it as fast as we can. ' +
				'Quick Start Sessions will re-open at %(reopensAt)s. Thank you for your understanding!',
			{
				args: {
					closesAt: moment.tz( closesAt, guessedTimezone ).format( DATE_FORMAT ),
					reopensAt: moment.tz( reopensAt, guessedTimezone ).format( DATE_FORMAT ),
				},
				components: {
					link: <a href="/help/contact" />,
					strong: <strong />,
					br: <br />,
				},
			}
		);
	}
	return <Card>{ message }</Card>;
};

export default ClosureNotice;
