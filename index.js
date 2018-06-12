const    Command = require('command')

module.exports = function gourd(dispatch) {
    const command = Command(dispatch)
    let enabled = true,
        userName = "";
    
    command.add('mongord', () => {
        enabled = !enabled;
        command.message(`mongord enabled: ${enabled}`);
    });
    
    dispatch.hook('S_LOGIN', 10, event => {
        userName = event.name;
    });
    
    dispatch.hook('S_USER_PAPERDOLL_INFO', 5, event => {
        if(enabled && event.name != userName){
            Open(event.name);
        }
    });
    
    function Open(name){
        dispatch.toClient('S_SHOW_AWESOMIUMWEB_SHOP', 1, {
            link:`https://moongourd.com/results?player=${name}&area=1&boss=1&sort=timedesc`
        })
    }
    
}
