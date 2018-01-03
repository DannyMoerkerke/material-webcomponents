export default (outlet, routes) => {
    const getCurrentRoute = url => url.replace(location.origin, '');

    const getMatchedRoute = url => routes.find(route => url === route.url);

    const matchRoute = url => {
        const currentRoute = getCurrentRoute(url);
        const matchedRoute = getMatchedRoute(currentRoute);

        if(matchedRoute) {
            const {template, url} = matchedRoute;
            history.pushState({template, url}, null, url);

            activateRoute(matchedRoute);
        }
    };

    const activateRoute = ({template, controller}) => {
        outlet.innerHTML = template;

        if(controller && typeof controller === 'function') {
            controller();
        }
    };

    document.querySelectorAll('a').forEach(link => {
        link.onclick = e => {
            e.preventDefault();

            matchRoute(e.target.href);
        };
    });

    window.addEventListener('popstate', e => {
        const matchedRoute = getMatchedRoute(e.state.url);

        activateRoute(matchedRoute);
    });

    console.log(location.href);
    matchRoute(location.href);
};