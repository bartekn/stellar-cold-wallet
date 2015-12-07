import React from 'react';

import {AppBar} from 'material-ui';
// import {IconButton} from 'material-ui';
// import {IconMenu} from 'material-ui';
// import {MenuItem} from 'material-ui';
// import {NavigationClose} from 'material-ui/lib/svg-icons';
// import {NavigationMoreVert} from 'material-ui/lib/svg-icons';

export let Header = React.createClass({
  render: function() {  
    return <AppBar
      title="Stellar Cold Wallet"
      showMenuIconButton={false}
      // iconElementRight={
      //   <IconMenu iconButtonElement={
      //     <IconButton><NavigationMoreVert /></IconButton>
      //   }>
      //     <MenuItem index={0} primaryText="Refresh" />
      //     <MenuItem index={1} primaryText="Help" />
      //     <MenuItem index={2} primaryText="Sign out" />
      //   </IconMenu>
      // }
    />;
  }
});
