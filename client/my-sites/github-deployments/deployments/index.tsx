import page from '@automattic/calypso-router';
import { useI18n } from '@wordpress/react-i18n';
import ActionPanel from 'calypso/components/action-panel';
import HeaderCake from 'calypso/components/header-cake';
import { useSelector } from 'calypso/state';
import { getSelectedSiteId, getSelectedSiteSlug } from 'calypso/state/ui/selectors';
import { GitHubLoadingPlaceholder } from '../components/loading-placeholder';
import { PageShell } from '../components/page-shell';
import { GitHubDeploymentCreationForm } from '../deployment-creation/deployment-creation-form';
import { createDeploymentPage } from '../routes';
import { ConnectionWizardButton } from './connection-wizard-button';
import { GitHubDeploymentsList } from './deployments-list';
import { useCodeDeploymentsQuery } from './use-code-deployments-query';

import './styles.scss';

export function GitHubDeployments() {
	const siteId = useSelector( getSelectedSiteId );
	const siteSlug = useSelector( getSelectedSiteSlug );
	const { __ } = useI18n();

	const { data: deployments, isLoading, refetch } = useCodeDeploymentsQuery( siteId );

	const renderContent = () => {
		if ( deployments?.length ) {
			return <GitHubDeploymentsList deployments={ deployments } />;
		}

		if ( isLoading ) {
			return <GitHubLoadingPlaceholder />;
		}

		return (
			<>
				<HeaderCake isCompact>
					<h1>{ __( 'Connect repository' ) }</h1>
				</HeaderCake>
				<ActionPanel>
					<GitHubDeploymentCreationForm onConnected={ refetch } />
				</ActionPanel>
			</>
		);
	};

	return (
		<PageShell
			pageTitle={ __( 'GitHub Deployments' ) }
			topRightButton={
				<ConnectionWizardButton
					onClick={ () => {
						page( createDeploymentPage( siteSlug! ) );
					} }
				/>
			}
		>
			{ renderContent() }
		</PageShell>
	);
}
