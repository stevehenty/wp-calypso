import { useThemeContext } from '../theme-context';
import useThemeShowcaseTracks from './use-theme-showcase-tracks';

export default function useSelectedStyleVariation() {
	const { setSelectedStyleVariation } = useThemeContext();

	const { recordThemeClick } = useThemeShowcaseTracks();

	const onStyleVariationClick = ( styleVariation ) => {
		recordThemeClick( 'calypso_themeshowcase_theme_style_variation_click', {
			styleVariationSlug: styleVariation?.slug,
		} );
		setSelectedStyleVariation( styleVariation );
	};
	const onStyleVariationMoreClick = () => {
		recordThemeClick( 'calypso_themeshowcase_theme_style_variation_more_click' );
	};

	return { onStyleVariationClick, onStyleVariationMoreClick };
}
