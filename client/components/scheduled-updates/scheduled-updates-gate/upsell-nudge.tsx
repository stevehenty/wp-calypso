import {
	PLAN_BUSINESS,
	getPlan,
	WPCOM_FEATURES_SCHEDULED_UPDATES,
} from '@automattic/calypso-products';
import { addQueryArgs } from '@wordpress/url';
import { useTranslate } from 'i18n-calypso';
import UpsellNudge from 'calypso/blocks/upsell-nudge';
import { useSelector } from 'calypso/state';
import { isJetpackSite } from 'calypso/state/sites/selectors';
import { getSelectedSiteSlug, getSelectedSiteId } from 'calypso/state/ui/selectors';

const UpsellNudgeNotice = () => {
	const translate = useTranslate();
	const siteSlug = useSelector( getSelectedSiteSlug );
	const siteId = useSelector( getSelectedSiteId );
	const isJetpack = useSelector( ( state ) => isJetpackSite( state, siteId ) );

	const getWpcomUpgradeNudge = () => {
		const titleText = translate(
			'Upgrade to the %(businessPlanName)s plan to install plugins and manage scheduled updates.',
			{
				args: { businessPlanName: getPlan( PLAN_BUSINESS )?.getTitle() ?? '' },
			}
		);

		const href = addQueryArgs( `/checkout/${ siteSlug }/business`, {
			redirect_to: `/plugins/scheduled-updates/${ siteSlug }`,
		} );

		return (
			<UpsellNudge
				className="scheduled-updates-upsell-nudge"
				title={ titleText }
				tracksImpressionName="calypso_scheduled_updates_upgrade_impression"
				event="calypso_scheduled_updates_upgrade_upsell"
				tracksClickName="calypso_scheduled_updates_upgrade_click"
				href={ href }
				callToAction={ translate( 'Upgrade' ) }
				plan={ PLAN_BUSINESS }
				showIcon={ true }
				feature={ WPCOM_FEATURES_SCHEDULED_UPDATES }
			/>
		);
	};

	const getJetpackMigrateNudge = () => {
		const titleText = translate(
			'Thank you for you interest in scheduling plugin updates. Migrate your site to WordPress.com to get started!'
		);

		const href = addQueryArgs( `/setup/import-hosted-site/import`, {
			source: 'scheduled-updates-dashboard',
		} );

		return (
			<UpsellNudge
				className="scheduled-updates-upsell-nudge"
				title={ titleText }
				tracksImpressionName="calypso_scheduled_updates_migrate_impression"
				event="calypso_scheduled_updates_migrate_upsell"
				tracksClickName="calypso_scheduled_updates_migrate_click"
				href={ href }
				callToAction={ translate( 'Migrate' ) }
				showIcon={ true }
				feature={ WPCOM_FEATURES_SCHEDULED_UPDATES }
			/>
		);
	};

	return isJetpack ? getJetpackMigrateNudge() : getWpcomUpgradeNudge();
};

export default UpsellNudgeNotice;
