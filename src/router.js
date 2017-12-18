export default (outlet, routes) => {

    document.querySelectorAll('a').forEach(link => {

        link.onclick = e => {
            e.preventDefault();

            const matchedRoute = routes.find(route => e.target.href === `${location.href}${route.url}`);

            if(matchedRoute) {
                const template = matchedRoute.template(matchedRoute.data);
                console.log(template);
                outlet.innerHTML = template;
                history.pushState({template}, null, matchedRoute.url);

                // matchedRoute.controller();
            }
        };
    })
};