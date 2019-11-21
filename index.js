module.exports = function gourd(mod) {
	let enabled = true,
		userName = "",
		region = mod.region;

	switch (region) {
		case "na":
			region = "/"
			break;
		case "eu":
			region = "/" + region + "/"
			break;
		case "ru":
			region = "/" + region + "/"
			break;
		default:
			mod.warn("This region is not supported by moongourd.")
			break;
	}

	mod.command.add(['mongord', 'mg'], () => {
		enabled = !enabled
		mod.command.message(`mongord enabled: ${enabled}`)
	})

	mod.game.on('enter_game', () => {
        	userName = mod.game.me.name
    	});

	mod.hook('S_USER_PAPERDOLL_INFO', 11, event => {
		if (enabled && event.name != userName) Open(event.name)
	})

	function Open(name) {
		mod.toClient('S_SHOW_AWESOMIUMWEB_SHOP', 1, {
			link: `https://moongourd.com${region}results?player=${name}&area=1&boss=1&sort=timedesc`
		})
	}
}
