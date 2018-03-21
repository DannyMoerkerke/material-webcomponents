export default (outlet, routes) => {
    const getCurrentRoute = url => url.replace(location.origin, '');

    const getMatchedRoute = url => routes.find(route => url === route.url);

    const matchRoute = url => {
        const currentRoute = getCurrentRoute(url);
        const matchedRoute = getMatchedRoute(currentRoute);

        if(matchedRoute) {
            let {template, templateUrl, url} = matchedRoute;

            if(templateUrl) {
                fetch(templateUrl)
                .then(response => response.text())
                .then(html => {
                    matchedRoute.template = html;
                    history.pushState({template, url}, null, url);

                    activateRoute(matchedRoute);
                })
            }
            else {
                history.pushState({template, url}, null, url);
                activateRoute(matchedRoute);
            }
        }
    };

    const activateRoute = ({template, controller}) => {
        console.log(template);
        outlet.innerHTML = template;

        if(controller && typeof controller === 'function') {
            controller();
        }
    };

    console.log(document.querySelectorAll('a'));
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

    matchRoute(location.href);
};