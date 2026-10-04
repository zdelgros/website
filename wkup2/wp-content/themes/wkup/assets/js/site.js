/* Wake Up NL — language switch and mobile menu. */
( function () {
	var root = document.documentElement;

	function showLanguage( lang ) {
		root.setAttribute( 'data-lang', lang );
		root.lang = lang;
		document.querySelectorAll( '[data-set-lang]' ).forEach( function ( button ) {
			button.setAttribute( 'aria-pressed', button.getAttribute( 'data-set-lang' ) === lang ? 'true' : 'false' );
		} );
	}

	document.addEventListener( 'click', function ( event ) {
		var button = event.target.closest( '[data-set-lang]' );
		if ( ! button ) {
			return;
		}
		var lang = button.getAttribute( 'data-set-lang' );
		showLanguage( lang );
		try {
			localStorage.setItem( 'wkup-lang', lang );
		} catch ( e ) {}
	} );

	// The head script may already have switched to English; sync the buttons.
	showLanguage( root.getAttribute( 'data-lang' ) === 'en' ? 'en' : 'nl' );

	var toggle = document.querySelector( '.nav-toggle' );
	var nav = document.getElementById( 'site-nav' );
	if ( ! toggle || ! nav ) {
		return;
	}
	function setOpen( open ) {
		toggle.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
		nav.classList.toggle( 'is-open', open );
	}
	toggle.addEventListener( 'click', function () {
		setOpen( toggle.getAttribute( 'aria-expanded' ) !== 'true' );
	} );
	document.addEventListener( 'keydown', function ( event ) {
		if ( event.key === 'Escape' && nav.classList.contains( 'is-open' ) ) {
			setOpen( false );
			toggle.focus();
		}
	} );
	nav.addEventListener( 'click', function ( event ) {
		if ( event.target.closest( 'a' ) ) {
			setOpen( false );
		}
	} );
} )();
