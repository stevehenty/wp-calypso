import { FeatureList, PlanSlug, TERMS_LIST } from '@automattic/calypso-products';
import { AddOnMeta, Plans } from '@automattic/data-stores';
import { HiddenPlans, PlansIntent } from '../../types';
import { UseFreeTrialPlanSlugs } from './use-grid-plans';

export interface UseGridPlans {
	allFeaturesList: FeatureList;
	coupon?: string;
	eligibleForFreeHostingTrial?: boolean;
	hiddenPlans?: HiddenPlans;
	intent?: PlansIntent;
	isDisplayingPlansNeededForFeature?: boolean;
	isSubdomainNotGenerated?: boolean;
	selectedFeature?: string | null;
	selectedPlan?: PlanSlug;
	showLegacyStorageFeature?: boolean;
	siteId?: number | null;
	storageAddOns: ( AddOnMeta | null )[];
	term?: ( typeof TERMS_LIST )[ number ];
	useCheckPlanAvailabilityForPurchase: Plans.UseCheckPlanAvailabilityForPurchase;
	useFreeTrialPlanSlugs?: UseFreeTrialPlanSlugs;
}
