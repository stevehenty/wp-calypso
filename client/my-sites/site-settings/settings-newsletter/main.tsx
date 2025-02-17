import { Card } from '@automattic/components';
import { useTranslate } from 'i18n-calypso';
import { useEffect } from 'react';
import SubscriptionsModuleBanner from 'calypso/blocks/subscriptions-module-banner';
import DocumentHead from 'calypso/components/data/document-head';
import QueryJetpackModules from 'calypso/components/data/query-jetpack-modules';
import Main from 'calypso/components/main';
import NavigationHeader from 'calypso/components/navigation-header';
import scrollToAnchor from 'calypso/lib/scroll-to-anchor';
import SettingsSectionHeader from 'calypso/my-sites/site-settings/settings-section-header';
import { useSelector } from 'calypso/state';
import isJetpackModuleActive from 'calypso/state/selectors/is-jetpack-module-active';
import { isJetpackSite as isJetpackSiteSelector } from 'calypso/state/sites/selectors';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';
import wrapSettingsForm from '../wrap-settings-form';
import { EmailsTextSetting } from './EmailsTextSetting';
import { ExcerptSetting } from './ExcerptSetting';
import { FeaturedImageEmailSetting } from './FeaturedImageEmailSetting';
import { ReplyToSetting } from './ReplyToSetting';
import { SubscribeModalOnCommentSetting } from './SubscribeModalOnCommentSetting';
import { SubscribeModalSetting } from './SubscribeModalSetting';
import { SubscribePostEndSetting } from './SubscribePostEndSetting';
import { SubscriberLoginNavigationSetting } from './SubscriberLoginNavigationSetting';
import { NewsletterCategoriesSection } from './newsletter-categories-section';

const defaultNewsletterCategoryIds: number[] = [];

export type SubscriptionOptions = {
	invitation: string;
	comment_follow: string;
	welcome: string;
};

type Fields = {
	subscription_options?: SubscriptionOptions;
	wpcom_featured_image_in_email?: boolean;
	wpcom_newsletter_categories?: number[];
	wpcom_newsletter_categories_enabled?: boolean;
	wpcom_subscription_emails_use_excerpt?: boolean;
	jetpack_subscriptions_reply_to?: string;
	sm_enabled?: boolean;
	jetpack_subscriptions_subscribe_post_end_enabled?: boolean;
	jetpack_subscriptions_login_navigation_enabled?: boolean;
	jetpack_verbum_subscription_modal?: boolean;
};

const getFormSettings = ( settings?: Fields ) => {
	if ( ! settings ) {
		return {};
	}

	const {
		subscription_options,
		wpcom_featured_image_in_email,
		wpcom_newsletter_categories,
		wpcom_newsletter_categories_enabled,
		wpcom_subscription_emails_use_excerpt,
		jetpack_subscriptions_reply_to,
		sm_enabled,
		jetpack_subscriptions_subscribe_post_end_enabled,
		jetpack_subscriptions_login_navigation_enabled,
		jetpack_verbum_subscription_modal,
	} = settings;

	return {
		...( subscription_options && { subscription_options } ),
		wpcom_featured_image_in_email: !! wpcom_featured_image_in_email,
		wpcom_newsletter_categories: wpcom_newsletter_categories || [],
		wpcom_newsletter_categories_enabled: !! wpcom_newsletter_categories_enabled,
		wpcom_subscription_emails_use_excerpt: !! wpcom_subscription_emails_use_excerpt,
		jetpack_subscriptions_reply_to: jetpack_subscriptions_reply_to || '',
		sm_enabled: !! sm_enabled,
		jetpack_subscriptions_subscribe_post_end_enabled:
			!! jetpack_subscriptions_subscribe_post_end_enabled,
		jetpack_subscriptions_login_navigation_enabled:
			!! jetpack_subscriptions_login_navigation_enabled,
		jetpack_verbum_subscription_modal: !! jetpack_verbum_subscription_modal,
	};
};

type NewsletterSettingsFormProps = {
	fields: Fields;
	handleToggle: ( field: string ) => ( value: boolean ) => void;
	handleSubmitForm: () => void;
	isRequestingSettings: boolean;
	isSavingSettings: boolean;
	settings: { subscription_options?: SubscriptionOptions };
	updateFields: ( fields: Fields ) => void;
};

const NewsletterSettingsForm = wrapSettingsForm( getFormSettings )( ( {
	fields,
	handleSubmitForm,
	handleToggle,
	isRequestingSettings,
	isSavingSettings,
	settings,
	updateFields,
}: NewsletterSettingsFormProps ) => {
	const translate = useTranslate();
	const siteId = useSelector( getSelectedSiteId );

	const {
		wpcom_featured_image_in_email,
		wpcom_subscription_emails_use_excerpt,
		jetpack_subscriptions_reply_to,
		subscription_options,
		sm_enabled,
		jetpack_subscriptions_subscribe_post_end_enabled,
		jetpack_subscriptions_login_navigation_enabled,
		jetpack_verbum_subscription_modal,
	} = fields;

	const isSubscriptionModuleInactive = useSelector( ( state ) => {
		if ( ! siteId ) {
			return null;
		}

		const isJetpackSite = isJetpackSiteSelector( state, siteId, {
			treatAtomicAsJetpackSite: false,
		} );

		return (
			Boolean( isJetpackSite ) && isJetpackModuleActive( state, siteId, 'subscriptions' ) === false
		);
	} );

	const shouldShowSubscriptionOnCommentModule = useSelector( ( state ) => {
		const isJetpackSite = isJetpackSiteSelector( state, siteId, {
			treatAtomicAsJetpackSite: false,
		} );

		return ! isJetpackSite;
	} );

	const disabled = isSubscriptionModuleInactive || isRequestingSettings || isSavingSettings;
	const savedSubscriptionOptions = settings?.subscription_options;

	// Update subscription_options form fields when savedSubscriptionOptions changes.
	// This makes sure the form fields hold the current value after saving.
	useEffect( () => {
		updateFields( { subscription_options: savedSubscriptionOptions } );

		// If the URL has a hash, scroll to it.
		scrollToAnchor( { offset: 15 } );
	}, [ savedSubscriptionOptions, updateFields ] );

	return (
		<form onSubmit={ handleSubmitForm }>
			{ siteId && <QueryJetpackModules siteId={ siteId } /> }
			{ /* @ts-expect-error SettingsSectionHeader is not typed and is causing errors */ }
			<SettingsSectionHeader
				disabled={ disabled }
				id="subscriptions"
				isSaving={ isSavingSettings }
				onButtonClick={ handleSubmitForm }
				showButton
				title={ translate( 'Subscriptions' ) }
			/>
			<Card className="site-settings__card">
				<SubscribePostEndSetting
					disabled={ disabled }
					handleToggle={ handleToggle }
					value={ jetpack_subscriptions_subscribe_post_end_enabled }
				/>
				<SubscribeModalSetting
					disabled={ disabled }
					handleToggle={ handleToggle }
					value={ sm_enabled }
				/>
				{ shouldShowSubscriptionOnCommentModule && (
					<SubscribeModalOnCommentSetting
						disabled={ disabled }
						handleToggle={ handleToggle }
						value={ jetpack_verbum_subscription_modal }
					/>
				) }
				<SubscriberLoginNavigationSetting
					disabled={ disabled }
					handleToggle={ handleToggle }
					value={ jetpack_subscriptions_login_navigation_enabled }
				/>
			</Card>
			{ /* @ts-expect-error SettingsSectionHeader is not typed and is causing errors */ }
			<SettingsSectionHeader
				disabled={ disabled }
				id="email-settings"
				isSaving={ isSavingSettings }
				onButtonClick={ handleSubmitForm }
				showButton
				title={ translate( 'Email' ) }
			/>
			<Card className="site-settings__card">
				<FeaturedImageEmailSetting
					disabled={ disabled }
					handleToggle={ handleToggle }
					value={ wpcom_featured_image_in_email }
				/>
			</Card>
			<Card className="site-settings__card">
				<ExcerptSetting
					disabled={ disabled }
					updateFields={ updateFields }
					value={ wpcom_subscription_emails_use_excerpt }
				/>
			</Card>
			<Card className="site-settings__card">
				<ReplyToSetting
					disabled={ disabled }
					updateFields={ updateFields }
					value={ jetpack_subscriptions_reply_to }
				/>
			</Card>

			{ /* @ts-expect-error SettingsSectionHeader is not typed and is causing errors */ }
			<SettingsSectionHeader
				id="newsletter-categories-settings"
				title={ translate( 'Newsletter categories' ) }
				showButton
				onButtonClick={ handleSubmitForm }
				disabled={ disabled }
				isSaving={ isSavingSettings }
			/>
			<NewsletterCategoriesSection
				disabled={ disabled }
				newsletterCategoryIds={ fields.wpcom_newsletter_categories || defaultNewsletterCategoryIds }
				newsletterCategoriesEnabled={ fields.wpcom_newsletter_categories_enabled }
				handleToggle={ handleToggle }
				updateFields={ updateFields }
			/>

			{ /* @ts-expect-error SettingsSectionHeader is not typed and is causing errors */ }
			<SettingsSectionHeader
				disabled={ disabled }
				id="messages"
				isSaving={ isSavingSettings }
				onButtonClick={ handleSubmitForm }
				showButton
				title={ translate( 'Messages' ) }
			/>
			<Card className="site-settings__card">
				<EmailsTextSetting
					disabled={ disabled }
					updateFields={ updateFields }
					value={ subscription_options }
				/>
			</Card>
		</form>
	);
} );

const NewsletterSettings = () => {
	const translate = useTranslate();

	return (
		<Main>
			<DocumentHead title={ translate( 'Newsletter Settings' ) } />
			<NavigationHeader navigationItems={ [] } title={ translate( 'Newsletter Settings' ) } />
			<SubscriptionsModuleBanner />
			<NewsletterSettingsForm />
		</Main>
	);
};

export default NewsletterSettings;
