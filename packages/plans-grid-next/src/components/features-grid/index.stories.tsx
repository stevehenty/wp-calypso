import { Meta } from '@storybook/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { FeaturesGrid } from '../..';

const queryClient = new QueryClient();

const wpcomFeatures = [
	{
		getSlug: () => {},
		getTitle: () => 'Dotcom Feature 1',
		availableForCurrentPlan: true,
	},
	{
		getSlug: () => {},
		getTitle: () => 'Dotcom Feature 2',
		availableForCurrentPlan: true,
	},
	{
		getSlug: () => {},
		getTitle: () => 'Dotcom Feature 3',
		availableForCurrentPlan: true,
	},
];

const jetpackFeatures = [
	{
		getSlug: () => {},
		getTitle: () => 'Jetpack Feature 1',
		availableForCurrentPlan: true,
	},
	{
		getSlug: () => {},
		getTitle: () => 'Jetpack Feature 2',
		availableForCurrentPlan: true,
	},
	{
		getSlug: () => {},
		getTitle: () => 'Jetpack Feature 3',
		availableForCurrentPlan: true,
	},
];

export default {
	title: 'plans-grid-next',
	component: FeaturesGrid,
	decorators: [
		( Story ) => (
			<QueryClientProvider client={ queryClient }>
				<Story />
			</QueryClientProvider>
		),
	],
	parameters: {
		viewport: {
			defaultViewport: 'LARGE',
		},
	},
} as Meta;

const defaultArgs = {
	gridPlans: [
		{
			planSlug: 'free_plan',
			isVisible: true,
			tagline: 'Get a taste of the world’s most popular CMS & blogging software.',
			availableForPurchase: false,
			productNameShort: 'Free',
			planTitle: 'Free',
			billingTimeframe: 'No expiration date',
			current: false,
			isMonthlyPlan: true,
			cartItemForPlan: null,
			highlightLabel: null,
			pricing: {
				originalPrice: {
					monthly: 0,
					full: 0,
				},
				discountedPrice: {
					monthly: null,
					full: null,
				},
				billingPeriod: -1,
				currencyCode: 'AUD',
				introOffer: null,
			},
			storageAddOnsForPlan: null,
			features: {
				wpcomFeatures,
				jetpackFeatures,
				storageOptions: [
					{
						slug: '1gb-storage',
						isAddOn: false,
					},
				],
			},
		},
		{
			planSlug: 'personal-bundle',
			isVisible: true,
			tagline: 'Create your home on the web with a custom domain name.',
			availableForPurchase: false,
			productNameShort: 'Starter',
			planTitle: 'Starter',
			billingTimeframe: 'per month, billed annually',
			current: false,
			isMonthlyPlan: false,
			cartItemForPlan: {
				product_slug: 'personal-bundle',
			},
			highlightLabel: null,
			pricing: {
				originalPrice: {
					monthly: 600,
					full: 7200,
				},
				discountedPrice: {
					monthly: null,
					full: null,
				},
				billingPeriod: 365,
				currencyCode: 'AUD',
				introOffer: null,
			},
			storageAddOnsForPlan: null,
			features: {
				wpcomFeatures,
				jetpackFeatures,
				storageOptions: [
					{
						slug: '6gb-storage',
						isAddOn: false,
					},
				],
			},
		},
		{
			planSlug: 'value_bundle',
			isVisible: true,
			tagline: 'Build a unique website with powerful design tools.',
			availableForPurchase: false,
			productNameShort: 'Explorer',
			planTitle: 'Explorer',
			billingTimeframe: 'per month, billed annually',
			current: false,
			isMonthlyPlan: false,
			cartItemForPlan: {
				product_slug: 'value_bundle',
			},
			highlightLabel: null,
			pricing: {
				originalPrice: {
					monthly: 1200,
					full: 14400,
				},
				discountedPrice: {
					monthly: null,
					full: null,
				},
				billingPeriod: 365,
				currencyCode: 'AUD',
				introOffer: null,
			},
			storageAddOnsForPlan: null,
			features: {
				wpcomFeatures,
				jetpackFeatures,
				storageOptions: [
					{
						slug: '13gb-storage',
						isAddOn: false,
					},
				],
			},
		},
		{
			planSlug: 'business-bundle',
			isVisible: true,
			tagline: 'Unlock the power of WordPress with plugins and cloud tools.',
			availableForPurchase: false,
			productNameShort: 'Creator',
			planTitle: 'Creator',
			billingTimeframe: 'per month, billed annually',
			current: true,
			isMonthlyPlan: false,
			cartItemForPlan: {
				product_slug: 'business-bundle',
			},
			highlightLabel: 'Your plan',
			pricing: {
				originalPrice: {
					monthly: 3800,
					full: 45600,
				},
				discountedPrice: {
					monthly: null,
					full: null,
				},
				billingPeriod: 365,
				currencyCode: 'AUD',
				expiry: '2025-01-17T00:00:00+00:00',
				introOffer: null,
			},
			storageAddOnsForPlan: [
				{
					productSlug: 'wordpress_com_1gb_space_addon_yearly',
					featureSlugs: [ '50gb-storage-add-on' ],
					icon: {
						type: {},
						key: null,
						ref: null,
						props: {
							width: '44',
							height: '44',
							viewBox: '0 0 44 44',
							fill: 'none',
							xmlns: 'http://www.w3.org/2000/svg',
							children: [
								{
									key: null,
									ref: null,
									props: {
										d: 'M0 6.44C0 4.16204 0 3.02306 0.450346 2.1561C0.829848 1.42553 1.42553 0.829848 2.1561 0.450346C3.02306 0 4.16204 0 6.44 0H37.56C39.838 0 40.9769 0 41.8439 0.450346C42.5745 0.829848 43.1702 1.42553 43.5497 2.1561C44 3.02306 44 4.16204 44 6.44V37.56C44 39.838 44 40.9769 43.5497 41.8439C43.1702 42.5745 42.5745 43.1702 41.8439 43.5497C40.9769 44 39.838 44 37.56 44H6.44C4.16204 44 3.02306 44 2.1561 43.5497C1.42553 43.1702 0.829848 42.5745 0.450346 41.8439C0 40.9769 0 39.838 0 37.56V6.44Z',
										fill: '#E9EFF5',
									},
									_owner: null,
									_store: {},
								},
								{
									key: null,
									ref: null,
									props: {
										fillRule: 'evenodd',
										clipRule: 'evenodd',
										d: 'M16.5116 17.9597C16.4451 17.957 16.3783 17.9556 16.3111 17.9556C13.562 17.9556 11.3334 20.2539 11.3334 23.0889C11.3334 25.924 13.562 28.2223 16.3111 28.2223L16.3408 28.2221H28.3759L28.3995 28.2223C30.7559 28.2223 32.6662 26.2523 32.6662 23.8223C32.6662 21.6421 31.1287 19.8323 29.1108 19.4831L29.1111 19.4223C29.1111 16.1823 26.2458 13.5557 22.7111 13.5557C19.7274 13.5557 17.2206 15.4273 16.5116 17.9597C16.5116 17.9597 16.5116 17.9597 16.5116 17.9597ZM27.0922 21.1635L27.111 19.4609L27.1111 19.4223C27.1111 17.4471 25.3086 15.5557 22.7111 15.5557C20.5415 15.5557 18.8831 16.9074 18.4376 18.4989L18.011 20.0227L16.43 19.958C16.3907 19.9564 16.3511 19.9556 16.3111 19.9556C14.7241 19.9556 13.3334 21.3 13.3334 23.0889C13.3334 24.876 14.7212 26.2194 16.3061 26.2223L16.3348 26.2221H28.3872L28.3995 26.2223C29.5938 26.2223 30.6662 25.2061 30.6662 23.8223C30.6662 22.5872 29.8016 21.6324 28.7698 21.4539L27.0922 21.1635Z',
										fill: '#0675C4',
									},
									_owner: null,
									_store: {},
								},
							],
						},
						_owner: null,
						_store: {},
					},
					quantity: 50,
					name: '50 GB Storage',
					displayCost: 'A$74.58/month, billed yearly',
					prices: {
						monthlyPrice: 7458.333333333333,
						yearlyPrice: 89500,
						formattedMonthlyPrice: 'A$74.58',
						formattedYearlyPrice: 'A$895',
					},
					description: 'Make more space for high-quality photos, videos, and other media. ',
					featured: false,
					purchased: false,
					checkoutLink: '/checkout/wordpress_com_1gb_space_addon_yearly',
					exceedsSiteStorageLimits: true,
				},
				{
					productSlug: 'wordpress_com_1gb_space_addon_yearly',
					featureSlugs: [ '100gb-storage-add-on' ],
					quantity: 100,
					name: '100 GB Storage',
					displayCost: 'A$124.25/month, billed yearly',
					prices: {
						monthlyPrice: 12425,
						yearlyPrice: 149100,
						formattedMonthlyPrice: 'A$124.25',
						formattedYearlyPrice: 'A$1,491',
					},
					description:
						'Take your site to the next level. Store all your media in one place without worrying about running out of space.',
					featured: false,
					purchased: false,
					checkoutLink: '/checkout/wordpress_com_1gb_space_addon_yearly',
					exceedsSiteStorageLimits: true,
				},
			],
			features: {
				wpcomFeatures,
				jetpackFeatures,
				storageOptions: [
					{
						slug: '50gb-storage',
						isAddOn: false,
					},
					{
						slug: '50gb-storage-add-on',
						isAddOn: true,
					},
					{
						slug: '100gb-storage-add-on',
						isAddOn: true,
					},
				],
			},
		},
		{
			planSlug: 'ecommerce-bundle',
			isVisible: true,
			tagline: 'Create a powerful online store with built-in premium extensions.',
			availableForPurchase: true,
			productNameShort: 'Entrepreneur',
			planTitle: 'Entrepreneur',
			billingTimeframe: 'per month, billed annually',
			current: false,
			isMonthlyPlan: false,
			cartItemForPlan: {
				product_slug: 'ecommerce-bundle',
			},
			highlightLabel: null,
			pricing: {
				originalPrice: {
					monthly: 6800,
					full: 81600,
				},
				discountedPrice: {
					monthly: 3316.67,
					full: 39800,
				},
				billingPeriod: 365,
				currencyCode: 'AUD',
				introOffer: null,
			},
			features: {
				wpcomFeatures,
				jetpackFeatures,
				storageOptions: [
					{
						slug: '50gb-storage',
						isAddOn: false,
					},
					{
						slug: '50gb-storage-add-on',
						isAddOn: true,
					},
					{
						slug: '100gb-storage-add-on',
						isAddOn: true,
					},
				],
			},
		},
		{
			planSlug: 'plan-enterprise-grid-wpcom',
			isVisible: true,
			tagline:
				'Deliver an unmatched performance with the highest security standards on our enterprise content platform.',
			availableForPurchase: false,
			productNameShort: 'enterprise',
			planTitle: 'Enterprise',
			billingTimeframe: '',
			current: false,
			isMonthlyPlan: true,
			cartItemForPlan: null,
			highlightLabel: null,
			pricing: {
				originalPrice: {
					monthly: null,
					full: null,
				},
				discountedPrice: {
					monthly: null,
					full: null,
				},
			},
			storageAddOnsForPlan: null,
			features: {
				wpcomFeatures: [],
				jetpackFeatures: [],
				storageOptions: [],
			},
		},
	],
	gridPlanForSpotlight: {
		planSlug: 'business-bundle',
		isVisible: true,
		tagline: 'Unlock the power of WordPress with plugins and cloud tools.',
		availableForPurchase: false,
		productNameShort: 'Creator',
		planTitle: 'Creator',
		billingTimeframe: 'per month, billed annually',
		current: true,
		isMonthlyPlan: false,
		cartItemForPlan: {
			product_slug: 'business-bundle',
		},
		highlightLabel: 'Your plan',
		pricing: {
			originalPrice: {
				monthly: 3800,
				full: 45600,
			},
			discountedPrice: {
				monthly: null,
				full: null,
			},
			billingPeriod: 365,
			currencyCode: 'AUD',
			expiry: '2025-01-17T00:00:00+00:00',
			introOffer: null,
		},
		storageAddOnsForPlan: [
			{
				productSlug: 'wordpress_com_1gb_space_addon_yearly',
				featureSlugs: [ '50gb-storage-add-on' ],
				icon: {
					type: {},
					key: null,
					ref: null,
					props: {
						width: '44',
						height: '44',
						viewBox: '0 0 44 44',
						fill: 'none',
						xmlns: 'http://www.w3.org/2000/svg',
						children: [
							{
								key: null,
								ref: null,
								props: {
									d: 'M0 6.44C0 4.16204 0 3.02306 0.450346 2.1561C0.829848 1.42553 1.42553 0.829848 2.1561 0.450346C3.02306 0 4.16204 0 6.44 0H37.56C39.838 0 40.9769 0 41.8439 0.450346C42.5745 0.829848 43.1702 1.42553 43.5497 2.1561C44 3.02306 44 4.16204 44 6.44V37.56C44 39.838 44 40.9769 43.5497 41.8439C43.1702 42.5745 42.5745 43.1702 41.8439 43.5497C40.9769 44 39.838 44 37.56 44H6.44C4.16204 44 3.02306 44 2.1561 43.5497C1.42553 43.1702 0.829848 42.5745 0.450346 41.8439C0 40.9769 0 39.838 0 37.56V6.44Z',
									fill: '#E9EFF5',
								},
								_owner: null,
								_store: {},
							},
							{
								key: null,
								ref: null,
								props: {
									fillRule: 'evenodd',
									clipRule: 'evenodd',
									d: 'M16.5116 17.9597C16.4451 17.957 16.3783 17.9556 16.3111 17.9556C13.562 17.9556 11.3334 20.2539 11.3334 23.0889C11.3334 25.924 13.562 28.2223 16.3111 28.2223L16.3408 28.2221H28.3759L28.3995 28.2223C30.7559 28.2223 32.6662 26.2523 32.6662 23.8223C32.6662 21.6421 31.1287 19.8323 29.1108 19.4831L29.1111 19.4223C29.1111 16.1823 26.2458 13.5557 22.7111 13.5557C19.7274 13.5557 17.2206 15.4273 16.5116 17.9597C16.5116 17.9597 16.5116 17.9597 16.5116 17.9597ZM27.0922 21.1635L27.111 19.4609L27.1111 19.4223C27.1111 17.4471 25.3086 15.5557 22.7111 15.5557C20.5415 15.5557 18.8831 16.9074 18.4376 18.4989L18.011 20.0227L16.43 19.958C16.3907 19.9564 16.3511 19.9556 16.3111 19.9556C14.7241 19.9556 13.3334 21.3 13.3334 23.0889C13.3334 24.876 14.7212 26.2194 16.3061 26.2223L16.3348 26.2221H28.3872L28.3995 26.2223C29.5938 26.2223 30.6662 25.2061 30.6662 23.8223C30.6662 22.5872 29.8016 21.6324 28.7698 21.4539L27.0922 21.1635Z',
									fill: '#0675C4',
								},
								_owner: null,
								_store: {},
							},
						],
					},
					_owner: null,
					_store: {},
				},
				quantity: 50,
				name: '50 GB Storage',
				displayCost: 'A$74.58/month, billed yearly',
				prices: {
					monthlyPrice: 7458.333333333333,
					yearlyPrice: 89500,
					formattedMonthlyPrice: 'A$74.58',
					formattedYearlyPrice: 'A$895',
				},
				description: 'Make more space for high-quality photos, videos, and other media. ',
				featured: false,
				purchased: false,
				checkoutLink: '/checkout/wordpress_com_1gb_space_addon_yearly',
				exceedsSiteStorageLimits: true,
			},
			{
				productSlug: 'wordpress_com_1gb_space_addon_yearly',
				featureSlugs: [ '100gb-storage-add-on' ],
				quantity: 100,
				name: '100 GB Storage',
				displayCost: 'A$124.25/month, billed yearly',
				prices: {
					monthlyPrice: 12425,
					yearlyPrice: 149100,
					formattedMonthlyPrice: 'A$124.25',
					formattedYearlyPrice: 'A$1,491',
				},
				description:
					'Take your site to the next level. Store all your media in one place without worrying about running out of space.',
				featured: false,
				purchased: false,
				checkoutLink: '/checkout/wordpress_com_1gb_space_addon_yearly',
				exceedsSiteStorageLimits: true,
			},
		],
		features: {
			wpcomFeatures: [
				{
					getSlug: () => {},
					getTitle: () => 'Dotcom Feature 1',
				},
			],
			jetpackFeatures: [
				{
					getSlug: () => {},
					getTitle: () => 'Jetpack Feature 1',
				},
			],
			storageOptions: [
				{
					slug: '50gb-storage',
					isAddOn: false,
				},
				{
					slug: '50gb-storage-add-on',
					isAddOn: true,
				},
				{
					slug: '100gb-storage-add-on',
					isAddOn: true,
				},
			],
		},
	},
	generatedWPComSubdomain: {
		isLoading: false,
		result: {},
	},
	isCustomDomainAllowedOnFreePlan: false,
	isInSignup: false,
	isInAdmin: true,
	isLaunchPage: false,
	onUpgradeClick: () => {},
	selectedSiteId: 182283121,
	intervalType: 'yearly',
	hideUnavailableFeatures: false,
	currentSitePlanSlug: 'business-bundle',
	planActionOverrides: {
		currentPlan: {},
	},
	intent: 'plans-default-wpcom',
	showLegacyStorageFeature: false,
	showUpgradeableStorage: true,
	stickyRowOffset: 32,
	useCheckPlanAvailabilityForPurchase: () => {},
	allFeaturesList: {},
	onStorageAddOnClick: () => {},
	showRefundPeriod: false,
	recordTracksEvent: () => {},
	planUpgradeCreditsApplicable: 418,
};

const storyDefaults = {
	args: defaultArgs,
};

export const FeaturesGridTest = {
	...storyDefaults,
};
